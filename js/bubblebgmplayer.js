// 元素
const bubble = document.getElementById('bubble-bgm');
const audio = document.getElementById('audio');

const btnPlay = document.getElementById('btn-play');
const btnStop = document.getElementById('btn-stop');
const btnNext = document.getElementById('btn-next');

let dragging = false, offsetX = 0, offsetY = 0;
let playlist = [], index = 0, isPlaying = false;

// 禁止选中
[bubble, btnPlay, btnStop, btnNext].forEach(el => el.style.userSelect = "none");

// 读取 GitHub 播放列表
fetch('https://raw.githubusercontent.com/girlishmarinegarden-dot/asset/main/bgm/playlist.json')
.then(res => res.json())
.then(data => {
    playlist = data.tracks || [];
    if (playlist.length > 0) audio.src = playlist[0].url;
});

// ▶️ 播放
btnPlay.addEventListener('click', e => {
    e.stopPropagation();
    audio.play();
    isPlaying = true;
    btnPlay.style.display = 'none';
    btnStop.style.display = 'block';
});

// ⏹️ 停止
btnStop.addEventListener('click', e => {
    e.stopPropagation();
    audio.pause();
    audio.currentTime = 0;

    isPlaying = false;
    btnStop.style.display = 'none';
    btnPlay.style.display = 'block';
});

// ⏭️ 下一首
btnNext.addEventListener('click', e => {
    e.stopPropagation();
    index = (index + 1) % playlist.length;
    audio.src = playlist[index].url;
    audio.play();

    isPlaying = true;
    btnPlay.style.display = 'none';
    btnStop.style.display = 'block';
});

// 自动下一曲
audio.addEventListener('ended', () => {
    index = (index + 1) % playlist.length;
    audio.src = playlist[index].url;
    audio.play();
});

// ----------------------------
// 拖拽功能
// ----------------------------
bubble.addEventListener('mousedown', e => {
    dragging = true;
    offsetX = e.clientX - bubble.offsetLeft;
    offsetY = e.clientY - bubble.offsetTop;
});

document.addEventListener('mousemove', e => {
    if (dragging) {
        bubble.style.left = (e.clientX - offsetX) + "px";
        bubble.style.top  = (e.clientY - offsetY) + "px";
    }
});

document.addEventListener('mouseup', ()=> dragging = false);

// ----------------------------
// 自动漂浮 + 边缘反弹
// ----------------------------
let vx = 1.2, vy = 0.9;

function floatBubble() {
    if (!dragging) {
        let rect = bubble.getBoundingClientRect();

        let x = rect.left + vx;
        let y = rect.top + vy;

        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;

        if (x <= 0 || x >= maxX) vx *= -1;
        if (y <= 0 || y >= maxY) vy *= -1;

        bubble.style.left = x + "px";
        bubble.style.top  = y + "px";
    }
    requestAnimationFrame(floatBubble);
}
floatBubble();
