const candlesContainer = document.querySelector('.candles');
const blowSound = document.getElementById('blowSound');

const candleCount = 27;

// موقعیت‌های شمع‌ها روی کیک (دایره‌ای)
const cakeTopWidth = 100;
const cakeTopHeight = 50;
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2 - 150; // تقریبی بالای کیک

for(let i = 0; i < candleCount; i++){
    const angle = (i / candleCount) * 2 * Math.PI;
    const radius = 50; // شعاع چرخش شمع‌ها روی لایه بالا
    const x = centerX + radius * Math.cos(angle) - 3; // 3 نصف عرض شمع
    const y = centerY + radius * Math.sin(angle) - 30; // 30 ارتفاع شمع

    const candle = document.createElement('div');
    candle.classList.add('candle');

    const flame = document.createElement('div');
    flame.classList.add('flame');
    candle.appendChild(flame);

    candle.style.left = `${x}px`;
    candle.style.top = `${y}px`;

    candlesContainer.appendChild(candle);
}

// تشخیص صدا برای خاموش کردن شمع
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
            if(volume > 100){ // اگر صدا بالاتر از حد بود
                blowSound.play();
                document.querySelectorAll('.flame').forEach(f => f.style.display = 'none');
            }
            requestAnimationFrame(detectBlow);
        }
        detectBlow();
    });
}