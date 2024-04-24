// components/Chart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const Chart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://nifty-shloka-algo-cxeowxaalq-el.a.run.app/v1/nifty/priceaction');
        const data = response.data;

        const chartData = {
          labels: data.map(item => item.time),
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

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Nifty Price Action Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default Chart;
