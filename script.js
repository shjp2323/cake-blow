// ساخت ۲۷ شمع نقره‌ای روی کیک
const candlesContainer = document.querySelector('.candles');
const numCandles = 27;
const radius = 60; // شعاع دایره بالای کیک

for (let i = 0; i < numCandles; i++) {
  const angle = (i / numCandles) * 2 * Math.PI;
  const x = Math.cos(angle) * radius;
  const candle = document.createElement('div');
  candle.className = 'candle';
  candle.style.left = `calc(50% + ${x}px)`;
  candle.style.bottom = '180px';

  const flame = document.createElement('div');
  flame.className = 'flame';

  candle.appendChild(flame);
  candlesContainer.appendChild(candle);
}
