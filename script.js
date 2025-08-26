// تعداد کل شمع‌ها
const totalCandles = 27;

// محاسبه موقعیت‌های دایره‌ای برای شمع‌ها
function generateCandles() {
  const candles = [];
  const centerX = 150; // مرکز کیک
  const centerY = 155; // بالای لایه‌ی بالایی
  const radius = 60;   // فاصله شمع‌ها از مرکز

  for (let i = 0; i < totalCandles; i++) {
    const angle = (2 * Math.PI / totalCandles) * i;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    candles.push({ x, y });
  }
  return candles;
}

// ایجاد شمع‌ها روی کیک
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

    // کلیک برای خاموش کردن شمع
    candle.addEventListener('click', () => {
      candle.classList.add('off');
    });

    cake.appendChild(candle);
  });
}

// شمع‌ها هنگام بارگذاری ایجاد میشن
window.onload = createCandles;