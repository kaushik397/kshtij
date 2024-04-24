// components/Chart.js
'use client' 
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
    const response = await axios.get('https://3be8-106-196-30-54.ngrok-free.app/v1/nifty/priceaction');
    console.log(response);
    const data = response.data;

    if (Array.isArray(data) && data.length > 0) {
      const slicedData = data.slice(0, 10);
      return {
        labels: slicedData.map(item => item.Date),
        datasets: [
          {
            label: 'Close',
            data: slicedData.map(item => item.Close),
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
          },
          {
            label: '3EMA_Close',
            data: slicedData.map(item => item['3EMA_Close']),
            borderColor: 'rgba(255,99,132,1)',
            fill: false,
          },
          {
            label: '6EMA_Close',
            data: slicedData.map(item => item['6EMA_Close']),
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: false,
          },
          {
            label: '9EMA_Close',
            data: slicedData.map(item => item['9EMA_Close']),
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

const Chart= () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      const data = await fetchData();
      if (data) {
        setChartData(data);
      }
    };
    fetchChartData();
  }, []);

  return <Line options={options} data={chartData} />;
}

export default Chart;