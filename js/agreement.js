// js/agreement.js

// 创建协议弹窗元素
function createAgreementPopup() {
  const overlay = document.createElement('div');
  overlay.id = 'agreementOverlay';
  overlay.style.cssText = `
    position: fixed;
    top:0; left:0; right:0; bottom:0;
    background: rgba(0,0,0,0.7);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index: 9990;
  `;

  const popup = document.createElement('div');
  popup.id = 'agreementPopup';
  popup.style.cssText = `
    background: linear-gradient(to bottom, #3b1e5e, #5e3a8f);
    color: #f0e6d2;
    border: 2px solid #d4af37;
    border-radius: 16px;
    width: 80%;
    max-width: 600px;
    max-height: 80%;
    overflow-y: auto;
    padding: 24px;
    font-family: 'Georgia', serif;
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.7);
    animation: fadeIn 1s ease forwards;
  `;

  popup.innerHTML = `
    <h2 style="text-align:center; color:#ffd700;">爱丽丝庭院协议 / Alice Courtyard Agreement</h2>
    <section>
      <h3>1. 庭院使用守则 / Courtyard Rules</h3>
      <ul>
        <li>欢迎踏入爱丽丝庭院，每一扇门都通向你的梦境，但请遵守庭院规则，勿扰他人灵魂。</li>
        <li>禁止任何形式的作弊、外挂或破坏庭院体验的行为。</li>
        <li>在庭院中，你的昵称、形象、收藏等内容请保持文明，尊重他人。</li>
        <li>不得传播非法内容或敏感信息，庭院有权限制违规行为。</li>
        <li>任何违反规则的行为可能导致庭院钥匙被收回或账号封禁。</li>
      </ul>
      <ul>
        <li>Welcome to Alice Courtyard; each door leads to your dreams. Please respect the rules and do not disturb the souls of others.</li>
        <li>Cheating, exploits, or disrupting the Courtyard experience is strictly forbidden.</li>
        <li>Keep your nickname, avatar, and collections civilized; respect other visitors.</li>
        <li>Do not share illegal or sensitive content; the Courtyard reserves the right to restrict violations.</li>
        <li>Violations may result in the revocation of your Courtyard Key or account suspension.</li>
      </ul>
    </section>

    <section>
      <h3>2. 游戏总告 / Game Notices</h3>
      <ul>
        <li>爱丽丝庭院为虚拟幻想空间，体验内容仅供娱乐。</li>
        <li>部分剧情含有黑暗、悔恨、幻想元素，可能引发情绪波动，请谨慎游玩。</li>
        <li>系统可能记录你的收藏、行为与游戏进度，以便提供完整体验。</li>
        <li>对游戏数据、存档等丢失不承担责任，请自行备份重要信息。</li>
      </ul>
      <ul>
        <li>Alice Courtyard is a virtual fantasy space; content is for entertainment purposes only.</li>
        <li>Some stories contain dark, remorseful, or fantastical elements that may affect emotions; play responsibly.</li>
        <li>The system may record your collections, behaviors, and progress to provide a full experience.</li>
        <li>We are not responsible for loss of game data or save files; please back up important information.</li>
      </ul>
    </section>

    <section>
      <h3>3. 青少年保护声明 / Minor Protection Statement</h3>
      <ul>
        <li>本庭院仅向年满18岁的成年人开放。未成年人请勿尝试注册或进入。</li>
        <li>若您已年满18岁，请确保在游戏中保持理智，遵守庭院规则。</li>
        <li>庭院鼓励健康游戏与适度休息，避免沉迷影响现实生活。</li>
      </ul>
      <ul>
        <li>This Courtyard is open only to adults aged 18 and above. Minors must not attempt to register or enter.</li>
        <li>If you are 18 or older, please play responsibly and follow Courtyard rules.</li>
        <li>We encourage healthy gaming and regular breaks to avoid affecting real life.</li>
      </ul>
    </section>

    <section style="margin-top:16px;">
      <input type="checkbox" id="agreementCheck" style="margin-right:8px;">
      我已年满18岁，并同意所有协议 / I am 18+ and agree to all terms
    </section>

    <div style="text-align:center; margin-top:16px;">
      <button id="agreementConfirm" style="
        padding: 10px 24px;
        background: #d4af37;
        border:none;
        border-radius:8px;
        font-size:1rem;
        cursor:pointer;
        color:#3b1e5e;
        font-weight:bold;
      ">确认 / Confirm</button>
      <button id="agreementCancel" style="
        padding: 10px 24px;
        background: #5e3a8f;
        border:none;
        border-radius:8px;
        font-size:1rem;
        cursor:pointer;
        color:#f0e6d2;
        font-weight:bold;
        margin-left:12px;
      ">取消 / Cancel</button>
    </div>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  // 按钮事件
  document.getElementById('agreementConfirm').addEventListener('click', () => {
    const checked = document.getElementById('agreementCheck').checked;
    if (!checked) {
      alert('请先勾选同意协议 / Please check the agreement first.');
      return;
    }
    document.body.removeChild(overlay);
    localStorage.setItem('agreementAccepted', 'true'); // 可记录同意状态
  });

  document.getElementById('agreementCancel').addEventListener('click', () => {
    alert('未同意协议将无法注册 / You cannot register without agreeing.');
  });
}

// 如果用户未同意协议，则弹窗显示
window.addEventListener('DOMContentLoaded', () => {
  const accepted = localStorage.getItem('agreementAccepted');
  if (!accepted) {
    createAgreementPopup();
  }
});
