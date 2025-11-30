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
    // 开放时间：每天 12:00（中午） ~ 次日 06:00
    return h >= 12 || h < 6;
  }

  function updateAzaleaBlock() {
    const open = isCourtyardOpen();
    const h = new Date().getHours();

    if (open) {
      // 开放中 → 隐藏 Azalea
      azaleaBlock.style.display = 'none';
    } else {
      // 关闭中 → 显示 Azalea
      azaleaBlock.style.display = 'block';
      azaleaBlock.style.animation = 'azaleaFadeIn 2s ease-out forwards';

      // 根据当前时间段显示不同的提示文字
      if (h >= 6 && h < 12) {
        azaleaMsg.textContent = '庭院 12:00 PM 开放 / Courtyard opens at 12:00 PM';
      } else {
        azaleaMsg.textContent = '庭院已关闭，明日 12:00 PM 再来哦~ / Closed, see you tomorrow ♡';
      }
    }
  }

  // 立即执行一次
  updateAzaleaBlock();

  // 每秒检查一次（与时钟气泡完全同步，不多不少）
  setInterval(updateAzaleaBlock, 1000);

  // 可选：凌晨 6 点或中午 12 点整时加个小彩蛋动画
  // setInterval(() => {
  //   const h = new Date().getHours();
  //   const m = new Date().getMinutes();
  //   if ((h === 12 || h === 6) && m === 0) {
  //     azaleaBlock.style.animation = 'azaleaFadeIn 1s ease 3; // 闪三下
  //   }
  // }, 60000);

})();