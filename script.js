const candlesContainer = document.querySelector('.candles');

const candleCount = 5; // ۵ شمع
for (let i = 0; i < candleCount; i++) {
  const candle = document.createElement('div');
  candle.classList.add('candle');

  const flame = document.createElement('div');
  flame.classList.add('flame');
  candle.appendChild(flame);

  candlesContainer.appendChild(candle);
}