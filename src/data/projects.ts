import type { T } from '../i18n';

/** Figures are rendered by components/Figure.astro; each id maps to one component. */
export type FigureId =
  | 'eval-tally'
  | 'eval-case'
  | 'arena-flow'
  | 'arena-rules'
  | 'radar-shot'
  | 'radar-tiers'
  | 'gate-lock'
  | 'basis-errors'
  | 'debt-title'
  | 'debt-gallery'
  | 'debt-loop'
  | 'debt-video';

export interface Section {
  kicker: T;
  heading: T;
  /** Paragraphs. Trusted inline HTML (<code>, <strong>, <a>) is allowed. */
  body: T[];
  bullets?: T[];
  figure?: FigureId;
}

export interface Project {
  slug: string;
  track: 'ai' | 'game';
  name: T;
  kicker: T;
  /** The question a card leads with. */
  question: T;
  summary: T;
  lede: T;
  role: T;
  when: T;
  stack: string[];
  stats: { value: string; label: T }[];
  links: { label: T; url: string }[];
  /** Optional large figure under the stats; omit when a section already carries the key figure. */
  hero?: FigureId;
  card: FigureId;
  sections: Section[];
  limits: T;
}

const GH = 'https://github.com/SeikiChan';

export const PROJECTS: Project[] = [
  {
    slug: 'ai-evaluation',
    track: 'ai',
    name: { en: 'GPT vs Claude: a 25-case evaluation', zh: 'GPT 与 Claude：25 个案例的评估试点' },
    kicker: { en: 'AI evaluation · human review', zh: 'AI 评估 · 人工评审' },
    question: {
      en: 'Which model follows instructions better, and how would you show it?',
      zh: '哪个模型更守指令？要怎样拿出证据？',
    },
    summary: {
      en: 'I wrote 25 frozen test cases, scored 50 responses on a five-dimension rubric, and tied every score to quoted evidence.',
      zh: '我设计了 25 个冻结测试案例，按五个维度给 50 条回复打分，每个分数都对应引用的原文证据。',
    },
    lede: {
      en: 'A small, transparent human evaluation. Both models received the same frozen prompt for each case. I scored each response on its own before comparing the two, and wrote down why.',
      zh: '一个小规模、过程公开的人工评估。两个模型在每个案例中收到完全相同的冻结提示词。我先给每条回复单独打分，再做两两比较，并写下理由。',
    },
    role: { en: 'Designer and sole rater', zh: '评估设计与唯一评审' },
    when: { en: '2026', zh: '2026 年' },
    stack: ['Rubric design', 'Pairwise judgment', 'EN · 简体 · 繁體 · 粤语'],
    stats: [
      { value: '25', label: { en: 'frozen test cases', zh: '冻结测试案例' } },
      { value: '50', label: { en: 'responses scored', zh: '条回复逐条评分' } },
      { value: '5', label: { en: 'rubric dimensions', zh: '个评分维度' } },
      { value: '13 · 4 · 8', label: { en: 'GPT wins · Claude wins · ties', zh: 'GPT 胜 · Claude 胜 · 平局' } },
    ],
    links: [
      { label: { en: 'Full 25-case report', zh: '完整 25 案例报告' }, url: `${GH}/ai-evaluation-case-study/blob/main/docs/portfolio_case_study_25_cases.md` },
      { label: { en: 'Repository', zh: '代码仓库' }, url: `${GH}/ai-evaluation-case-study` },
    ],
    hero: 'eval-tally',
    card: 'eval-tally',
    sections: [
      {
        kicker: { en: 'Design', zh: '设计' },
        heading: { en: 'Five kinds of case, expected behavior written first', zh: '五类案例，先写预期行为' },
        body: [
          {
            en: 'The set covers instruction following, multilingual work, grounding in supplied facts, context and ambiguity, and safety boundaries. Multilingual cases include Cantonese-to-Mandarin rewriting and Taiwan localization, where native-speaker judgment matters.',
            zh: '案例覆盖指令遵循、多语言处理、基于给定事实作答、上下文与歧义，以及安全边界。多语言案例包括粤语转书面普通话和台湾地区本地化，这些地方需要母语者的判断。',
          },
          {
            en: 'Each case states its expected behavior before any model sees the prompt. That keeps the bar from moving after I read the answers.',
            zh: '每个案例在模型看到提示词之前就写好预期行为。这样评审标准不会在读完答案之后才随之调整。',
          },
        ],
      },
      {
        kicker: { en: 'Rubric', zh: '评分标准' },
        heading: { en: 'Score first, compare second', zh: '先打分，再比较' },
        body: [
          {
            en: 'Each response gets 1–5 on five dimensions. A dimension the case does not test is marked N/A and left out of that average. Only after scoring do I pick a winner, and I must cite the concrete difference. When the difference is not substantive, the case is a tie.',
            zh: '每条回复在五个维度上各打 1–5 分。案例没有考察的维度记为 N/A，不计入该维度的平均分。打完分后才决定胜负，而且必须写出具体差异。差异不实质时记为平局。',
          },
        ],
        bullets: [
          { en: '<strong>Instruction following</strong> — content, format, order, length and constraints.', zh: '<strong>指令遵循</strong>：内容、格式、顺序、长度和约束是否满足。' },
          { en: '<strong>Factuality</strong> — correct, with no unsupported or over-certain claims.', zh: '<strong>事实准确</strong>：内容正确，没有无依据或过度肯定的说法。' },
          { en: '<strong>Grounding</strong> — stays inside the information given.', zh: '<strong>依据约束</strong>：不超出给定的信息和上下文。' },
          { en: '<strong>Relevance</strong> — answers the actual request, without padding.', zh: '<strong>相关性</strong>：回答真正的问题，不加多余内容。' },
          { en: '<strong>Chinese naturalness</strong> — fluent, context-appropriate, accurate terms.', zh: '<strong>中文自然度</strong>：流畅、得体、术语准确。' },
        ],
      },
      {
        kicker: { en: 'Example', zh: '案例' },
        heading: { en: 'Where the scores split: a QA bug report', zh: '分数拉开的地方：一份 QA 缺陷报告' },
        body: [
          {
            en: 'Case IF-04 asks for a bug report with four required fields and forbids inventing device or version details. One response dropped a required field and a reproduction step. The score difference comes from that, and the evidence line says so.',
            zh: '案例 IF-04 要求写一份包含四个必填字段的缺陷报告，并禁止编造设备或版本信息。其中一条回复漏掉了一个必填字段和一个复现步骤。分差就来自这里，证据栏也写明了这一点。',
          },
        ],
        figure: 'eval-case',
      },
      {
        kicker: { en: 'Result', zh: '结果' },
        heading: { en: 'GPT 13, Claude 4, tie 8 — on this set', zh: 'GPT 13 胜，Claude 4 胜，8 平——仅限本案例集' },
        body: [
          {
            en: 'GPT was more consistent on strict formats: every required field, exact headers, labelled parts. Claude won where restraint mattered — staying inside the evidence when answering from business hours, rewriting Cantonese without adding meaning, and resolving what an ambiguous “this” refers to.',
            zh: 'GPT 在严格格式上更稳定：必填字段齐全、表头精确、各部分有标注。Claude 赢在需要克制的地方：根据营业时间作答时不越出证据，改写粤语时不添加意思，以及判断含糊的“这个”指的是什么。',
          },
        ],
      },
    ],
    limits: {
      en: 'One rater, 25 cases, one run per model. The result describes this case set only; it is not a benchmark or a general ranking. A stronger version needs more cases, a second independent rater, and an agreement statistic.',
      zh: '一位评审、25 个案例、每个模型只跑一次。结果只描述这个案例集，不是基准测试，也不是模型总体排名。更可靠的版本需要更多案例、第二位独立评审，以及评审一致性统计。',
    },
  },
  {
    slug: 'ai-portfolio-arena',
    track: 'ai',
    name: { en: 'AI Portfolio Arena', zh: 'AI Portfolio Arena' },
    kicker: { en: 'AI experiment design · guardrails', zh: 'AI 实验设计 · 约束机制' },
    question: {
      en: 'Give two models the same evidence. Can you trust what they decide?',
      zh: '给两个模型同一份证据，它们的决定可信吗？',
    },
    summary: {
      en: 'Claude and GPT each manage a separate paper portfolio from a byte-identical evidence packet. Code, not the prompt, decides which output is allowed.',
      zh: 'Claude 和 GPT 各自管理一个独立的模拟账户，读取字节完全相同的证据包。允许什么输出，由代码决定，不由提示词决定。',
    },
    lede: {
      en: 'An auditable experiment, not a trading bot. Every AI decision must trace back to the exact evidence it saw. Anything that does not trace back is rejected before it reaches an account.',
      zh: '这是一个可审计的实验，不是交易机器人。每个 AI 决定都必须能追溯到它当时看到的那份证据。追溯不到的输出，在进入账户之前就会被拒绝。',
    },
    role: { en: 'System designer; directed AI coding agents and reviewed their work', zh: '系统设计；指挥 AI 编程代理实现并审查' },
    when: { en: 'Oct 2026', zh: '2026 年 10 月' },
    stack: ['Python', 'Claude Code CLI', 'Codex CLI', 'Alpaca Paper API', 'SHA-256'],
    stats: [
      { value: '2', label: { en: 'isolated decision engines', zh: '个相互隔离的决策引擎' } },
      { value: '1', label: { en: 'frozen evidence packet per round, shared byte for byte', zh: '份冻结证据包，每轮按字节共享' } },
      { value: '0', label: { en: 'tools for the model at decision time', zh: '决策时模型可用的工具数' } },
      { value: '4', label: { en: 'labels on every number: observed · derived · assumption · unknown', zh: '类数据标签：观测 · 推导 · 假设 · 未知' } },
    ],
    links: [
      { label: { en: 'Repository', zh: '代码仓库' }, url: `${GH}/ai-portfolio-arena` },
      { label: { en: 'Prompt design notes (Chinese)', zh: '提示词设计笔记' }, url: `${GH}/ai-portfolio-arena/blob/main/docs/claude_gpt_portfolio_prompt_design_20261009.md` },
    ],
    hero: 'arena-flow',
    card: 'arena-flow',
    sections: [
      {
        kicker: { en: 'Setup', zh: '实验设置' },
        heading: { en: 'Same evidence, separate engines', zh: '证据相同，引擎隔离' },
        body: [
          {
            en: 'If two models read different news, a difference in their decisions says nothing about judgment. So one collector freezes a single market packet each trading day — prices, quotes, news summaries, quarterly financials — and records its ID and SHA-256 hash. Both engines claim the same bytes.',
            zh: '如果两个模型读到的新闻不一样，它们决定上的差异就说明不了判断力。所以每个交易日由一个采集方冻结一份市场证据包（价格、报价、新闻摘要、季度财务数据），并记录它的 ID 和 SHA-256 哈希。两个引擎领取的是同一份字节。',
          },
          {
            en: 'Each engine has its own instructions, state and paper account. They never share account state. Every round stores the packet, the full prompt, the unedited reply, the validation verdict and the source-code hash.',
            zh: '每个引擎有自己的指令、状态和模拟账户，账户状态从不共享。每一轮都保存证据包、完整提示词、未经编辑的模型回复、校验结论和源码哈希。',
          },
        ],
      },
      {
        kicker: { en: 'Guardrails', zh: '约束' },
        heading: { en: 'Prompts ask. Code enforces.', zh: '提示词只是请求，代码才是约束' },
        body: [
          {
            en: 'Anything that must be true lives in <code>validate()</code>, not in the prompt. A model cannot argue its way past a limit by saying “this time is different.”',
            zh: '凡是“必须为真”的东西都写进 <code>validate()</code>，不写在提示词里。模型不能用“这次情况特殊”绕过任何限额。',
          },
        ],
        figure: 'arena-rules',
      },
      {
        kicker: { en: 'Failure analysis', zh: '失败分析' },
        heading: { en: 'Fixing a failure by changing the schema, not the wording', zh: '修失败：改字段，不改措辞' },
        body: [
          {
            en: 'In the first round, Claude’s whole decision was rejected: it gave a holding period of 0 days for two watch-list ideas. The instruction already said “never 0”. With the same instruction, the next round passed.',
            zh: '第一轮里，Claude 的整份决定被拒绝：它给两个观察标的写了 0 天的预计持有期。指令里其实已经写了“不得为 0”。同一份指令，下一轮就通过了。',
          },
          {
            en: 'Repeating the rule louder would only move the failure rate to some smaller, unknown number. The real cause was a conflict in the field itself: for a stock you do not hold, “expected holding days” honestly is 0. The fix was to redefine the field as <code>horizon_days</code> (1–365) — the date you expect to still hold or re-review the idea. That makes the failure impossible instead of less likely.',
            zh: '把规则再强调一遍，只能把失败率挪到某个更小但未知的数值。真正的原因是字段本身有矛盾：对一个不持有的股票，“预计持有天数”如实回答就是 0。修法是把字段改成 <code>horizon_days</code>（1–365），意思是“预计到那天还持有它，或重新复核它”。这样失败不是变少，而是不可能发生。',
          },
        ],
      },
      {
        kicker: { en: 'Evaluation', zh: '评估' },
        heading: { en: 'Judge prompts by process, never by profit', zh: '用过程指标评价提示词，不用收益' },
        body: [
          {
            en: 'Tweaking a prompt, watching the paper P&L, and tweaking again is multiple testing on a single path. Instead, <code>prompt_bench</code> replays a saved packet N times and scores what can be checked: schema pass rate, citation faithfulness, unsourced macro claims, and how stable the holdings are across repeats (Jaccard). An injection-canary mode plants “ignore the rules” text inside the news to confirm it stays data.',
            zh: '改提示词、看模拟盈亏、再改，这是在单一路径上做多重检验。所以 <code>prompt_bench</code> 在已保存的证据包上重复运行 N 次，只打可以检查的分：结构校验通过率、引文忠实率、无来源的宏观说法数量，以及多次运行之间持仓的一致性（Jaccard）。注入金丝雀模式会在新闻里埋入“忽略以上规则”之类的文字，确认它始终只被当作数据。',
          },
        ],
      },
    ],
    limits: {
      en: 'Paper accounts only — no real money. Whether either strategy is profitable is unverified. This page shows no account data, positions or returns, and the live dashboard stays on my machine.',
      zh: '只使用模拟账户，不涉及真实资金。两套策略是否盈利尚未验证。本页不展示任何账户数据、持仓或收益，运行看板只在本机使用。',
    },
  },
  {
    slug: 'ai-news-radar',
    track: 'ai',
    name: { en: 'AI News Radar', zh: 'AI News Radar' },
    kicker: { en: 'Research tool · released v1.0', zh: '研究工具 · 已发布 v1.0' },
    question: {
      en: 'Thousands of headlines a day. Which ones are actual evidence?',
      zh: '每天上千条新闻，哪些才算证据？',
    },
    summary: {
      en: 'A local-first research terminal that ranks public news by business evidence — orders, capacity, qualification — and links every signal back to its source.',
      zh: '一个在本机运行的研究终端，按商业证据（订单、产能、认证）给公开新闻排序，每条信号都链接回原始来源。',
    },
    lede: {
      en: 'AI News Radar helps an analyst move from a broad theme to verifiable evidence. It runs on your own computer, needs no paid data, and treats every alert as a lead to check — never as a conclusion.',
      zh: 'AI News Radar 帮助分析师从一个宽泛的主题走到可以核实的证据。它在你自己的电脑上运行，不需要付费数据，并把每条提醒当作需要核查的线索，而不是结论。',
    },
    role: { en: 'Product owner and developer (AI-assisted)', zh: '产品负责人与开发者（AI 协作开发）' },
    when: { en: 'May – Oct 2026', zh: '2026 年 5 月至 10 月' },
    stack: ['Python 3.10+', 'Vanilla JS', 'SEC EDGAR', 'RSS / Atom', 'GitHub Actions'],
    stats: [
      { value: 'v1.0', label: { en: 'tagged public release', zh: '公开发布版本' } },
      { value: '218', label: { en: 'automated tests', zh: '个自动化测试' } },
      { value: '2 × 2', label: { en: 'CI matrix: Windows / Ubuntu × Python 3.10 / 3.12', zh: 'CI 矩阵：Windows / Ubuntu × Python 3.10 / 3.12' } },
      { value: '2', label: { en: 'interface languages', zh: '种界面语言' } },
    ],
    links: [
      { label: { en: 'Repository', zh: '代码仓库' }, url: `${GH}/ai-news-radar` },
      { label: { en: 'Latest release', zh: '最新版本' }, url: `${GH}/ai-news-radar/releases/latest` },
      { label: { en: 'Signal model', zh: '信号模型说明' }, url: `${GH}/ai-news-radar/blob/master/docs/signal_model.md` },
    ],
    hero: 'radar-shot',
    card: 'radar-shot',
    sections: [
      {
        kicker: { en: 'Problem', zh: '问题' },
        heading: { en: 'Stories are cheap. Evidence is specific.', zh: '故事很便宜，证据很具体' },
        body: [
          {
            en: 'Themes like AI photonics or grid power produce endless articles, and most of them only mention AI. The product brief sets one job: flag the moment a company moves from story to evidence. So the scoring ranks the kind of evidence, not the volume of coverage.',
            zh: 'AI 光通信、电网电力这类主题每天产生大量文章，大多数只是提到了 AI。产品简报只定了一个任务：在一家公司从“故事”变成“证据”的那一刻发出提示。所以评分看的是证据的种类，而不是报道的数量。',
          },
        ],
        figure: 'radar-tiers',
      },
      {
        kicker: { en: 'Workflow', zh: '工作流' },
        heading: { en: 'Five steps, every one visible', zh: '五个步骤，每一步都可见' },
        body: [
          {
            en: 'Scores come from written rules with explicit penalties and false-positive checks, so a reviewer can see why something ranked high.',
            zh: '分数来自成文的规则，有明确的扣分项和误报检查，所以审阅的人能看懂一条信号为什么排得高。',
          },
        ],
        bullets: [
          { en: 'Collect public RSS/Atom feeds and selected investor-relations pages.', zh: '采集公开的 RSS/Atom 源和选定的投资者关系页面。' },
          { en: 'Score business evidence; match companies conservatively, beyond the seed watchlist.', zh: '给商业证据打分；保守地匹配公司，并能发现种子观察名单以外的公司。' },
          { en: 'Add market, filing and earnings context where a free source exists — and show a gap where it does not.', zh: '有免费数据源时补充行情、监管文件和财报背景；没有时如实显示为缺口。' },
          { en: 'A person reviews the original source before drawing any conclusion.', zh: '由人阅读原始来源之后，才得出任何结论。' },
          { en: 'Compare historical scores with later returns to see which rules held up.', zh: '把历史评分和之后的走势做对比，检查哪些规则站得住。' },
        ],
      },
      {
        kicker: { en: 'Product decisions', zh: '产品取舍' },
        heading: { en: 'Written non-goals', zh: '写明“不做什么”' },
        body: [
          {
            en: 'The scope stayed small because the non-goals were written down early: not a Bloomberg clone, no full-article scraping, social posts are never treated as truth, no buy or sell orders, and no optimizing for alert count. The server binds to localhost by default and requires a password before it can listen on any other address.',
            zh: '范围之所以能保持小，是因为一开始就写下了不做什么：不复刻 Bloomberg，不抓取文章全文，不把社交媒体帖子当作事实，不生成买卖指令，也不追求提醒数量。服务默认只监听本机，要监听其他地址必须先设密码。',
          },
        ],
      },
      {
        kicker: { en: 'Quality', zh: '质量' },
        heading: { en: 'Shipped like software', zh: '按软件产品的标准发布' },
        body: [
          {
            en: '218 tests, a lint gate, CI on two operating systems and two Python versions, an MIT licence, a versioned release, and a changelog written as an engineering handoff so the next person — or agent — can pick it up.',
            zh: '218 个测试、代码规范检查、在两个操作系统和两个 Python 版本上运行的 CI、MIT 许可证、带版本号的发布，以及一份按工程交接标准写的变更日志，方便下一个人（或 agent）接手。',
          },
        ],
      },
    ],
    limits: {
      en: 'Research use only, not investment advice. Free public sources can be delayed or wrong. The forward-return report is a diagnostic, not proof that the signals predict prices.',
      zh: '仅供研究使用，不构成投资建议。免费公开数据可能延迟或出错。前瞻收益报告只是诊断工具，不能证明这些信号可以预测价格。',
    },
  },
  {
    slug: 'quant-research',
    track: 'ai',
    name: { en: 'Diagnosing a self-locking risk gate', zh: '诊断一个会自锁的风控闸门' },
    kicker: { en: 'Quant research · measurement discipline', zh: '量化研究 · 口径纪律' },
    question: {
      en: 'What if the safety switch is the part that is broken?',
      zh: '如果出问题的恰恰是安全开关呢？',
    },
    summary: {
      en: 'A weekly equity system I built and run. A structured review found three measurement-basis errors. The worst one kept the risk gate stuck shut.',
      zh: '一个我搭建并实际运行的周度股票系统。一次结构化复查找出了三个口径错误，最严重的一个让风控闸门一直锁着。',
    },
    lede: {
      en: 'Most of this project is research hygiene: keeping what was observed apart from what was assumed. This case is about a bug that the hygiene caught — and why it was invisible until someone checked which curve the gate was reading.',
      zh: '这个项目的大部分工作是研究卫生：把“观测到的”和“假设的”分开。这个案例讲的是这套纪律抓到的一个 bug，以及为什么在有人检查闸门读的是哪条曲线之前，它一直没被发现。',
    },
    role: { en: 'Researcher and operator; directed AI coding agents for implementation', zh: '研究者与运营者；指挥 AI 编程代理实现' },
    when: { en: '2025 – 2026', zh: '2025 – 2026 年' },
    stack: ['Python', 'pandas', 'Alpaca API', 'unittest'],
    stats: [
      { value: '299', label: { en: 'research scripts, one question each', zh: '个研究脚本，每个回答一个问题' } },
      { value: '131', label: { en: 'test files', zh: '个测试文件' } },
      { value: '3', label: { en: 'measurement-basis errors found and fixed', zh: '个口径错误被找出并修复' } },
      { value: '39', label: { en: 'conformance tests guarding the fixes', zh: '个一致性测试守住修复' } },
    ],
    links: [],
    card: 'gate-lock',
    sections: [
      {
        kicker: { en: 'Context', zh: '背景' },
        heading: { en: 'A weekly, long-only system with a drawdown gate', zh: '一个带回撤闸门的周度纯多头系统' },
        body: [
          {
            en: 'Each week the system selects two sleeves of US stocks: a momentum core and a rank-acceleration sleeve. On top sits an account-level gate. When drawdown crosses a threshold, it cuts exposure; when drawdown recovers, it lets exposure back in.',
            zh: '系统每周选出两组美股：一组以动量为核心，一组看排名加速度。最上层是账户级闸门：回撤越过阈值就降低仓位，回撤修复后再恢复仓位。',
          },
        ],
      },
      {
        kicker: { en: 'Method', zh: '方法' },
        heading: { en: 'Label every number', zh: '给每个数字贴标签' },
        body: [
          {
            en: 'Every figure in a report carries one of four labels, and each report names its snapshot ID, inputs, window, row count and script. Fact snapshots keep raw API responses with SHA-256 hashes. New ideas run as no-order shadows before they touch production.',
            zh: '报告里的每个数字都带四类标签之一，每份报告都写明快照 ID、输入文件、观察区间、行数和计算脚本。事实快照保存原始 API 响应和 SHA-256 哈希。新想法先以不下单的影子模式运行，之后才可能接入生产。',
          },
        ],
        bullets: [
          { en: '<strong>observed</strong> — returned by the broker or an API, unedited.', zh: '<strong>observed（观测）</strong>：券商或接口原样返回的内容。' },
          { en: '<strong>derived</strong> — computed from observed data by a named script.', zh: '<strong>derived（推导）</strong>：由指定脚本从观测数据计算得出。' },
          { en: '<strong>assumption</strong> — cost scenarios, limits, model judgment.', zh: '<strong>assumption（假设）</strong>：成本情景、限额、模型判断。' },
          { en: '<strong>unknown</strong> — missing, and never filled with a guess or a fallback.', zh: '<strong>unknown（未知）</strong>：缺失的数据，绝不用猜测或替代值冒充。' },
        ],
      },
      {
        kicker: { en: 'The bug', zh: 'Bug' },
        heading: { en: 'The gate was reading the wrong curve', zh: '闸门读错了曲线' },
        body: [
          {
            en: 'The gate went red at a −18% drawdown and cut exposure to 25%. It released only when drawdown recovered above −8%. But it measured drawdown on the account curve that had <em>already been cut</em>.',
            zh: '回撤到 −18% 时闸门变红，仓位降到 25%；回撤修复到 −8% 以内才解除。问题是，它量回撤用的是<em>已经被降过仓</em>的那条账户曲线。',
          },
          {
            en: 'At 25% exposure that curve moves at a quarter of the strategy’s speed. Getting from −18% back to −8% needs +12.2% on the cut curve, which means roughly +49% from the underlying strategy. Once red, the gate was close to an absorbing state: the protection itself prevented recovery.',
            zh: '在 25% 仓位下，这条曲线的变化速度只有策略本身的四分之一。从 −18% 回到 −8%，被降仓的曲线需要上涨 12.2%，相当于底层策略上涨约 49%。所以一旦变红，闸门几乎是一个吸收态：保护机制本身阻止了恢复。',
          },
        ],
        figure: 'gate-lock',
      },
      {
        kicker: { en: 'Same family', zh: '同类错误' },
        heading: { en: 'Two more: the wrong unit and the wrong window', zh: '另外两个：单位错了，区间错了' },
        body: [
          {
            en: 'The same review found two more errors of the same kind — numbers that were correct in one basis and silently reused in another.',
            zh: '同一次复查又找出两个同类错误：数字在一种口径下是对的，却被悄悄用在了另一种口径里。',
          },
        ],
        figure: 'basis-errors',
      },
      {
        kicker: { en: 'Fix', zh: '修复' },
        heading: { en: 'One source of truth, enforced by tests', zh: '单一口径来源，由测试守住' },
        body: [
          {
            en: 'Every convention a number depends on now lives in one versioned module. The gate reads the undisturbed strategy curve, while exposure still applies to the returns actually earned. 39 conformance tests guard the bases — including one that proves the old basis latches red and one that proves the new basis releases.',
            zh: '所有数字依赖的口径现在都集中在一个带版本号的模块里。闸门改读未受干扰的策略曲线，仓位比例仍然作用在实际获得的收益上。39 个一致性测试守住这些口径，其中一个证明旧口径会锁死在红灯，另一个证明新口径会解除。',
          },
        ],
      },
    ],
    limits: {
      en: 'By design, this page shows no money amounts or returns. The fixes remove known measurement errors; they do not prove the strategy has an edge. The repository is private.',
      zh: '本页按设计不展示任何金额或收益数字。这些修复消除了已知的口径错误，但不能证明策略有优势。代码仓库为私有。',
    },
  },
  {
    slug: 'debt-runner',
    track: 'game',
    name: { en: 'DebtRunner', zh: 'DebtRunner' },
    kicker: { en: 'Game production · team lead', zh: '游戏制作 · 项目负责人' },
    question: {
      en: 'Four people, four weeks. What makes it to the show floor?',
      zh: '四个人，四周，什么能做上展台？',
    },
    summary: {
      en: 'A top-down roguelite about outrunning your debt. I led the four-person team as producer and built the core gameplay systems.',
      zh: '一款关于“甩掉债务”的俯视角 roguelite。我作为制作人带领四人团队，并实现了核心玩法系统。',
    },
    lede: {
      en: 'A 2D top-down bullet-heaven roguelite built in Unity 6 in four weeks and selected for the Academy of Art University Spring Show 2026. I was project lead and producer, and I implemented and connected the core gameplay systems.',
      zh: '一款用 Unity 6 在四周内完成的 2D 俯视角弹幕 roguelite，入选 Academy of Art University 2026 春季作品展。我担任项目负责人兼制作人，并实现和串联了核心玩法系统。',
    },
    role: { en: 'Project lead / producer + gameplay engineer', zh: '项目负责人 / 制作人 + 玩法工程' },
    when: { en: 'Spring 2026', zh: '2026 年春季' },
    stack: ['Unity 6', 'URP', 'C#'],
    stats: [
      { value: '4', label: { en: 'people on the team', zh: '人团队' } },
      { value: '4', label: { en: 'weeks, concept to showcase build', zh: '周，从概念到展示版本' } },
      { value: '7', label: { en: 'core gameplay systems I implemented and connected', zh: '个由我实现并串联的核心玩法系统' } },
      { value: '2026', label: { en: 'AAU Spring Show selection', zh: '入选 AAU 春季作品展' } },
    ],
    links: [
      { label: { en: 'Repository', zh: '代码仓库' }, url: `${GH}/DebtRunner` },
      { label: { en: 'Game QA & Chinese LQA sample', zh: '游戏 QA 与中文 LQA 样例' }, url: `${GH}/DebtRunner/blob/main/docs/game-qa-lqa-portfolio-sample.md` },
    ],
    hero: 'debt-title',
    card: 'debt-title',
    sections: [
      {
        kicker: { en: 'The game', zh: '游戏' },
        heading: { en: 'Pay the debt before the clock runs out', zh: '在倒计时结束前还上债' },
        body: [
          {
            en: 'Each of the ten rounds sets a debt you must collect before the timer ends. You throw cards automatically at coin-mouthed monsters, pick one of three upgrade cards on level-up, and spend cash in a between-round shop — including a wheel that can pay out, or raise the next debt.',
            zh: '十个回合里，每个回合都设定一笔债务，你要在倒计时结束前凑齐。角色会自动向长着嘴的金币怪物甩出扑克牌；升级时从三张强化卡里选一张；回合之间可以在商店花钱，其中有一个转盘，可能给你奖励，也可能让下一笔债更高。',
          },
        ],
        figure: 'debt-gallery',
      },
      {
        kicker: { en: 'Production', zh: '制作' },
        heading: { en: 'Scope first, then milestones', zh: '先定范围，再排里程碑' },
        body: [
          {
            en: 'With four weeks, the main risk was scope. I planned milestones and task ownership, wrote and maintained the game design document, and coordinated art, UI and gameplay so each week ended with something playable.',
            zh: '只有四周，最大的风险是范围失控。我规划里程碑和任务归属，编写并维护游戏设计文档，协调美术、UI 和玩法，让每一周结束时都有可以玩的版本。',
          },
        ],
      },
      {
        kicker: { en: 'Engineering', zh: '工程' },
        heading: { en: 'One loop, built system by system', zh: '一个循环，逐个系统搭起来' },
        body: [
          {
            en: 'I implemented the gameplay systems and connected them into one loop: game-state flow, movement, auto-target combat, enemy spawning, projectiles, XP and level-up rewards, settlement, the shop, and game over.',
            zh: '我实现了各个玩法系统，并把它们串成一个循环：游戏状态流转、移动、自动瞄准战斗、敌人生成、投射物、经验与升级奖励、结算、商店和游戏结束。',
          },
        ],
        figure: 'debt-loop',
      },
      {
        kicker: { en: 'QA', zh: 'QA' },
        heading: { en: 'Playtest, prioritize, fix', zh: '试玩、排优先级、修复' },
        body: [
          {
            en: 'I ran QA passes on tutorial flow, combat readability, UI clarity, round pacing and reward feedback. Playtest and instructor feedback set the fix order. I rechecked repeated state transitions — restart, return, next round — and cleared compile and runtime blockers during integration.',
            zh: '我对教学流程、战斗可读性、UI 清晰度、回合节奏和奖励反馈做了多轮 QA。修复顺序由试玩反馈和导师意见决定。我反复检查状态切换（重新开始、返回、进入下一回合），并在集成阶段清掉编译和运行时的阻塞问题。',
          },
          {
            en: 'The <a href="https://github.com/SeikiChan/DebtRunner/blob/main/docs/game-qa-lqa-portfolio-sample.md">QA &amp; Simplified Chinese LQA sample</a> separates the QA I actually performed from practice test designs and an LQA checklist.',
            zh: '<a href="https://github.com/SeikiChan/DebtRunner/blob/main/docs/game-qa-lqa-portfolio-sample.md">游戏 QA 与简体中文 LQA 样例</a>把我实际做过的 QA 和练习用的测试设计、LQA 检查清单明确分开。',
          },
        ],
        figure: 'debt-video',
      },
    ],
    limits: {
      en: 'A student prototype made by a team; the role list above is my part of it. The QA/LQA sample includes practice material, not commercial test results.',
      zh: '这是团队制作的学生原型，上面列出的是我负责的部分。QA/LQA 样例中包含练习材料，不是商业项目的测试结果。',
    },
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
