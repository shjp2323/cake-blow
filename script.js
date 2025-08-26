const candlesContainer = document.querySelector('.candles');
const blowSound = document.getElementById('blowSound');

const candleCount = 5;

// شمع‌ها کنار متن Happy Birthday
for (let i = 0; i < candleCount; i++) {
    const candle = document.createElement('div');
    candle.classList.add('candle');

    const flame = document.createElement('div');
    flame.classList.add('flame');
    candle.appendChild(flame);

    candlesContainer.appendChild(candle);
}

// تشخیص صدا برای خاموش کردن شمع با حساسیت بالا
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const mediaStreamSource = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        mediaStreamSource.connect(analyser);
        analyser.fftSize = 512;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function detectBlow() {
            analyser.getByteFrequencyData(dataArray);
            const volume = dataArray.reduce((a,b)=>a+b)/dataArray.length;
            if(volume > 40){ // 🔹 با صدای خیلی کم خاموش میشه
                blowSound.play();
                document.querySelectorAll('.flame').forEach(f => f.style.display = 'none');
            }
            requestAnimationFrame(detectBlow);
        }
        detectBlow();
    });
}