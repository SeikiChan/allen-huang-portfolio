import type { T } from '../i18n';

/** Figures are rendered by components/Figure.astro; each id maps to one component. */
export type FigureId =
  | 'eval-tally'
  | 'eval-box'
  | 'eval-case'
  | 'arena-flow'
  | 'am-formation'
  | 'gate-lock'
  | 'radar-shot'
  | 'radar-tiers'
  | 'debt-gallery'
  | 'debt-loop'
  | 'debt-video';

export interface Rule { title: T; body: T }
export interface LogEntry { date: string; title: T; body?: T; key?: boolean }

/** A match report is a sequence of blocks; each project picks the blocks its story needs. */
export type Block =
  | { kind: 'text'; tag: T; heading: T; body: T[]; figure?: FigureId }
  | { kind: 'rules'; tag: T; heading: T; intro?: T; rules: Rule[] }
  | { kind: 'log'; tag: T; heading: T; intro?: T; entries: LogEntry[] }
  | { kind: 'figure'; tag: T; heading: T; body?: T[]; figure: FigureId };

export type Status = 'live' | 'final' | 'shipped';

export interface Match {
  slug: string;
  track: 'ai' | 'game';
  status: Status;
  statusLabel: T;
  /** Left and right contenders. `zh` true when the Chinese label is Chinese text (styled differently). */
  home: { name: T; note: T; zh?: boolean };
  away: { name: T; note: T; zh?: boolean };
  score: { value: T; label: T };
  title: T;
  line: T;
  dates: T;
  role: T;
  stack: string;
  links: { label: T; url: string }[];
  blocks: Block[];
}

const GH = 'https://github.com/SeikiChan';
const S = (en: string, zh: string): T => ({ en, zh });

