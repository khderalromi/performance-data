import { useEffect, useState,useRef, Profiler } from 'react'
import { fetchTimes } from '../store/apiResponseTime-actions'
import { useDispatch, useSelector } from 'react-redux'
import { useTrackClickEvent } from '../trackClickEvent'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function InterFace() {
  const dispatch=useDispatch();
  const button1=useRef(null)
  const button2=useRef(null)
  const [apiUrl, setApiUrl] = useState('');
  const [apiName, setApiName] = useState('');
  const [apiList, setApiList] = useState([]);
  const [apiListName, setApiListName] = useState([]);

  const handleAddApi = () => {
    if (apiUrl && !apiList.includes(apiUrl)) {
      setApiList([...apiList, apiUrl]);
      setApiListName([...apiListName, apiName]);
      setApiUrl('');
      setApiName('')
    }
  };

  const handleStartMeasurement = async () => {
    if(apiList.length>0){
      for(let i=0;i<apiList.length;i++){
        dispatch(fetchTimes(apiList[i],apiListName[i],'https://performance-data-35c83-default-rtdb.firebaseio.com/apiResponse.json'))
      }
    }
  };
  
  useTrackClickEvent(button1.current,button1.current &&button1.current.innerText, handleAddApi,'https://performance-data-35c83-default-rtdb.firebaseio.com/clickEvent.json')
  useTrackClickEvent(button2.current,button2.current &&button2.current.innerText,handleStartMeasurement,'https://performance-data-35c83-default-rtdb.firebaseio.com/clickEvent.json')

  return (
      <div>   
          <div>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="API URL"
            />
            <input
              type="text"
              value={apiName}
              onChange={(e) => setApiName(e.target.value)}
              placeholder="API Name"
            />
            <button ref={button1} > API Add</button>
          </div>
          <ul>
            {apiList.map((url, index) => (
              <li key={index}>{url}</li>
            ))}
          </ul>
          <button ref={button2}>Start Measurement</button>
            
        <ToastContainer style={{height:'60px',width:'200px',fontSize:'10px'}}
                                    position="bottom-center" 
                                    draggable 
                                    theme="dark" 
                                    limit={1}  
                                    hideProgressBar={true} 
                                    autoClose={3000} 
        />
    </div>
  )
}

export default InterFace;
