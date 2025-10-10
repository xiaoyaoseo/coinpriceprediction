// 这里是 mock 数据。实际项目可以接入真实 AI 预测API。
export default function handler(req, res) {
  const { coin = 'BTC' } = req.query;
  // 生成模拟未来7天价格
  const base = {
    BTC: 28000,
    ETH: 1800,
    SOL: 25,
    BNB: 230,
    DOGE: 0.06,
  };
  let price = base[coin] || Math.random() * 1000 + 100;
  let trend = [];
  for (let i = 0; i < 7; i++) {
    // 随机波动
    price = price * (1 + (Math.random() - 0.5) * 0.04);
    trend.push(Number(price.toFixed(2)));
  }
  const today = new Date();
  const dates = Array.from({length:7}, (_,i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d.toISOString().slice(0,10);
  });
  res.status(200).json({ coin, dates, prices: trend });
}