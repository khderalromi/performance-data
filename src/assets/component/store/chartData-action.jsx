import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {useSelector} from 'react-redux'


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

 const PerformanceChartData = () => {
    const times = useSelector((state) => state.apiResponseTime.times);
    
    if(times.length>0){
      var labels=[];
      var data2=[];
      for(let i=0;i<times.length;i++){
      let element=times[i]
      
       labels.push(element["API"] )
       data2.push(element["apiLoadTime"])

    }
      
    }
  // performance data
  const data = {
    labels: labels ,
    datasets: [
      {
        label: 'API response time',
        data: data2,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // chart potions
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'api response time',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export  {PerformanceChartData};
