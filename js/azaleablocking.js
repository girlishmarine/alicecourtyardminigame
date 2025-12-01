// js/azaleablocking.js ← 极简版，只加载时判断，不轮询
(() => {
  const azaleaBlock = document.getElementById('azalea-block');
  const azaleaMsg   = document.getElementById('azalea-msg');

  if (!azaleaBlock) return;

  window.__azaleaBlock = azaleaBlock;

  // 判断庭院是否开门
  function isCourtyardOpen() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();

    // 营业时间：00:00 ~ 06:00（含06:00）关门，06:01 ~ 23:59 开门
    if (h < 6 || (h === 6 && m === 0)) return false;
    return true;
  }

  // 初始化 Azalea 显示状态
  function initAzalea() {
    if (isCourtyardOpen()) {
      azaleaBlock.style.display = 'none';
    } else {
      azaleaBlock.style.display = 'block';
      azaleaBlock.style.animation = 'azaleaFadeIn 2s ease-out forwards';
      azaleaMsg.textContent = '庭院 06:01 AM 开放 / Courtyard opens at 06:01 AM';
      setupAzaleaTouchZones(); // 只生成一次小按钮
    }
  }

  window.updateAzaleaBlock = initAzalea;

  initAzalea(); // 页面加载立即执行
})();


// --- Azalea 点击彩蛋事件（50px 小按钮） ---
function setupAzaleaTouchZones() {
  const azaleaBlock = window.__azaleaBlock;
  if (!azaleaBlock) return;

  // 避免重复生成
  if (document.getElementById('azalea-head-btn')) return;

  const buttons = [
    {
      id: 'azalea-head-btn',
      top: '18%',
      left: '60%',
      lines: ['别…乱摸头发。', '你在…摸哪里？', '……（轻轻把你的手推开）']
    },
    {
      id: 'azalea-body-btn',
      top: '48%',
      left: '60%',
      lines: ['请勿触碰中枢模块。', '……（身体微微躲开）', '你这是违规行为。']
    },
    {
      id: 'azalea-legs-btn',
      top: '78%',
      left: '60%',
      lines: ['……腿部不接受触碰。', '你…这样会被记录。', '还不睡吗？']
    }
  ];

  buttons.forEach(btn => {
    const div = document.createElement('div');
    div.id = btn.id;

    Object.assign(div.style, {
      position: 'absolute',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      left: btn.left,
      top: btn.top,
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(255,0,0,0)', // 完全透明
      cursor: 'pointer',
      zIndex: '99999'
    });

    div.addEventListener('click', () => {
      const text = btn.lines[Math.floor(Math.random() * btn.lines.length)];
      showAzaleaBubble(text);
    });

    azaleaBlock.appendChild(div);
  });
}


// --- 显示 Azalea 对白气泡 ---
function showAzaleaBubble(text) {
  const azaleaBlock = window.__azaleaBlock;
  if (!azaleaBlock) return;

  const bubble = document.createElement('div');
  bubble.textContent = text;

  Object.assign(bubble.style, {
    position: 'absolute',
    bottom: '90%', // 改成 90% 更安全，不易跑出屏幕
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '8px 14px',
    background: 'rgba(255,255,255,0.9)',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#333',
    zIndex: '100000',
    animation: 'fadeOut 2s forwards'
  });

  azaleaBlock.appendChild(bubble);

  setTimeout(() => bubble.remove(), 2000);
}

