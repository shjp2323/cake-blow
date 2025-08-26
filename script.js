// تعداد شمع‌ها
const totalCandles = 27;

// موقعیت‌ها (دایره‌ای روی طبقه بالای کیک)
function generateCandles() {
  const candles = [];
  const centerX = 150; // مرکز کیک
  const centerY = 70;  // بالای لایه بالایی
  const radius = 70;   // فاصله از مرکز

  for (let i = 0; i < totalCandles; i++) {
    const angle = (2 * Math.PI / totalCandles) * i;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    candles.push({ x, y });
  }
  return candles;
}

function createCandles() {
  const cake = document.querySelector('.cake');
  const candles = generateCandles();

  candles.forEach(pos => {
    const candle = document.createElement('div');
    candle.classList.add('candle');
    candle.style.left = pos.x + 'px';
    candle.style.top = pos.y + 'px';

    const flame = document.createElement('div');
    flame.classList.add('flame');
    candle.appendChild(flame);

    candle.addEventListener('click', () => {
      flame.style.display = 'none'; // شمع خاموش میشه
    });

    cake.appendChild(candle);
  });
}

window.onload = createCandles;