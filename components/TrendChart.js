import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function TrendChart({ coin, data }) {
  const [trend, setTrend] = useState(null);

  useEffect(() => {
    async function fetchTrend() {
      if (data) {
        setTrend(data);
      } else {
        const res = await fetch(`/api/predict?coin=${coin}`);
        const d = await res.json();
        setTrend(d);
      }
    }
    fetchTrend();
  }, [coin, data]);

  if (!trend) return <div style={{height:180,paddingTop:50,textAlign:'center'}}>Loading trend...</div>;

  const chartData = {
    labels: trend.dates,
    datasets: [
      {
        label: `${coin} Price Prediction`,
        data: trend.prices,
        fill: true,
        backgroundColor: 'rgba(59,130,246,0.08)',
        borderColor: '#3B82F6',
        pointBackgroundColor: '#2563EB',
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{height:200}}>
      <Line
        data={chartData}
        options={{
          scales: {
            x: { grid: { display: false }},
            y: { grid: { color: '#eee' }, beginAtZero: false },
          },
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true }
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
        height={180}
      />
    </div>
  );
}