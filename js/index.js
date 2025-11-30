// ===== 粒子系统 =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const particles = [];
for(let i = 0; i < 90; i++){
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2.2 + 0.5,
    speed: Math.random() * 0.7 + 0.2,
    angle: Math.random() * Math.PI * 2,
    color: Math.random() > 0.5 ? 'rgba(255,220,100,0.6)' : 'rgba(220,180,255,0.6)'
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    if(p.x < 0 || p.x > canvas.width) p.angle = Math.PI - p.angle;
    if(p.y < 0 || p.y > canvas.height) p.angle = -p.angle;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

// ===== 切换盒子 =====
function switchBox(id) {
  document.querySelectorAll('.box').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ===== API 地址 =====
const API = "https://script.google.com/macros/s/AKfycbzcEAbZIcawFxex8-el1w42fVgZUnA4mceshohxbQWMvGw_oC1RABdIa-4N-eBQwxf0/exec";

// ===== 密码校验 =====
function isValidPassword(p) {
  return /^[a-zA-Z0-9]+$/.test(p) && /[a-zA-Z]/.test(p) && /\d/.test(p);
}

// ===== 注册 =====
function register() {
  let nick = document.getElementById("regNick").value.trim();
  let pass = document.getElementById("regPass").value;
  let pass2 = document.getElementById("regPass2").value;

  if (!nick || !pass) return alert("请填写完整信息哦~");
  if (pass !== pass2) return alert("两次密码不一致呢");
  if (!isValidPassword(pass)) return alert("密码需包含字母和数字哦~（不允许符号）");

  fetch(API, {
    method: "POST",
    body: JSON.stringify({ action: "register", nickname: nick, password: pass })
  })
  .then(r => r.json())
  .then(data => {
    alert(data.message);
    if (data.status === "ok") switchBox("loginBox");
  });
}

// ===== 登录 =====
let currentUserData = null;

function login() {
  let nick = document.getElementById("loginNick").value.trim();
  let pass = document.getElementById("loginPass").value;
  if (!nick || !pass) return alert("请填写昵称和密码哦~");

  fetch(API + "?action=login&nickname=" + encodeURIComponent(nick) + "&password=" + encodeURIComponent(pass))
    .then(r => r.json())
    .then(data => {
      if (data.status !== "ok") return alert(data.message);

      currentUserData = data.user;
      localStorage.setItem("nickname", data.user.nickname);
      localStorage.setItem("password", data.user.password);
      localStorage.setItem("title", data.user.title);
      localStorage.setItem("owncard", data.user.owncard);

      showWelcomeDialogue(nick);
    });
}

// ===== 欢迎对白 =====
const dialogues = [
  "欢迎回来，{nick}～",
  "庭院的门已为你开启...",
  "白玫瑰在风中低语，",
  "柴郡猫正偷偷对你笑呢。",
  "准备好了吗？",
  "让我们一起坠入梦境吧～"
];

function showWelcomeDialogue(nick) {
  const dialogueEl = document.getElementById('dialogue');
  const textEl = document.getElementById('dialogueText');
  dialogueEl.classList.add('show');

  let i = 0;
  function typeNext() {
    if (i >= dialogues.length) {
      setTimeout(() => { explodeFragments(30); }, 800);
      return;
    }

    const line = dialogues[i].replace('{nick}', nick);
    let charIndex = 0;
    textEl.textContent = '';
    textEl.classList.add('typing');

    const interval = setInterval(() => {
      if (charIndex < line.length) {
        textEl.textContent += line[charIndex];
        charIndex++;
      } else {
        clearInterval(interval);
        textEl.classList.remove('typing');
        i++;
        setTimeout(typeNext, 1000);
      }
    }, 60);
  }

  typeNext();
  explodeFragments(20);
}

function closeDialogue() {
  document.getElementById('dialogue').classList.remove('show');
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 600);
}

// ===== 碎片爆炸效果 =====
function explodeFragments(count) {
  for(let i = 0; i < count; i++){
    const f = document.createElement('div');
    f.className = 'fragment';
    f.style.left = (Math.random() * 80 + 10) + '%';
    f.style.top = (Math.random() * 80 + 10) + '%';
    f.style.animationDuration = (2 + Math.random() * 3) + 's';
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 6000);
  }
}

// ===== 事件绑定 =====
document.getElementById('loginBtn').addEventListener('click', login);
document.getElementById('registerBtn').addEventListener('click', register);
document.getElementById('toRegister').addEventListener('click', () => switchBox('registerBox'));
document.getElementById('toLogin').addEventListener('click', () => switchBox('loginBox'));
document.getElementById('enterGarden').addEventListener('click', closeDialogue);


