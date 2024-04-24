// // components/Chart.js
'use client' 
// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// import axios from 'axios';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top'
//     },
//     title: {
//       display: true,
//       text: 'Nifty Price Action Chart'
//     }
//   },
// };

// const fetchData = async () => {
//   try {
//     const response = await axios.get('https://nifty-shloka-algo-cxeowxaalq-el.a.run.app/v1/nifty/priceaction');
//     const data = response.data;
//     console.log(data);

//     if (Array.isArray(data) && data.length > 0) {
//       return {
//         labels: data.map(item => item.Date),
//         datasets: [
//           {
//             label: 'Close',
//             data: data.map(item => item.Close),
//             borderColor: 'rgba(75,192,192,1)',
//             fill: false,
//           },
//           {
//             label: '3EMA_Close',
//             data: data.map(item => item['3EMA_Close']),
//             borderColor: 'rgba(255,99,132,1)',
//             fill: false,
//           },
//           {
//             label: '6EMA_Close',
//             data: data.map(item => item['6EMA_Close']),
//             borderColor: 'rgba(54, 162, 235, 1)',
//             fill: false,
//           },
//           {
//             label: '9EMA_Close',
//             data: data.map(item => item['9EMA_Close']),
//             borderColor: 'rgba(153, 102, 255, 1)',
//             fill: false,
//           },
//         ],
//       };
//     } else {
//       console.error('Empty or invalid data received from API');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return null;
//   }
// };

// const Chart= () => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [],
//   });

//   useEffect(() => {
//     const fetchChartData = async () => {
//       const data = await fetchData();
//       if (data) {
//         setChartData(data);
//       }
//     };
//     fetchChartData();
//   }, []);

//   return <Line options={options} data={chartData} />;
// }

// export default Chart;

// components/Chart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Nifty Price Action Chart'
    }
  },
};

const fetchData = async () => {
  try {
    const response = await axios.get('https://nifty-shloka-algo-cxeowxaalq-el.a.run.app/v1/nifty/priceaction');
    const data = response.data;

    if (Array.isArray(data) && data.length > 0) {
      return {
        labels: data.map(item => item.Date),
        datasets: [
          {
            label: 'Close',
            data: data.map(item => item.Close),
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
          },
          {
            label: '3EMA_Close',
            data: data.map(item => item['3EMA_Close']),
            borderColor: 'rgba(255,99,132,1)',
            fill: false,
          },
          {
            label: '6EMA_Close',
            data: data.map(item => item['6EMA_Close']),
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: false,
          },
          {
            label: '9EMA_Close',
            data: data.map(item => item['9EMA_Close']),
            borderColor: 'rgba(153, 102, 255, 1)',
            fill: false,
          },
        ],
      };
    } else {
      console.error('Empty or invalid data received from API');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const Chart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [displayAll, setDisplayAll] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      const data = await fetchData();
      if (data) {
        setChartData(data);
      }
    };
    fetchChartData();
  }, []);

  const filterData = () => {
    let filteredData = chartData;
    if (selectedDay) {
      filteredData = {
        labels: chartData.labels.filter(label => label === selectedDay),
        datasets: chartData.datasets.map(dataset => ({
          ...dataset,
          data: dataset.data.filter((_, index) => chartData.labels[index] === selectedDay)
        }))
      };
    }
    if (selectedMonth && selectedYear) {
      filteredData = {
        labels: chartData.labels.filter(label => label.startsWith(`${selectedYear}-${selectedMonth}`)),
        datasets: chartData.datasets.map(dataset => ({
          ...dataset,
          data: dataset.data.filter((_, index) => chartData.labels[index].startsWith(`${selectedYear}-${selectedMonth}`))
        }))
      };
    }
    if (selectedYear && !selectedMonth) {
      filteredData = {
        labels: chartData.labels.filter(label => label.startsWith(`${selectedYear}-`)),
        datasets: chartData.datasets.map(dataset => ({
          ...dataset,
          data: dataset.data.filter((_, index) => chartData.labels[index].startsWith(`${selectedYear}-`))
        }))
      };
    }
    return filteredData;
  };

  const handleDisplayAllChange = (e) => {
    setDisplayAll(e.target.checked);
    setSelectedDay('');
    setSelectedMonth('');
    setSelectedYear('');
  };

  const filteredChartData = displayAll ? chartData : filterData();

  return (
    <div>
      {!displayAll &&
        <div>
          <label htmlFor="day">Select Day:</label>
          <input type="date" id="day" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} />
          <label htmlFor="month">Select Month:</label>
          <input type="month" id="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
          <label htmlFor="year">Select Year:</label>
          <input type="number" id="year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} />
        </div>
      }
      <div>
        <input type="checkbox" id="displayAll" checked={displayAll} onChange={handleDisplayAllChange} />
        <label htmlFor="displayAll">Display All Data</label>
      </div>
      <Line options={options} data={filteredChartData} />
    </div>
  );
}

export default Chart;
