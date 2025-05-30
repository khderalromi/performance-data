import { useEffect, useState,useRef, Profiler } from 'react'
import { fetchTimes } from './assets/component/store/apiResponseTime-actions'
import { PerformanceChartData } from './assets/component/store/chartData-action'
import { eventLogChartData } from './assets/component/store/chartData-eventLog'
import { performanceAnalysisChartData } from './assets/component/store/chartData-performance'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPerfomanceAnalysis } from './assets/component/store/performanceAnalysis-action';
import InterFace from './assets/component/UI/interface';
function App() {
  const dispatch=useDispatch();
  const [responseTimes, setResponseTimes] = useState([]);
  const [isLoading, setIsLoading]=useState(true);

  const onRenderCallback=(id,phase, actualDuration)=>{
    isLoading ? 
    dispatch(fetchPerfomanceAnalysis('https://performance-data-35c83-default-rtdb.firebaseio.com/performanceAnalysis.json',id,phase, actualDuration))
    :null
  }
  useEffect(()=>{
    return setIsLoading(false)
  },[])
 
  return (
    <Profiler id='App' onRender={onRenderCallback}>
      <div>
          <h1>response time for click event</h1>
            {eventLogChartData()}      
          
          {responseTimes.length > 0 && (
            <div>
              <h2>API response time chart</h2>
              {PerformanceChartData()}
            </div>
          )}

            <div>
              <h2>performance Analysis ChartData</h2>
              {performanceAnalysisChartData()}
            </div>

            <InterFace/>
        
    </div>
    
    <ToastContainer style={{height:'60px',width:'200px',fontSize:'10px'}}
                                position="bottom-center" 
                                draggable 
                                theme="dark" 
                                limit={1}  
                                hideProgressBar={true} 
                                autoClose={3000} 
                />
    </Profiler>
  )
}

export default App

