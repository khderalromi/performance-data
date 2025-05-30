import { performanceAnalysisActions } from "./performanceAnalysis-slice";
import axios from "axios";


export const fetchPerfomanceAnalysis=(dataBaseUrl,id,phase, actualDuration)=>{
    
    return async (dispatch)=>{
        const performanceAnalysis=async ()=>{
            //send data to database
            return  axios.post(dataBaseUrl,
                            {
                                'id':id,
                                'phase':phase,
                                'actualDuration':actualDuration
                            })
            }
        
        try{
             await performanceAnalysis();

             //delete old data from state
            await dispatch(performanceAnalysisActions.deleteOld())
            const response=await axios.get(dataBaseUrl);
            if(!response){
                throw new Error("Data can't be reached")
            }
            const data=await response.data;

            for(let key in response.data){
                //store data in state
                await dispatch(performanceAnalysisActions.add({
                    id: response.data[key]['id'],
                    phase: response.data[key]['phase'],
                    actualDuration: response.data[key]['actualDuration'],
                }))
                
            } ;

            //delete data from datbase every 15min
                let condition=false
                setInterval(()=>{
                
                    console.log(Object.keys(response.data).length)
                    if(Object.keys(response.data).length >10 && Object.keys(response.data).length!== 'undefined'
                    && Object.keys(response.data).length!=null){
                        if(!condition){
                            condition=true;
                            axios.delete(dataBaseUrl)
                        
                            .then(()=>{
                                    return console.log('delet successfull')
                                }).catch((error)=>{'error deleting data'})
                            }
                  
                    }else{condition=false}
                },900000)
           
        }catch(error){
            console.log(error);
        }
    }
}


