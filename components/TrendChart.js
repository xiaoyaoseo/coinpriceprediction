import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

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

  if (!trend) return <div>趋势加载中...</div>;

  const chartData = {
    labels: trend.dates,
    datasets: [
      {
        label: `${coin} 价格预测`,
        data: trend.prices,
        fill: false,
        backgroundColor: 'rgba(99, 132, 255, 0.7)',
        borderColor: 'rgba(99, 132, 255, 1)',
        tension: 0.3,
      },
    ],
  };

  return (
    <Line data={chartData}
      options={{
        scales: {
          y: { beginAtZero: false },
        },
        plugins: { legend: { display: false } },
        responsive: true,
        maintainAspectRatio: false,
      }}
      height={220}
    />
  );
}