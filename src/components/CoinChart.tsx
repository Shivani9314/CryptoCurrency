import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type CoinChartProps = {
  id: string | undefined;
  days: string;
};

function CoinChart({ id, days }: CoinChartProps) {
  const [coinData, setCoinData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setCoinData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (id && days) {
      fetchData();
    }
  }, [id, days]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!coinData) {
    return <div>No data available</div>;
  }

  const chartData = {
    labels: coinData.prices.map((price: [number, number]) => {
      const date = new Date(price[0]);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }),
    datasets: [
      {
        label: 'Price in USD',
        data: coinData.prices.map((price: [number, number]) => price[1]),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="App">
      <p className='text-xl text-center'>{id?.toLocaleUpperCase()} Price Chart</p>
      <Line data={chartData} height={80}/>
    </div>
  );
}

export default CoinChart;
