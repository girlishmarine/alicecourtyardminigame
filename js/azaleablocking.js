// js/azaleablocking.js   ← 终极版，永久与时钟气泡时间一致
(() => {
  const azaleaBlock = document.getElementById('azalea-block');
  const azaleaMsg   = document.getElementById('azalea-msg');

  // 让外部可使用 azaleaBlock （关键修复）
  window.__azaleaBlock = azaleaBlock;

  function isCourtyardOpen() {
    const d = new Date();
    const h = d.getHours();
    const m = new Date().getMinutes();

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
      azaleaBlock.style.display = 'none';
    } else {
      azaleaBlock.style.display = 'block';
      azaleaBlock.style.animation = 'azaleaFadeIn 2s ease-out forwards';
      azaleaMsg.textContent = '庭院 06:01 AM 开放 / Courtyard opens at 06:01 AM';
    }
  }

  window.updateAzaleaBlock = updateAzaleaBlock; // 暴露出去（关键）

  updateAzaleaBlock();
  setInterval(updateAzaleaBlock, 1000);

})();
  

// --- Azalea 点击彩蛋事件（三个透明区域） ---
function setupAzaleaTouchZones() {
  const azaleaBlock = window.__azaleaBlock; // 使用外部引用
  if (!azaleaBlock) return;

  const zones = [
    { id: 'azalea-head',    lines: ['别…乱摸头发。', '你在…摸哪里？', '……（轻轻把你的手推开）'] },
    { id: 'azalea-body',    lines: ['请勿触碰中枢模块。', '……（身体微微躲开）', '你这是违规行为。'] },
    { id: 'azalea-legs',    lines: ['……腿部不接受触碰。', '你…这样会被记录。', '还不睡吗？'] }
  ];

  zones.forEach(zone => {
    let div = document.createElement('div');
    div.id = zone.id;

    Object.assign(div.style, {
      position: 'absolute',
      left: '0',
      width: '100%',
      height: '33%',
      zIndex: '99999',
      cursor: 'pointer',
      backgroundColor: 'transparent'
    });

    azaleaBlock.appendChild(div);

    div.addEventListener('click', () => {
      const text = zone.lines[Math.floor(Math.random() * zone.lines.length)];
      showAzaleaBubble(text);
    });
  });

  document.getElementById('azalea-head').style.top = '0';
  document.getElementById('azalea-body').style.top = '33%';
  document.getElementById('azalea-legs').style.top = '66%';
}


// --- 显示对白气泡 ---
function showAzaleaBubble(text) {
  const azaleaBlock = window.__azaleaBlock;
  if (!azaleaBlock) return;

  const bubble = document.createElement('div');
  bubble.textContent = text;

  Object.assign(bubble.style, {
    position: 'absolute',
    bottom: '110%',
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


// --- 让彩蛋区在 Azalea “出现”时启用 ---
const _originalUpdateAzaleaBlock = window.updateAzaleaBlock;

window.updateAzaleaBlock = function () {
  _originalUpdateAzaleaBlock();

  const azaleaBlock = window.__azaleaBlock;

  if (azaleaBlock && azaleaBlock.style.display === 'block') {
    if (!document.getElementById('azalea-head')) {
      setupAzaleaTouchZones();
    }
  }
};
