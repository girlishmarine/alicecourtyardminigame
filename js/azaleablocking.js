// js/azaleablocking.js   ← 终极版，永久与时钟气泡时间一致
(() => {
  const azaleaBlock = document.getElementById('azalea-block');
  const azaleaMsg   = document.getElementById('azalea-msg');

  // 如果你已经有了 updateClock 函数（在 bubbles-unified.js 里一定有），我们直接复用它！
  // 为了不重复利用，我把它暴露到 window 上（只加一行）
  // → 在 bubbles-unified.js 最下面加一句： window.getCurrentTime = () => clockText.textContent;

  // 但最稳妥的做法是直接把“是否开园”的逻辑做成一个纯函数，哪里都能用
  function isCourtyardOpen() {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();

    // 营业时间规则：
    // 00:00 ~ 06:00（包含 06:00）关门
    // 06:01 ~ 23:59 开门

    if (h < 6 || (h === 6 && m === 0)) {
      return false; // 关门
    }

    return true; // 开门
  }

  function updateAzaleaBlock() {
    const open = isCourtyardOpen();
    const h = new Date().getHours();
    const m = new Date().getMinutes();

    if (open) {
      // 开放中 → 隐藏 Azalea
      azaleaBlock.style.display = 'none';

    } else {
      // 关闭中 → 显示 Azalea
      azaleaBlock.style.display = 'block';
      azaleaBlock.style.animation = 'azaleaFadeIn 2s ease-out forwards';

      // 提示：庭院 06:01 AM 开放
      azaleaMsg.textContent = '庭院 06:01 AM 开放 / Courtyard opens at 06:01 AM';
    }
  }

  // 立即执行一次
  updateAzaleaBlock();

  // 每秒检查一次（与时钟气泡完全同步，不多不少）
  setInterval(updateAzaleaBlock, 1000);

  // 可选：每天 06:01 或 00:00 的彩蛋动画（你想开的话）
  // setInterval(() => {
  //   const h = new Date().getHours();
  //   const m = new Date().getMinutes();
  //   if ((h === 6 && m === 1) || (h === 0 && m === 0)) {
  //     azaleaBlock.style.animation = 'azaleaFadeIn 1s ease 3'; // 闪三下
  //   }
  // }, 60000);

})();

// --- Azalea 点击彩蛋事件（三个透明区域） ---
function setupAzaleaTouchZones() {
  if (!azaleaBlock) return;

  // 创建三个透明 div
  const zones = [
    { id: 'azalea-head',    lines: ['别…乱摸头发。', '你在…摸哪里？', '……（轻轻把你的手推开）'] },
    { id: 'azalea-body',    lines: ['请勿触碰中枢模块。', '……（身体微微躲开）', '你这是违规行为。'] },
    { id: 'azalea-legs',    lines: ['……腿部不接受触碰。', '你…这样会被记录。', '还不睡吗？'] }
  ];

  zones.forEach(zone => {
    let div = document.createElement('div');
    div.id = zone.id;

    // 完全透明的点击区域
    Object.assign(div.style, {
      position: 'absolute',
      left: '0',
      width: '100%',
      height: '33%',    // 每个区域占 1/3
      zIndex: '99999',
      cursor: 'pointer',
      backgroundColor: 'transparent'
    });

    azaleaBlock.appendChild(div);

    // 点击：随机一句台词
    div.addEventListener('click', () => {
      const text = zone.lines[Math.floor(Math.random() * zone.lines.length)];
      showAzaleaBubble(text);
    });
  });

  // 设置区域位置：上 / 中 / 下 三段
  document.getElementById('azalea-head').style.top = '0';
  document.getElementById('azalea-body').style.top = '33%';
  document.getElementById('azalea-legs').style.top = '66%';
}

// --- 显示对白气泡 ---
function showAzaleaBubble(text) {
  // 创建气泡
  const bubble = document.createElement('div');
  bubble.textContent = text;

  Object.assign(bubble.style, {
    position: 'absolute',
    bottom: '110%', // Azalea 上方一点点
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

  // 两秒后移除
  setTimeout(() => bubble.remove(), 2000);
}

// 让彩蛋区在 Azalea 出现时启用
const _originalUpdateAzaleaBlock = updateAzaleaBlock;
updateAzaleaBlock = function () {
  _originalUpdateAzaleaBlock();

  if (azaleaBlock.style.display === 'block') {
    // 出现时初始化（只初始化一次）
    if (!document.getElementById('azalea-head')) {
      setupAzaleaTouchZones();
    }
  }
};

