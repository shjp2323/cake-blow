// 27 شمع با موقعیت دلخواه روی کیک
const candles = [
    {x: 20, y: 0}, {x: 40, y: 0}, {x: 60, y: 0}, {x: 80, y: 0}, {x: 100, y: 0},
    {x: 120, y: 0}, {x: 140, y: 0}, {x: 160, y: 0}, {x: 180, y: 0}, {x: 200, y: 0},
    {x: 30, y: 50}, {x: 60, y: 50}, {x: 90, y: 50}, {x: 120, y: 50}, {x: 150, y: 50},
    {x: 180, y: 50}, {x: 210, y: 50}, {x: 40, y: 100}, {x: 80, y: 100}, {x: 120, y: 100},
    {x: 160, y: 100}, {x: 200, y: 100}, {x: 240, y: 100}, {x: 60, y: 150}, {x: 120, y: 150},
    {x: 180, y: 150}
];

function createCandles() {
    const cake = document.querySelector('.cake');
    candles.forEach(pos => {
        const candle = document.createElement('div');
        candle.classList.add('candle');
        candle.style.left = pos.x + 'px';
        candle.style.top = pos.y + 'px';
        cake.appendChild(candle);
    });
}

window.onload = createCandles;