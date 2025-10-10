import { useState } from 'react';
import TrendChart from '../components/TrendChart';

const HOT_COINS = ['BTC', 'ETH', 'SOL', 'BNB', 'DOGE'];

export default function Home() {
  const [coin, setCoin] = useState('');
  const [selected, setSelected] = useState('');
  const [trendData, setTrendData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!coin) return;
    setLoading(true);
    setSelected(coin);
    try {
      const res = await fetch(`/api/predict?coin=${coin}`);
      const data = await res.json();
      setTrendData(data);
    } catch (err) {
      setTrendData(null);
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <h1 className="title">🔮 AI数字货币趋势预测</h1>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          className="input"
          value={coin}
          onChange={e => setCoin(e.target.value.toUpperCase())}
          placeholder="请输入币种名称（如BTC、ETH）"
        />
        <button className="button" type="submit">查询趋势</button>
      </form>
      <h2 className="subtitle">🔥 热门币种趋势</h2>
      <div className="hot-coins">
        {HOT_COINS.map(c => (
          <div key={c} className="chart-card">
            <TrendChart coin={c} />
            <div className="coin-label">{c}</div>
          </div>
        ))}
      </div>
      {selected && (
        <div className="result">
          <h2>{selected} 未来价格趋势</h2>
          {loading ? <div>加载中...</div> : <TrendChart coin={selected} data={trendData} />}
        </div>
      )}
      <style jsx>{`
        .container { max-width: 900px; margin: auto; padding: 32px 8px; }
        .title { font-size: 2.5rem; text-align: center; font-weight: bold; margin-bottom: 36px; }
        .search-bar { display: flex; justify-content: center; gap: 12px; margin-bottom: 32px; }
        .input { padding: 10px; font-size: 1.1rem; border-radius: 6px; border: 1px solid #ddd; width: 220px; }
        .button { padding: 10px 20px; background: #3B82F6; color: #fff; border: none; border-radius: 6px; font-size: 1.1rem; cursor: pointer; }
        .button:hover { background: #2563EB; }
        .subtitle { margin: 24px 0 16px 0; font-size: 1.4rem; color: #2563EB; text-align: center;}
        .hot-coins { display: flex; flex-wrap: wrap; gap: 32px; justify-content: center; }
        .chart-card { background: #f9f9f9; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); padding: 18px 10px 10px 10px; width: 320px; }
        .coin-label { text-align: center; margin-top: 6px; font-weight: bold; color: #3B82F6; }
        .result { margin-top: 48px; padding: 18px; border-radius:10px; background: #f5f8ff; }
        @media (max-width: 800px) {
          .hot-coins { flex-direction: column; align-items: center; }
          .chart-card { width: 100%; }
        }
      `}</style>
    </div>
  );
}