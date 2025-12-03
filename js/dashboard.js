// ==================== 登录检查 ====================
const nickname = localStorage.getItem("nickname");
const title = localStorage.getItem("title") || "初到庭院者";
if (!nickname) {
  alert("请先登录哦～");
  window.location.href = "login.html";
} else {
  document.getElementById("nickname").textContent = nickname;
  document.getElementById("title").textContent = title;
}

// ==================== 动态时间背景 ====================
function updateTimeTheme() {
  const h = new Date().getHours();
  const body = document.body;
  const fog = document.getElementById("fog");
  body.classList.remove("bg-morning","bg-noon","bg-evening","bg-night");
  
  if (h >= 5 && h < 10) { // 早晨
    body.classList.add("bg-morning");
    fog.style.background = "radial-gradient(circle at 40% 40%, #5e3b6aaa55, transparent 60%)";
  } else if (h >= 10 && h < 17) { // 中午
    body.classList.add("bg-noon");
    fog.style.background = "radial-gradient(circle at 50% 50%, #4b2c57aa66, transparent 70%)";
  } else if (h >= 17 && h < 21) { // 傍晚
    body.classList.add("bg-evening");
    fog.style.background = "radial-gradient(circle at 60% 40%, #7a2c63bb55, transparent 60%)";
  } else { // 夜晚
    body.classList.add("bg-night");
    fog.style.background = "radial-gradient(circle at 30% 30%, #3b1f52aa, transparent 60%), radial-gradient(circle at 70% 70%, #6a2c6abb44, transparent 60%)";
  }
}
updateTimeTheme();
setInterval(updateTimeTheme, 60000);

// ==================== 真实时钟（改为 rAF，丝滑又省电）===================
function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  document.getElementById("hour").style.transform = 
    `translate(-50%, -100%) rotate(${hours * 30}deg)`;
  document.getElementById("minute").style.transform = 
    `translate(-50%, -100%) rotate(${minutes * 6}deg)`;

  requestAnimationFrame(updateClock);
}
updateClock();

// ==================== 粒子 + 鼠标互动（加上后台/滚动暂停，手机不发热）===================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let isTabActive = true;

canvas.width = innerWidth;
canvas.height = innerHeight;
window.onresize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};

// 页面切后台或滚动时暂停粒子
window.addEventListener('visibilitychange', () => isTabActive = !document.hidden);
window.addEventListener('scroll', () => {
  isTabActive = false;
  setTimeout(() => isTabActive = true, 3000); // 滚动完3秒后恢复
});

const particles = [];
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2.5 + 0.5,
    vx: Math.random() * 0.8 - 0.4,
    vy: Math.random() * 0.8 - 0.4,
    color: Math.random() > 0.5 ? 'rgba(255,220,100,0.6)' : 'rgba(220,180,255,0.6)'
  });
}

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function drawParticles() {
  if (!isTabActive) {
    setTimeout(drawParticles, 500); // 后台每0.5秒画一次，几乎不耗电
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    const dx = p.x - mouseX;
    const dy = p.y - mouseY;
    const dist = Math.hypot(dx, dy);
    if (dist < 100) {
      p.vx += dx * 0.02;
      p.vy += dy * 0.02;
    }

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();

// ==================== 功能按钮 ====================
function startJourney() { window.location.href = "game.html"; }
function openGallery() { window.location.href = "gallery.html"; }
function logout() {
  if (confirm("真的要离开庭院吗？")) {
    localStorage.clear();
    window.location.href = "index.html";
  }
}

// ==================== 每日00:00强制自动登出（每5分钟检查一次，永不错过）===================
let hasLoggedOutToday = false;

function checkMidnightLogout() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // 00:00 ~ 00:04 之内触发一次强制登出
  if (hours === 0 && minutes < 5 && !hasLoggedOutToday) {
    hasLoggedOutToday = true;
    localStorage.clear();
    alert("庭院已闭园，明天再来哦～");
    window.location.href = "index.html";
  }

  // 每天00:05之后重置标记，准备明天
  if (hours === 0 && minutes >= 5) {
    hasLoggedOutToday = false;
  }
}

// 页面加载立即检查一次（防止正好打开时是00:01）
checkMidnightLogout();

// 每5分钟检查一次（省电300倍，不会错过午夜）
setInterval(checkMidnightLogout, 300000); // 300000ms = 5分钟
