// js/azaleablocking.js   ← 终极版，永久与时钟气泡时间一致
(() => {
  const azaleaBlock = document.getElementById('azalea-block');
  const azaleaMsg   = document.getElementById('azalea-msg');

  // 让外部可使用 azaleaBlock
  window.__azaleaBlock = azaleaBlock;

  function isCourtyardOpen() {
    const d = new Date();
    const h = d.getHours();
    const m = new Date().getMinutes();

    // 营业时间：00:00 ~ 06:00（含 06:00）关门，06:01 ~ 23:59 开门
    if (h < 6 || (h === 6 && m === 0)) return false;
    return true;
  }

  function updateAzaleaBlock() {
    const open = isCourtyardOpen();

    if (open) {
      azaleaBlock.style.display = 'none';
    } else {
      azaleaBlock.style.display = 'block';
      azaleaBlock.style.animation = 'azaleaFadeIn 2s ease-out forwards';
      azaleaMsg.textContent = '庭院 06:01 AM 开放 / Courtyard opens at 06:01 AM';
    }
  }

  window.updateAzaleaBlock = updateAzaleaBlock;

  updateAzaleaBlock();
  setInterval(updateAzaleaBlock, 1000);

})();


// --- Azalea 点击彩蛋事件（三个 50px 透明按钮） ---
function setupAzaleaTouchZones() {
  const azaleaBlock = window.__azaleaBlock;
  if (!azaleaBlock) return;

  // 小按钮参数（50 × 50 px，固定位置百分比）
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
    // 初始化一次小按钮
    if (!document.getElementById('azalea-head-btn')) {
      setupAzaleaTouchZones();
    }
  }
};
