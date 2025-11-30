// 游戏存档对象模板
const GameSave = {
  nickname: "",
  title: "",
  beforeOwnCardList: [], // 用户当前拥有的卡牌
  language: "zh",        // 默认语言
  currentCardNo: 0,      // 当前卡牌序号
  currentCardQuestionId: 0, // 当前问题ID
  QAHistory: [],         // 回答历史 [{no:1, question:"A?", answer:"B"}]

  // 保存到 localStorage
  save() {
    localStorage.setItem("gameSave", JSON.stringify(this));
  },

  // 从 localStorage 读取，如果没有则初始化默认值
  load() {
    const saved = localStorage.getItem("gameSave");
    if(saved) {
      const data = JSON.parse(saved);
      Object.assign(this, data);
    }
  },

  // 清空存档
  reset() {
    this.nickname = "";
    this.title = "";
    this.beforeOwnCardList = [];
    this.language = "zh";
    this.currentCardNo = 0;
    this.currentCardQuestionId = 0;
    this.QAHistory = [];
    this.save();
  },

  // 添加答题记录
  addQA(cardNo, questionId, answer) {
    this.QAHistory.push({cardNo, questionId, answer});
    this.save();
  },

  // 更新当前卡牌序号
  setCurrentCard(cardNo, questionId) {
    this.currentCardNo = cardNo;
    this.currentCardQuestionId = questionId;
    this.save();
  }
};

// 页面加载时自动读取存档
GameSave.load();
