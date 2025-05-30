

import axios from "axios"
import { eventLogActions } from "./eventLog-slice.jsx"


export const eventLog=(eventType,elementId,duration,dataBaseUrl)=>{
    return async (dispatch)=>{
        const trackEventLog=async ()=>{
            //send data to database
            return  axios.post(dataBaseUrl,
                            {
                                'duration':duration,
                                'elementId':elementId
                            })             
            }
        
        try{
             await trackEventLog();
            
            // delete old data from state
            await dispatch(eventLogActions.deleteOldTime())

            //get data from database
            const response=await axios.get(dataBaseUrl);
            if(!response){
                throw new Error("Data can't be reached")
            }
            const data=await response.data;
            for(let key in response.data){
                //store data in state
                await dispatch(eventLogActions.addEventLog({
                    duration: response.data[key]['duration'],
                    elementId: response.data[key]['elementId'],
                }))
            } ;

            //delete data from data base every 15 min
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



