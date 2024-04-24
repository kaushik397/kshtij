// components/Chart.js
'use client' //
// components/Chart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import styles from '../styles/Chart.module.css'; // Importing CSS module

const Chart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://nifty-shloka-algo-cxeowxaalq-el.a.run.app/v1/nifty/priceaction');
        const data = response.data;

        // Check if data is an array and not empty
        if (Array.isArray(data) && data.length > 0) {
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
        } else {
          console.error('Empty or invalid data received from API');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Nifty Price Action Chart</h2>
      <div className={styles.chartWrapper}>
        {chartData && Object.keys(chartData).length > 0 && <Line data={chartData} />} {/* Render Line component only if chartData is not empty */}
      </div>
    </div>
  );
};

export default Chart;


