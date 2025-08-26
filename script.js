document.addEventListener("DOMContentLoaded", function () {
  const cake = document.querySelector(".cake");
  const candleCountDisplay = document.getElementById("candleCount");
  const candles = [];
  const numCandles = 7; // تعداد شمع‌ها
  const radius = 90; // شعاع دایره روی کیک
  const centerX = 125; // مرکز کیک (نصف عرض)
  const centerY = 50;  // ارتفاع شمع‌ها روی کیک

  // اضافه کردن شمع‌ها به شکل دایره
  for (let i = 0; i < numCandles; i++) {
    const angle = (i / numCandles) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle) - 6; // 6 نصف عرض شمع
    const y = centerY + radius * Math.sin(angle) - 20; // 20 ارتفاع شمع

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

  function blowOutCandles() {
    let blownOut = 0;
    if (isBlowing()) {
      candles.forEach((candle) => {
        if (!candle.classList.contains("out") && Math.random() > 0.5) {
          candle.classList.add("out");
          blownOut++;
        }
      });
    }
    if (blownOut > 0) updateCandleCount();
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