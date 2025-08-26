const candlesContainer = document.querySelector('.candles');
const blowSound = document.getElementById('blowSound');

const candleCount = 5;
const spacing = 25; // فاصله بین شمع‌ها

// شمع‌ها روی لایه بالایی
for (let i = 0; i < candleCount; i++) {
    const candle = document.createElement('div');
    candle.classList.add('candle');

    const flame = document.createElement('div');
    flame.classList.add('flame');
    candle.appendChild(flame);

    candle.style.left = `${i * spacing}px`; 
    candlesContainer.appendChild(candle);
}

// جای‌گذاری شمع‌ها روی طبقه بالا
candlesContainer.style.position = "absolute";
candlesContainer.style.top = "-20px"; /* کمی بالای لایه بالایی */
candlesContainer.style.left = "50%";
candlesContainer.style.transform = "translateX(-50%)";
candlesContainer.style.width = `${(candleCount - 1) * spacing + 10}px`;

// خاموش شدن با فوت
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
            if(volume > 100){
                blowSound.play();
                document.querySelectorAll('.flame').forEach(f => f.style.display = 'none');
            }
            requestAnimationFrame(detectBlow);
        }
        detectBlow();
    });
}