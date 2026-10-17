'use strict';

const steps = [
  { kicker: '从核心问题开始', title: '我们到底想改变什么？', description: '先找到目标，再拆出不同的办法。做游戏时，我从“让玩家觉得爽”开始推演玩法。', symbol: '?' },
  { kicker: '把想法变成可以体验的东西', title: '先试一个，答案会更具体。', description: '用 AI 加快资料整理和原型制作。遇到阻力，就查论文、换路径，让想法接受实际检验。', symbol: '↗' },
  { kicker: '让结果回到最初的目标', title: '做出来了，然后呢？', description: '检查依据和体验，衡量当下的收益与限制。保留什么、改掉什么，下一步由我来判断。', symbol: '✓' }
];

document.querySelectorAll('.step-controls button').forEach(button => {
  button.addEventListener('click', () => {
    const index = Number(button.dataset.step);
    const step = steps[index];
    document.querySelectorAll('.step-controls button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelector('.thinking-art').dataset.step = String(index);
    document.querySelector('.diagram-question').textContent = step.symbol;
    document.getElementById('step-number').textContent = `0${index + 1} / 03`;
    document.getElementById('step-kicker').textContent = step.kicker;
    document.getElementById('step-title').textContent = step.title;
    document.getElementById('step-description').textContent = step.description;
  });
});

const projects = {
  arena: {
    title: 'AI Portfolio Arena', role: '实验设计 · AI 工作流 · 过程复核',
    description: '让两支 AI 团队使用同一份冻结证据、独立做出决策，再记录每轮依据与结果，让选择能够被复盘。',
    visualLabel: 'SHARED INPUT. INDEPENDENT MINDS.', number: 'EXP. 01', caption: '实验结构示意 / PAPER 模拟环境',
    decisionTitle: '先控制输入，再比较输出。', decisionBody: '如果两支 AI 团队拿到的行情和新闻不同，就很难判断差异来自哪里。所以我把共同证据和引擎隔离设为实验前提。',
    href: '../ai-portfolio-arena/'
  },
  radar: {
    title: 'AI News Radar', role: '产品探索 · 信息整理 · 研究流程',
    description: '从市场研究的需要出发，把公开信息整理成可以追溯的研究线索，让 AI 帮忙梳理信息，再由人核查和判断。',
    visualLabel: 'LESS NOISE. BETTER QUESTIONS.', number: 'EXP. 02', caption: '研究流程示意 / 非实时新闻',
    decisionTitle: '保留来源，才能继续追问。', decisionBody: '信息整理只是研究的起点。我把来源和线索放在一起，让人能回到原始材料核查，再判断哪些信息值得深入。',
    href: '../ai-news-radar/'
  },
  game: {
    title: 'DebtRunner', role: '项目负责人 · 玩法工程 · 团队协作',
    description: '从“让玩家感到爽”出发，探索 roguelite 玩法。我担任项目负责人并参与玩法工程，与四人团队在四周内完成原型。',
    visualLabel: 'A LITTLE CHAOS. A LOT OF PLAY.', number: 'EXP. 03', caption: '体验设计示意 / 非游戏截图',
    decisionTitle: '让体验目标带着玩法走。', decisionBody: '我先把“爽”设为体验目标，再沿着玩法、主题和内容展开思考。第一次带团队，也意味着要组织分工，在队员遇到阻力时一起解决。',
    href: '../debt-runner/'
  }
};

const stage = document.querySelector('.project-stage');
const fields = { 'project-title': 'title', 'project-role': 'role', 'project-description': 'description', 'visual-label': 'visualLabel', 'visual-number': 'number', 'visual-caption': 'caption', 'decision-title': 'decisionTitle', 'decision-body': 'decisionBody' };
document.querySelectorAll('.project-choice').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.project;
    const project = projects[key];
    document.querySelectorAll('.project-choice').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    stage.dataset.project = key;
    document.querySelectorAll('[data-art]').forEach(art => { art.hidden = art.dataset.art !== key; });
    for (const [id, property] of Object.entries(fields)) document.getElementById(id).textContent = project[property];
    document.getElementById('project-link').href = project.href;
    document.querySelector('.decision').open = false;
  });
});
