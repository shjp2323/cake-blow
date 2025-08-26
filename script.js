document.addEventListener("DOMContentLoaded", function () {
  const cake = document.querySelector(".cake");
  const candleCountDisplay = document.getElementById("candleCount");
  let candles = [];
  
  function updateCandleCount() {
    const activeCandles = candles.filter(c => !c.classList.contains("out")).length;
    candleCountDisplay.textContent = activeCandles;
  }

  function addCandle(left, top) {
    const candle = document.createElement("div");
    candle.className = "candle";
    candle.style.left = left + "px";
    candle.style.top = top + "px";

    const flame = document.createElement("div");
    flame.className = "flame";
    candle.appendChild(flame);

    cake.appendChild(candle);
    candles.push(candle);
    updateCandleCount();
  }

  // اضافه کردن 27 شمع از اول
  const cakeWidth = cake.offsetWidth;
  const top = 50; // ارتفاع شمع‌ها روی کیک
  for (let i = 0; i < 27; i++) {
    const spacing = cakeWidth / 28; // فاصله بین شمع‌ها
    const left = spacing * (i + 1) - 5;
    addCandle(left, top);
  }

  updateCandleCount();
});
