// ==================== Moe黑猫彩蛋（完整版） ====================

// 自动生成图片数组： /image/moe/1.png ~ /image/moe/25.png
const moeImages = Array.from({ length: 25 }, (_, i) => `./image/moe/${i + 1}.png`);

const moeLines = [
  "喵~你好呀~",
  "今天要摸摸我吗？",
  "偷偷盯着你…",
  "欸嘿，被发现啦。",
  "喵呜——",
  "你在看我吗？",
  "嘘…我在暗中观察你。",
  "别靠太近…会被抓走的哦。",
  "喵星信号接收中…",
  "我一直都在这里哦~"
];

const bubbleSymbols = ["💖","🌟","🌙","🐾","✨","💜"];

// ⚡ Moe 循环随机出现（10~20秒）
function triggerMoe() {
  const delay = 10000 + Math.random() * 10000;
  setTimeout(() => {
    showMoe();
    triggerMoe();
  }, delay);
}

// ==================== 显示 Moe ====================
function showMoe() {
  const catWidth = 200;
  const catHeight = 200;

  const catWrapper = document.createElement('div');
  catWrapper.style.position = 'fixed';
  catWrapper.style.zIndex = '99999';
  catWrapper.style.opacity = '0';
  catWrapper.style.transition = 'all 1s ease';
  catWrapper.style.cursor = 'pointer';

  // ⭐ 安全随机初始位置
  const safeLeft = Math.random() * (window.innerWidth - catWidth);
  const safeTop = Math.random() * (window.innerHeight * 0.7); // 上70%
  catWrapper.style.left = safeLeft + 'px';
  catWrapper.style.top = safeTop + 'px';

  // 🐱 随机 Moe 立绘
  const img = document.createElement('img');
  img.src = moeImages[Math.floor(Math.random() * moeImages.length)];
  img.style.width = catWidth + 'px';
  img.style.userSelect = 'none';
  img.draggable = false;
  catWrapper.appendChild(img);

  // 🗨 随机台词气泡
  const bubble = document.createElement('div');
  bubble.textContent = moeLines[Math.floor(Math.random() * moeLines.length)];
  bubble.style.position = 'absolute';
  bubble.style.top = '-40px';
  bubble.style.left = '50%';
  bubble.style.transform = 'translateX(-50%)';
  bubble.style.background = 'rgba(50,0,70,0.8)';
  bubble.style.color = 'white';
  bubble.style.padding = '5px 12px';
  bubble.style.borderRadius = '10px';
  bubble.style.fontSize = '12px';
  bubble.style.whiteSpace = 'nowrap';
  bubble.style.opacity = '0';
  bubble.style.transition = 'opacity 0.5s';
  bubble.style.pointerEvents = 'none';
  catWrapper.appendChild(bubble);

  // ⭐ 点击触发四面八方气泡雨
  catWrapper.onclick = () => {
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.textContent = bubbleSymbols[Math.floor(Math.random() * bubbleSymbols.length)];
      particle.style.position = 'fixed';
      particle.style.left = (catWrapper.getBoundingClientRect().left + catWidth/2) + 'px';
      particle.style.top = (catWrapper.getBoundingClientRect().top + catHeight/2) + 'px';
      particle.style.fontSize = '50px';
      particle.style.opacity = '1';
      particle.style.transform = 'scale(0.3)';
      particle.style.transition = 'all 8s ease-out';
      particle.style.pointerEvents = 'none';
      document.body.appendChild(particle);

      // 随机四面八方移动 + 缓缓下落
      setTimeout(() => {
        const angle = Math.random() * 2 * Math.PI;
        const distance = 100 + Math.random() * 100;
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance + 50; // 下落
        particle.style.left = (particle.offsetLeft + offsetX) + 'px';
        particle.style.top  = (particle.offsetTop + offsetY) + 'px';
        particle.style.opacity = '0';
        particle.style.transform = 'scale(1.4)';
      }, 50);

      setTimeout(() => particle.remove(), 10000);
    }
  };

  document.body.appendChild(catWrapper);

  // 进入动画
  setTimeout(() => {
    catWrapper.style.opacity = '1';
    bubble.style.opacity = '1';
  }, 50);

  // 🐾 行动机制（追随鼠标/中央 → 逃跑）
  animateMoe(catWrapper, catWidth, catHeight);
}

// ==================== Moe 行动机制 ====================
function animateMoe(catWrapper, catWidth, catHeight) {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (!isMobile) {
    // 桌面：追随鼠标
    function followMouse(event) {
      let x = event.clientX - catWidth/2;
      let y = event.clientY - catHeight/2;
      // 安全边界
      x = Math.max(0, Math.min(window.innerWidth - catWidth, x));
      y = Math.max(0, Math.min(window.innerHeight - catHeight, y));
      catWrapper.style.left = x + 'px';
      catWrapper.style.top  = y + 'px';
    }

    document.addEventListener('mousemove', followMouse);

    setTimeout(() => {
      document.removeEventListener('mousemove', followMouse);
      // 随机逃跑方向
      const exitX = Math.random() < 0.5 ? -catWidth - 50 : window.innerWidth + 50;
      catWrapper.style.transition = 'all 1s ease';
      catWrapper.style.left = exitX + 'px';
      catWrapper.style.opacity = '0';
      setTimeout(() => catWrapper.remove(), 1000);
    }, 6000);

  } else {
    // 📱 手机：中央出现 → 跳出画面
    catWrapper.style.left = '50%';
    catWrapper.style.top = '50%';
    catWrapper.style.transform = 'translate(-50%, -50%) scale(0.9)';

    setTimeout(() => {
      catWrapper.style.transition = 'all 1s ease';
      catWrapper.style.top = '120%';
      catWrapper.style.opacity = '0';
      setTimeout(() => catWrapper.remove(), 1000);
    }, 6000);
  }
}

triggerMoe(); // 启动 Moe 循环
