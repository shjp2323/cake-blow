document.addEventListener("DOMContentLoaded", function () {
  const cake = document.querySelector(".cake");
  const candleCountDisplay = document.getElementById("candleCount");

  // حذف شمع‌های قبلی (اگر وجود دارند)
  const oldCandles = cake.querySelectorAll(".candle");
  oldCandles.forEach(c => c.remove());

  const candles = [];
  const numCandles = 10; // تعداد شمع‌ها
  const centerX = 125; // مرکز افقی کیک
  const centerY = 40;  // ارتفاع روی سطح کیک
  const radiusX = 110; // شعاع افقی بیضی کشیده
  const radiusY = 50;  // شعاع عمودی بیضی

  // اضافه کردن شمع‌ها روی سطح کیک به شکل بیضی کشیده
  for (let i = 0; i < numCandles; i++) {
    const angle = (i / numCandles) * 2 * Math.PI;
    const x = centerX + radiusX * Math.cos(angle) - 6; // 6 نصف عرض شمع
    const y = centerY + radiusY * Math.sin(angle) - 20; // روی سطح کیک

    const candle = document.createElement("div");
    candle.className = "candle";
    candle.style.left = x + "px";
    candle.style.top = y + "px";

    const flame = document.createElement("div");
    flame.className = "flame";
    candle.appendChild(flame);

    cake.appendChild(candle);
    candles.push(candle);
  }

  function updateCandleCount() {
    const activeCandles = candles.filter(
      (candle) => !candle.classList.contains("out")
    ).length;
    candleCountDisplay.textContent = activeCandles;
  }

  updateCandleCount();

  // متن Blow! پایین صفحه
  let blowText = document.getElementById("blowText");
  if (!blowText) {
    blowText = document.createElement("div");
    blowText.id = "blowText";
    blowText.textContent = "Blow!";
    blowText.style.position = "fixed";
    blowText.style.bottom = "20px";
    blowText.style.left = "50%";
    blowText.style.transform = "translateX(-50%)";
    blowText.style.fontSize = "48px"; // بزرگ
    blowText.style.color = "black";
    blowText.style.fontFamily = "Arial, sans-serif";
    blowText.style.textAlign = "center";
    document.body.appendChild(blowText);
  }

  // میکروفون برای فوت شمع
  let audioContext, analyser, microphone;

  function isBlowing() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
    let average = sum / bufferLength;
    return average > 40;
  }

  // خاموش کردن همه شمع‌ها وقتی فوت می‌کنیم
  function blowOutCandles() {
    if (!analyser) return;
    if (isBlowing()) {
      candles.forEach((candle) => {
        if (!candle.classList.contains("out")) {
          candle.classList.add("out");
          const flame = candle.querySelector(".flame");
          if (flame) flame.style.display = "none"; // خاموش کردن شعله
        }
      });
      updateCandleCount();
    }
  }

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 256;
        setInterval(blowOutCandles, 200);
      })
      .catch(function (err) {
        console.log("Unable to access microphone: " + err);
      });
  } else {
    console.log("getUserMedia not supported on your browser!");
  }
});