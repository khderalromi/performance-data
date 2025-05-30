import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {useSelector} from 'react-redux'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

 const performanceAnalysisChartData = () => {
    const times = useSelector((state) => state.performanceAnalysis.times);
    console.log(times)
    if(times.length>0){
      var labels=[];
      var data2=[];
      for(let i=0;i<times.length;i++){
      let element=times[i]
      
       labels.push(element["phase"] )
       data2.push(element["actualDuration"])
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
        text: 'تحليل الأداء',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export  {performanceAnalysisChartData};