export const MATCHES: Match[] = [
  {
    slug: 'ai-portfolio-arena',
    track: 'ai',
    status: 'live',
    statusLabel: S('Live · season 1', '进行中 · 第一季'),
    home: { name: S('Claude', 'Claude'), note: S('Anthropic', 'Anthropic') },
    away: { name: S('GPT', 'GPT'), note: S('OpenAI', 'OpenAI') },
    score: { value: S('LIVE', 'LIVE'), label: S('since Oct 10', '10 月 10 日开赛') },
    title: S('AI Portfolio Arena', 'AI 角斗场'),
    line: S(
      'Claude and GPT each run a stock portfolio and trade every market day. Same data, same rules, separate accounts. Which one is the better trader?',
      'Claude 和 GPT 各管一个股票账户，每个交易日自己做决定、自己下单。数据一样，规则一样，账户分开。看谁更会炒股。',
    ),
    dates: S('Oct 2026 – now', '2026 年 10 月至今'),
    role: S('Designed the match and the rules; built it with Claude Code and Codex', '设计赛制和规则；用 Claude Code 和 Codex 实现'),
    stack: 'Python · Claude Code CLI · Codex CLI · Alpaca',
    links: [
      { label: S('Code', '代码'), url: `${GH}/ai-portfolio-arena` },
      { label: S('Rallies Arena (the inspiration)', 'Rallies Arena（灵感来源）'), url: 'https://rallies.ai/arena' },
    ],
    blocks: [
      {
        kind: 'text',
        tag: S('The idea', '起因'),
        heading: S('Let the models trade, then keep score', '让模型自己去交易，然后记比分'),
        body: [
          S(
            'Rallies Arena runs five AI models on public stock portfolios. I wanted my own version: a straight fight between Claude and GPT, where I control the rules and can read every decision afterwards.',
            'Rallies Arena 让五个 AI 模型公开管理股票组合。我想做一个自己的版本：只比 Claude 和 GPT 两个，规则由我定，每个决定事后都能翻出来看。',
          ),
          S(
            'Before writing code I read the decision feeds Rallies publishes and compared all five models. Patterns that every model family shared had to come from their prompt; patterns unique to one model were that model’s own style. That told me what a fair setup needs.',
            '动手之前，我先把 Rallies 公开的五个模型的决策记录拉下来做统计。五个模型都有的结构，一定来自他们的提示词；只有一个模型有的，是那个模型自己的风格。这样就知道一场公平的比赛需要哪些条件。',
          ),
        ],
      },
      {
        kind: 'rules',
        tag: S('Rulebook', '比赛规则'),
        heading: S('Six rules that make it a fair fight', '六条规则，保证比得公平'),
        rules: [
          { title: S('Same exam paper', '同一张考卷'), body: S('At 10:00 ET every market day, one data packet is frozen: prices, quotes, news, financials. Both models get the same bytes, checked by SHA-256.', '每个交易日美东 10:00 冻结一份数据包：价格、报价、新闻、财报。两边拿到的字节完全一样，用 SHA-256 核对。') },
          { title: S('Same field', '同一块场地'), body: S('20 large US stocks. Long only, at most 10 positions, no more than 20% in one name, 50–95% invested.', '20 只美国大盘股。只做多，最多持有 10 只，单只不超过 20%，总仓位 50%–95%。') },
          { title: S('Separate locker rooms', '各回各的更衣室'), body: S('Each model has its own instructions, memory and account. Neither can see the other’s state.', '两个模型各有自己的指令、记忆和账户，看不到对方的状态。') },
          { title: S('Code is the referee', '代码当裁判'), body: S('Every decision passes <code>validate()</code>: numbers must point to a field in the packet, quotes must exist word for word, macro claims must cite a news item. Fail one check and the whole round is void.', '每份决定都要过 <code>validate()</code>：引用的数字必须指向数据包里的字段，引文必须能在原文里逐字找到，宏观判断必须挂一条新闻。一条不过，整轮作废。') },
          { title: S('Post-match comments', '赛后互评'), body: S('After both have traded, each model writes one comment on the other’s published decision. Comments never feed into the next round.', '两边都下完单后，各给对方公开的决策写一条评论。评论不会进入下一轮的输入。') },
          { title: S('Paper money', '模拟盘'), body: S('Orders go to Alpaca paper accounts as day limit orders. The contest is judgment, not real cash.', '订单以当日限价单的形式发到 Alpaca 模拟账户。比的是判断，不是真钱。') },
        ],
      },
      {
        kind: 'figure',
        tag: S('Matchday', '比赛日流程'),
        heading: S('One trading day, start to finish', '一个交易日，从头到尾'),
        figure: 'arena-flow',
      },
      {
        kind: 'log',
        tag: S('Play-by-play', '比赛记录'),
        heading: S('Season one so far', '第一季到目前为止'),
        entries: [
          { date: '2026-10-09', title: S('Split out as its own project', '独立成项目'), body: S('It started inside my quant repo. I moved it out so the experiment rules could not leak into live trading code.', '最早放在量化仓库里。我把它拆出来，免得实验规则和实盘代码互相影响。') },
          { date: '2026-10-10', title: S('Reverse-read the Rallies setup', '反推 Rallies 的赛制'), body: S('Statistics over five models’ public decision feeds: holding periods, position sizes, how often each model trades.', '对五个模型的公开决策做统计：持有期、仓位大小、交易频率。') },
          { date: '2026-10-10', key: true, title: S('Round one: Claude disqualified', '第一轮：Claude 被判无效'), body: S('Claude wrote “hold for 0 days” for two stocks it was only watching, and the round failed validation. The instruction already said “never 0”, and the next round with the same instruction passed. Repeating the rule louder would not fix that. The field itself was ambiguous: for a stock you do not hold, 0 days is an honest answer. I renamed it to <code>horizon_days</code> (1–365, “when will you look at this again”), and the error can no longer happen.', 'Claude 给两只只是观察、并没有持有的股票写了“持有 0 天”，整轮没通过校验。指令里其实写了“不得为 0”，同一份指令下一轮又通过了。再强调一遍解决不了问题，问题出在字段本身有歧义：对一只不持有的股票，“0 天”是如实的回答。我把字段改成 <code>horizon_days</code>（1–365，意思是“多久之后再看它”），这个错误就不可能再发生。') },
          { date: '2026-10-11', title: S('GPT gets a research desk', 'GPT 一侧加研究台'), body: S('Controlled search over public web pages, news and papers. Research finishes first; the decision still uses the frozen packet.', '可控的公开资料检索：网页、新闻、论文。先研究，再用冻结的数据包做决定。') },
          { date: '2026-10-14', title: S('Execution follows the broker clock', '执行时间对齐券商时钟'), body: S('Stale quotes, a closed market or an unfilled order now block a new order for that account.', '报价过期、市场关闭或还有未成交订单时，该账户不会发新单。') },
          { date: '2026-10-15', title: S('Post-match comments go live', '赛后互评上线') },
          { date: 'Now', title: S('Season in progress', '赛季进行中'), body: S('Account results stay private while the season runs.', '赛季期间不公开账户数据。') },
        ],
      },
      {
        kind: 'text',
        tag: S('Coaching rule', '教练守则'),
        heading: S('Never tune a prompt on profit', '不拿盈亏调提示词'),
        body: [
          S(
            'Changing a prompt, watching a week of P&L and changing it again is fitting noise on one path. Instead, <code>prompt_bench</code> replays a saved packet ten times and scores what can be checked: does the output pass the schema, are the quotes real, are there unsourced macro claims, how stable are the picks between runs. A hidden “ignore the rules” line inside the news tests that injected text stays data.',
            '改提示词、看一周盈亏、再改，等于在一条路径上拟合噪声。我的做法是用 <code>prompt_bench</code> 在保存好的数据包上重复跑十次，只看能检查的指标：输出结构对不对、引文是不是真的、有没有无来源的宏观判断、几次之间选股稳不稳定。新闻里还会藏一句“忽略以上规则”，测试注入的文字是否始终被当作数据。',
          ),
        ],
      },
    ],
  },
  {
    slug: 'ai-evaluation',
    track: 'ai',
    status: 'final',
    statusLabel: S('Full time', '已完赛'),
    home: { name: S('GPT', 'GPT'), note: S('GPT 5.6 ins', 'GPT 5.6 ins') },
    away: { name: S('Claude', 'Claude'), note: S('Sonnet 5.5 low', 'Sonnet 5.5 low') },
    score: { value: S('13 : 4', '13 : 4'), label: S('8 draws · 25 cases', '8 平 · 25 题') },
    title: S('GPT vs Claude, 25 cases', 'GPT 对 Claude：25 道题'),
    line: S(
      'The same 25 questions for both models, with me as referee. Every case is scored on five dimensions before a winner is called.',
      '同样 25 道题发给两个模型，我当裁判。每道题先按五个维度打分，再判胜负。',
    ),
    dates: S('Sep – Oct 2026', '2026 年 9 月至 10 月'),
    role: S('Wrote the cases and the rubric; sole referee', '出题、定评分标准；唯一裁判'),
    stack: 'Rubric · pairwise judgment · EN / 简 / 繁 / 粤',
    links: [
      { label: S('Full 25-case report', '完整 25 题报告'), url: `${GH}/ai-evaluation-case-study/blob/main/docs/portfolio_case_study_25_cases.md` },
      { label: S('Repository', '代码仓库'), url: `${GH}/ai-evaluation-case-study` },
    ],
    blocks: [
      {
        kind: 'rules',
        tag: S('Rulebook', '比赛规则'),
        heading: S('How a case is judged', '一道题怎么判'),
        rules: [
          { title: S('Answer key first', '先写标准答案'), body: S('Each case states the expected behavior before either model sees the prompt, so the bar cannot move after reading the answers.', '每道题在模型看到题目之前就写好预期表现。读完答案之后，标准不能再改。') },
          { title: S('Five scores, 1 to 5', '五项打分，每项 1–5'), body: S('Instruction following, factuality, grounding, relevance, Chinese naturalness. A dimension the case does not test is N/A.', '指令遵循、事实准确、依据约束、相关性、中文自然度。题目没考到的维度记 N/A。') },
          { title: S('Score first, then call it', '先打分，再判胜负'), body: S('A win needs a concrete difference written down. No real difference means a draw.', '判胜必须写出具体差别。没有实质差别就是平局。') },
          { title: S('Five kinds of question', '五类题'), body: S('Strict formats, multilingual work (including Cantonese and Taiwan localization), answering only from given facts, context and ambiguity, safety boundaries.', '严格格式、多语言（包括粤语和台湾地区本地化）、只根据给定事实作答、上下文与歧义、安全边界。') },
        ],
      },
      {
        kind: 'figure',
        tag: S('Box score', '技术统计'),
        heading: S('Result by category', '分类比分'),
        body: [S('GPT was steadier on strict formats: every field present, exact headers. Claude won where restraint mattered: not going past the evidence, rewriting Cantonese without adding meaning, and working out what an ambiguous “this” referred to.', 'GPT 在严格格式上更稳：字段齐全、表头精确。Claude 赢在需要克制的地方：不越出证据作答、改写粤语不添意思、判断含糊的“这个”指的是什么。')],
        figure: 'eval-box',
      },
      {
        kind: 'figure',
        tag: S('Every case', '逐题结果'),
        heading: S('All 25, one cell each', '25 道题，一格一道'),
        figure: 'eval-tally',
      },
      {
        kind: 'figure',
        tag: S('Key play', '关键回合'),
        heading: S('Case IF-04: the missing field', 'IF-04：少了一个字段'),
        body: [S('Rewrite a one-line complaint as a bug report with four required fields, without inventing a device or version. One answer dropped the “Actual” field and the refresh step. That is where the points went.', '把一句抱怨改写成缺陷报告，必须有四个字段，而且不能编造设备或版本。其中一份答案漏了“Actual”字段和“刷新”这一步，分差就出在这里。')],
        figure: 'eval-case',
      },
    ],
  },
  {
    slug: 'am-7030',
    track: 'ai',
    status: 'live',
    statusLabel: S('Live · weekly', '实盘 · 每周调仓'),
    home: { name: S('AM 70/30', 'AM 70/30'), note: S('my stock model', '我的选股模型') },
    away: { name: S('SPY', 'SPY'), note: S('the market', '大盘') },
    score: { value: S('LIVE', 'LIVE'), label: S('since Jun 2026', '2026 年 6 月起') },
    title: S('AM 70/30', 'AM 70/30'),
    line: S(
      'My own weekly US stock model, running live against the market. Most of the work went into finding out which of its rules actually earn their place.',
      '我自己写的美股周度选股模型，实盘对标大盘。大部分功夫花在弄清楚：它的每条规则，到底哪条真的有用。',
    ),
    dates: S('Dec 2025 – now', '2025 年 12 月至今'),
    role: S('Designed the model and the research process; operate it; Claude Code and Codex wrote most of the code', '设计模型和研究流程，负责运行；大部分代码由 Claude Code 和 Codex 编写'),
    stack: 'Python · pandas · Alpaca API · 131 test files',
    links: [],
    blocks: [
      {
        kind: 'figure',
        tag: S('Formation', '阵型'),
        heading: S('How AM 70/30 picks stocks', 'AM 70/30 怎么选股'),
        body: [
          S('Momentum is the core idea: stocks that rose over the last year tend to keep rising for a while. The model splits the money 70/30 between two sleeves that read momentum in slightly different ways, rebalances once a week, and puts two gates on top.', '核心思路是动量：过去一年涨得好的股票，接下来一段时间往往还会涨。模型把资金按 70/30 分成两组，两组用稍有不同的方式读动量，每周调仓一次，最上面再加两道闸。'),
        ],
        figure: 'am-formation',
      },
      {
        kind: 'log',
        tag: S('Play-by-play', '比赛记录'),
        heading: S('From first paper trade to the current version', '从第一笔模拟交易到现在'),
        entries: [
          { date: '2025-12', title: S('Paper trading starts', '模拟盘开跑'), body: S('Runs every weekday on a schedule; a dashboard shows targets, gates and fills.', '每个交易日定时运行；看板显示目标仓位、闸门状态和成交。') },
          { date: '2026-06', title: S('Goes live', '上实盘'), body: S('Runs at 06:35 PT. Rebalance day: full weekly rebalance. Other days: risk check only, sells allowed, no buys.', '每天太平洋时间 06:35 运行。调仓日完整调仓；其他日子只做风险检查，只许卖不许买。') },
          { date: '2026-07', title: S('The account gate turns red', '账户闸门变红'), body: S('Exposure drops to 25%. Then it stays there for weeks.', '仓位降到 25%，然后几周都没恢复。') },
          { date: '2026-09-13', title: S('A fact ledger for every number', '给每个数字建“事实账本”'), body: S('Each figure is tagged observed, derived, assumption or unknown. Raw API responses are kept with SHA-256 hashes. Missing data stays missing and is never filled with a guess.', '每个数字都标上 observed（观测）、derived（推导）、assumption（假设）或 unknown（未知）。原始 API 响应连同 SHA-256 哈希一起存档。缺的数据就记为缺失，绝不用猜测补上。') },
          { date: '2026-09-27', key: true, title: S('Review finds three measurement bugs', '复查找到三个口径错误'), body: S('1) The gate measured drawdown on the curve it had already cut, so it could barely recover (see the chart below). 2) A liquidity filter was calibrated on full-market volume but fed IEX-only volume, about 2% of it, and quietly shrank the stock pool from ~513 names to ~131. 3) Statistics included a warm-up year when the model was mostly in cash. All three moved into one versioned module, guarded by 39 tests.', '一、闸门量回撤用的是已经被它降过仓的曲线，所以几乎恢复不了（见下图）。二、流动性门槛按全市场成交量校准，实盘喂的却是 IEX 单一场所的成交量，只有约 2%，股票池从约 513 只悄悄缩到约 131 只。三、统计区间混进了模型基本空仓的预热年。三个问题统一收进一个带版本号的口径模块，用 39 个测试守住。') },
          { date: '2026-09-29', key: true, title: S('Strip it down, rule by rule', '一条一条拆规则'), body: S('AM 70/30 had ten hand-picked parameters that had never been tested on their own. I wrote four pass criteria before running anything, then removed one layer at a time on ten years of point-in-time data. Pure momentum, top 20 (PM20), passed all four. Removing only the pullback leg failed: two rules had been hiding each other’s damage. The reason: momentum gains come from a few big winners, and stops and forced holding periods cut exactly those. Live switched to PM20.', 'AM 70/30 有十个手选参数，从来没被单独检验过。我先写好四条通过标准，再用十年的点时数据一层一层拆。纯动量前 20（PM20）四条全过。只拆掉回调这一条反而不行：两条规则一直在互相掩盖对方的伤害。原因是动量收益集中在少数大赢家上，止损和强制持有期砍掉的正是它们。实盘切换到 PM20。') },
          { date: '2026-10-04', title: S('22 add-ons tested, 0 shipped', '测了 22 个增强项，0 个上线'), body: S('Extra factors, stops, hedges, overlays. The bar was set before the search, so nothing that missed it went live.', '新因子、止损、对冲、叠加策略。通过门槛在测试之前就定好了，没达标的一个都不上线。') },
          { date: '2026-10-07', title: S('Version frozen', '版本冻结'), body: S('Research paused at this version. The open question is the real bid–ask cost of each fill, which the current logs cannot measure yet.', '研究暂停在这个版本。还没解决的问题是每笔成交的真实买卖价差，现有日志还量不出来。') },
        ],
      },
      {
        kind: 'figure',
        tag: S('Replay', '回放'),
        heading: S('Why the gate got stuck', '闸门为什么卡住了'),
        body: [
          S('Red at −18% drawdown cut exposure to 25%; it released only above −8%. But the gate read the account curve after the cut, which moves at a quarter speed. Climbing from −18% to −8% on that curve needs the strategy itself to gain about 49%. The protection was blocking its own recovery. The fix: read the strategy’s own curve, apply exposure to the returns actually earned.', '回撤到 −18% 时闸门变红，仓位降到 25%；回到 −8% 以内才解除。但闸门读的是降仓后的账户曲线，这条曲线只以四分之一的速度移动。要在这条曲线上从 −18% 爬回 −8%，策略本身得涨约 49%。保护机制挡住了自己的恢复。修法：闸门改读策略自己的曲线，仓位比例仍然作用在实际获得的收益上。'),
        ],
        figure: 'gate-lock',
      },
    ],
  },
  {
    slug: 'ai-news-radar',
    track: 'ai',
    status: 'shipped',
    statusLabel: S('Released v1.0', '已发布 v1.0'),
    home: { name: S('Story', '故事'), note: S('what headlines say', '新闻怎么说'), zh: true },
    away: { name: S('Evidence', '证据'), note: S('what companies commit to', '公司真的拿出了什么'), zh: true },
    score: { value: S('v1.0', 'v1.0'), label: S('218 tests · CI', '218 个测试 · CI') },
    title: S('AI News Radar', 'AI News Radar'),
    line: S(
      'A research terminal that sorts market news by how much evidence it carries: a customer prepayment beats a press release that just says “AI”.',
      '一个研究终端，按“证据含量”给市场新闻排序：客户预付款排在只提了一句 AI 的新闻稿前面。',
    ),
    dates: S('May – Oct 2026', '2026 年 5 月至 10 月'),
    role: S('Product owner and developer, built with AI coding agents', '产品负责人兼开发者，用 AI 编程代理实现'),
    stack: 'Python · vanilla JS · SEC EDGAR · RSS · GitHub Actions',
    links: [
      { label: S('Code', '代码'), url: `${GH}/ai-news-radar` },
      { label: S('Release v1.0', 'v1.0 发布页'), url: `${GH}/ai-news-radar/releases/latest` },
      { label: S('Scoring rules', '评分规则'), url: `${GH}/ai-news-radar/blob/master/docs/signal_model.md` },
    ],
    blocks: [
      {
        kind: 'figure',
        tag: S('On screen', '实机画面'),
        heading: S('The morning brief', '每天早上的简报'),
        body: [S('Top call, ranked opportunities, and for each one: market reaction, filings, options, expectations, and the link to the original source. Gray means no data, and the screen says so.', '今日头号线索、按优先级排好的机会列表，每一条都列出市场反应、监管文件、期权、预期，以及原始来源链接。灰色表示没有数据，界面上直接标出来。')],
        figure: 'radar-shot',
      },
      {
        kind: 'figure',
        tag: S('Scoring', '计分方式'),
        heading: S('Money committed beats words', '掏钱的比说话的分高'),
        body: [S('Scores come from written rules with penalties and false-positive checks, so you can always see why something ranked high.', '分数来自成文规则，有扣分项和误报检查。一条线索为什么排得高，随时能看明白。')],
        figure: 'radar-tiers',
      },
      {
        kind: 'rules',
        tag: S('Design rules', '设计规则'),
        heading: S('What it refuses to do', '它不做什么'),
        rules: [
          { title: S('No buy or sell calls', '不给买卖建议'), body: S('It ranks leads for a person to check. It never generates orders.', '只给线索排序，交给人去核实。从不生成交易指令。') },
          { title: S('No alert spam', '不刷提醒'), body: S('Fewer, better-supported alerts. Alert count is not a goal.', '提醒少而准。提醒数量不是目标。') },
          { title: S('No fake numbers', '不编数字'), body: S('A missing value is shown as missing, never estimated.', '缺的数据就显示为缺失，不做估算。') },
          { title: S('Runs on your machine', '跑在你自己的电脑上'), body: S('Free public sources only. Listens on localhost; any other address needs a password.', '只用免费公开数据。默认只监听本机，开放给其他地址必须设密码。') },
        ],
      },
      {
        kind: 'log',
        tag: S('Build log', '开发记录'),
        heading: S('Prototype to release', '从原型到发布'),
        entries: [
          { date: '2026-05-30', title: S('First version', '第一版'), body: S('Feeds, rule-based scoring, a local web view.', '新闻源采集、规则评分、本地网页界面。') },
          { date: '2026-05-31 → 06-10', title: S('Due diligence panels', '加上尽调面板'), body: S('Price and volume confirmation, SEC financials, short interest, 13F flows, earnings-call breakdowns.', '量价确认、SEC 财务数据、空头数据、13F 机构动向、财报电话会拆解。') },
          { date: '2026-10-15', key: true, title: S('v1.0 released', '发布 v1.0'), body: S('218 tests, lint, CI on Windows and Ubuntu with Python 3.10 and 3.12, bilingual interface, MIT licence.', '218 个测试、代码规范检查、Windows 和 Ubuntu 上 Python 3.10 / 3.12 的 CI、中英双语界面、MIT 许可证。') },
        ],
      },
    ],
  },
  {
    slug: 'debt-runner',
    track: 'game',
    status: 'shipped',
    statusLabel: S('Spring Show 2026', '2026 春季作品展'),
    home: { name: S('Player', '玩家'), note: S('one runner, a deck of cards', '一个人，一副牌'), zh: true },
    away: { name: S('Debt', '债务'), note: S('ten rounds, rising every round', '十个回合，越滚越大'), zh: true },
    score: { value: S('4 × 4', '4 × 4'), label: S('people × weeks', '人 × 周') },
    title: S('DebtRunner', 'DebtRunner'),
    line: S(
      'A top-down roguelite: collect each round’s debt before the clock runs out. Four people, four weeks, selected for the Academy of Art University Spring Show. I led the team and built the gameplay systems.',
      '俯视角 roguelite：每个回合在倒计时结束前把债凑齐。四个人，四周做完，入选 Academy of Art University 春季作品展。我带团队，并负责玩法系统。',
    ),
    dates: S('Feb – Apr 2026', '2026 年 2 月至 4 月'),
    role: S('Project lead / producer + gameplay engineer', '项目负责人 / 制作人 + 玩法程序'),
    stack: 'Unity 6 · URP · C#',
    links: [
      { label: S('Code', '代码'), url: `${GH}/DebtRunner` },
      { label: S('Game QA & Chinese LQA sample', '游戏 QA 与中文 LQA 样例'), url: `${GH}/DebtRunner/blob/main/docs/game-qa-lqa-portfolio-sample.md` },
    ],
    blocks: [
      {
        kind: 'figure',
        tag: S('The game', '游戏'),
        heading: S('Ten rounds, one debt collector', '十个回合，一个催债人'),
        body: [S('Every round sets a debt and a timer. You throw cards automatically at coin monsters, pick one of three upgrade cards when you level up, and spend cash in the shop between rounds. The shop has a wheel: it can pay out, or make the next debt bigger.', '每个回合都有一笔债和一个倒计时。角色自动向金币怪物甩扑克牌，升级时三张强化卡选一张，回合之间在商店花钱。商店里有个转盘：可能给你钱，也可能让下一笔债更大。')],
        figure: 'debt-gallery',
      },
      {
        kind: 'log',
        tag: S('Production log', '制作记录'),
        heading: S('33 commits from kick-off to show build', '从开工到展出版本，33 次提交'),
        entries: [
          { date: '2026-02-10', title: S('Kick-off', '开工'), body: S('Scope, milestones and owners set; I wrote the design document and kept it current.', '定范围、里程碑和分工；设计文档由我编写并持续更新。') },
          { date: '2026-02-12 → 03-03', title: S('13 builds in three weeks', '三周 13 个版本'), body: S('Each week ended with something playable. Systems went in one at a time: game state, movement, auto-target combat, enemy spawning, projectiles, XP and level-up, settlement, shop, game over.', '每周结束都有能玩的版本。系统一个一个接进来：游戏状态、移动、自动瞄准战斗、敌人生成、投射物、经验与升级、结算、商店、游戏结束。') },
          { date: '2026-03-05', key: true, title: S('v1.0: playable in four weeks', 'v1.0：四周做出可玩版本'), body: S('All seven core systems I own are connected into one loop.', '我负责的七个核心系统全部接入同一个循环。') },
          { date: '2026-03-09 → 04-11', title: S('Polish for the show', '为展出打磨'), body: S('QA passes on tutorial flow, combat readability, UI, round pacing and reward feedback. Playtest and instructor feedback set the fix order. v1.1 to v3.6.', '对教学流程、战斗可读性、UI、回合节奏和奖励反馈做多轮 QA。修什么、先修什么，按试玩反馈和导师意见排序。从 v1.1 做到 v3.6。') },
          { date: '2026 spring', title: S('Selected for the AAU Spring Show', '入选 AAU 春季作品展') },
        ],
      },
      {
        kind: 'figure',
        tag: S('Systems', '系统'),
        heading: S('The loop I built', '我搭的这个循环'),
        body: [S('The <a href="https://github.com/SeikiChan/DebtRunner/blob/main/docs/game-qa-lqa-portfolio-sample.md">QA &amp; Chinese LQA sample</a> shows how I test these systems: state transitions, projectile cleanup, level-up flow, the shop loop.', '<a href="https://github.com/SeikiChan/DebtRunner/blob/main/docs/game-qa-lqa-portfolio-sample.md">QA 与中文 LQA 样例</a>展示了我怎么测这些系统：状态切换、投射物清理、升级流程、商店循环。')],
        figure: 'debt-loop',
      },
      {
        kind: 'figure',
        tag: S('Footage', '实机视频'),
        heading: S('Watch a round', '看一个回合'),
        figure: 'debt-video',
      },
    ],
  },
];

export const getMatch = (slug: string) => MATCHES.find((m) => m.slug === slug);
