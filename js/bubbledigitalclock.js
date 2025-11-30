const bubble = document.getElementById("bubbleClock");
const clockText = document.getElementById("clockText");

// --- 初始位置 ---
let pos = {
  x: window.innerWidth * 0.5,
  y: window.innerHeight * 0.4
};

// --- 漂浮方向 ---
let velocity = { x: (Math.random()*1 - 0.5)*0.4, y: (Math.random()*1 - 0.5)*0.4 };

// 鼠标位置
let mouse = { x: 0, y: 0 };

// 逃跑距离阈值
const SAFE_DIST = 120;

// --- 更新时间（无需间隔） ---
function updateClock() {
  const d = new Date();
  let hh = String(d.getHours()).padStart(2, "0");
  let mm = String(d.getMinutes()).padStart(2, "0");
  let ss = String(d.getSeconds()).padStart(2, "0");
  clockText.textContent = `${hh}:${mm}:${ss}`;
}

// --- 鼠标移动监听 ---
document.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// --- 点击受惊乱飞 ---
bubble.addEventListener("click", () => {
  velocity.x = (Math.random() * 6 - 3);
  velocity.y = (Math.random() * 6 - 3);
});

// --- 主动画 RAF ---
function animate() {
  updateClock(); // 用本地时间，无开销

  let dx = pos.x - mouse.x;
  let dy = pos.y - mouse.y;
  let dist = Math.hypot(dx, dy);

  // 逃跑逻辑
  if (dist < SAFE_DIST) {
    let force = (SAFE_DIST - dist) / SAFE_DIST; // 0～1
    velocity.x += (dx / dist) * force * 0.5;
    velocity.y += (dy / dist) * force * 0.5;
  }

  // 自由漂浮轻微随机扰动
  velocity.x += (Math.random() - 0.5) * 0.02;
  velocity.y += (Math.random() - 0.5) * 0.02;

  // 阻尼，不然无限加速
  velocity.x *= 0.98;
  velocity.y *= 0.98;

  // 更新位置
  pos.x += velocity.x;
  pos.y += velocity.y;

  // 边界反弹
  if (pos.x < 90 || pos.x > window.innerWidth - 90) velocity.x *= -1;
  if (pos.y < 90 || pos.y > window.innerHeight - 90) velocity.y *= -1;

  // 更新 DOM
  bubble.style.left = pos.x + "px";
  bubble.style.top = pos.y + "px";

  requestAnimationFrame(animate);
}

animate();
