// components/Chart.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const Chart = () => {
  const [chartData, setChartData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://nifty-shloka-algo-cxeowxaalq-el.a.run.app/v1/nifty/priceaction');
        const data = response.data;

        const chartData = {
          labels: data.map((item: any) => item.time),
          datasets: [
            {
              label: 'Close',
              data: data.map((item: any) => item.Close),
              borderColor: 'rgba(75,192,192,1)',
              fill: false,
            },
            {
              label: '3EMA_Close',
              data: data.map((item: any) => item['3EMA_Close']),
              borderColor: 'rgba(255,99,132,1)',
              fill: false,
            },
            {
              label: '6EMA_Close',
              data: data.map((item: any) => item['6EMA_Close']),
              borderColor: 'rgba(54, 162, 235, 1)',
              fill: false,
            },
            {
              label: '9EMA_Close',
              data: data.map((item: any) => item['9EMA_Close']),
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
      <h2 className="text-2xl font-bold mb-4">Nifty Price Action Chart</h2>
      <div className="w-full">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Chart;

// Use useClient to mark the component as a client-side component
export const useClient = () => {
  return { client: true };
};
