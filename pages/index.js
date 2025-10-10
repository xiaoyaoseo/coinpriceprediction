import { useState } from 'react';
import TrendChart from '../components/TrendChart';

const HOT_COINS = ['BTC', 'ETH', 'SOL', 'BNB', 'DOGE'];

export default function Home() {
  const [coin, setCoin] = useState('');
  const [selected, setSelected] = useState('');
  const [trendData, setTrendData] = useState(null);

  // 查询币种趋势
  async function handleSearch(e) {
    e.preventDefault();
    if (!coin) return;
    setSelected(coin);
    const res = await fetch(`/api/predict?coin=${coin}`);
    const data = await res.json();
    setTrendData(data);
  }

  // 首页热门币种趋势
  return (
    <div style={{maxWidth:800,margin:'auto',padding:24}}>
      <h1>AI数字货币趋势预测</h1>
      <form onSubmit={handleSearch} style={{marginBottom:32}}>
        <input
          value={coin}
          onChange={e => setCoin(e.target.value.toUpperCase())}
          placeholder="输入币种（如BTC、ETH）"
          style={{padding:8,fontSize:16,width:200}}
        />
        <button type="submit" style={{padding:8,fontSize:16,marginLeft:8}}>查询</button>
      </form>
      <h2>热门币种未来趋势预测</h2>
      <div style={{display:'flex',gap:32,flexWrap:'wrap'}}>
        {HOT_COINS.map(c => (
          <div key={c} style={{width:350}}>
            <TrendChart coin={c}/>
          </div>
        ))}
      </div>
      {selected && trendData && (
        <div style={{marginTop:48}}>
          <h2>{selected} 未来价格趋势预测</h2>
          <TrendChart coin={selected} data={trendData}/>
        </div>
      )}
    </div>
  );
}