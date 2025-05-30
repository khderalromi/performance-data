import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {useSelector} from 'react-redux'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

 const eventLogChartData = () => {
    const times = useSelector((state) => state.eventLog.eventLog);
    console.log(times)
    if(times.length>0){
      var labels=[];
      var data2=[];
      for(let i=0;i<times.length;i++){
      let element=times[i]
      
       labels.push(element["elementId"] )
       data2.push(element["duration"])
     console.log(data2)
     console.log(element)
    
     
    }
      
    }
   // performance data
  const data = {
    labels: labels ,
    datasets: [
      {
        label: 'click Event',
        data: data2,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'event Log',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export  {eventLogChartData};
