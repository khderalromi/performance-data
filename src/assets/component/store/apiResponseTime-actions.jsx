
import { apiResponseTimeActions } from './apiResponseTime-slice.jsx';
import {PerformanceChartData} from './chartData-action.jsx';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const fetchTimes=(url,APIname,dataBaseUrl)=>{
    return async (dispatch)=>{
        const trackApiResponseTime=async ()=>{
        //calculated response time for api 
            const start = performance.now();
            const response=await axios.get(`${url}`);
            if(!response){
                throw new Error("Data can't be reached")
            }
            if(response){
            const data=await response.data; 
            const end = performance.now();
            const load = end-start;
            //send response time and api name to database
            return axios.post(dataBaseUrl,
                        {   'API':APIname,
                            'responseTime': load
                        })
            }
        };
        try{
            const load= await trackApiResponseTime();
            //delete old data from state
            await dispatch(apiResponseTimeActions.deleteOldTime())

            //get data from database
            const response=await axios.get(dataBaseUrl);
            if(!response){
                throw new Error("Data can't be reached")
            }
            const data=await response.data;

            for(let key in response.data){
                //store data in state
                await dispatch(apiResponseTimeActions.addResponseTime({
                    apiLoadTime: response.data[key]['responseTime'],
                    API: response.data[key]['API'],
                }))
                //alarm for too long time
                if( response.data[key]['responseTime']>2500){
                    return toast.error(`this request(${response.data[key]['API']}) is taking too long time`,{autoClose:5000})
                }
            } ;

            //delete all data from database every 15min
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
            //{PerformanceChartData()}
            //return console.log(load)
              
            
        }catch(error){
            console.log(error);
        }
    }
}


