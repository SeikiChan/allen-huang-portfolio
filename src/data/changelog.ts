import type { T } from '../i18n';

const S = (en: string, zh: string): T => ({ en, zh });

export type Verdict = 'rejected' | 'chosen' | 'mixed' | 'kept' | 'fixed';

/** A screenshot in src/assets/changelog. `img` is the file name without extension; `-en` / `-zh` is added when both exist. */
export interface Shot { img: string; cap: T }
export interface Pair { before: string; after: string; cap: T }

export interface Entry {
  v: string;
  /** Commit time, UTC. Empty for the explorations that were never committed. */
  when: string;
  title: T;
  verdict: Verdict;
  proposed: T;
  /** My review notes on what the AI proposed, in my words. */
  review: T[];
  decision: T;
  shots?: Shot[];
  pairs?: Pair[];
}

export const VERDICT: Record<Verdict, T> = {
  rejected: S('Rejected', '否决'),
  chosen: S('Chosen', '选定'),
  mixed: S('Partly rejected', '部分否决'),
  kept: S('Kept', '保留'),
  fixed: S('Fixed', '已修正'),
};

// Screenshots are rebuilt from each commit in the repository history; the three directions and the two
// alternatives to v1.0 were never committed and come from the review session.
export const ENTRIES: Entry[] = [
  {
    v: 'v0.2',
    when: '2026-10-18T04:08Z',
    title: S('First rebuild: a bilingual site', '第一次重建：中英双语站'),
    verdict: 'rejected',
    proposed: S(
      'A conventional portfolio: slogan headline, project cards, an approach section. Every case page ended with a “what this does not show” box.',
      '一个常规作品集：口号式标题、项目卡片、方法论板块。每个案例页结尾都有一个“这项工作不能说明什么”的框。',
    ),
    review: [
      S('The structure is a template: rigid and boring. No different from picking one off the web.', '结构就是模板，死板又无聊，和我直接上网套模板没有区别。'),
      S('The copy reads like slogans.', '文案像在喊口号。'),
      S('Two projects are described wrong. The Arena is two LLMs trading to see which is better. The core of my quant research is the AM 70/30 model, not only the risk gate.', '有两个项目没说对。角斗场就是让两个 LLM 去交易，看谁更厉害；量化研究的核心是 AM 70/30 模型，不只是风控闸门。'),
      S('The “does not show” boxes make every project look like it can do nothing.', '每个项目都有“不能说明什么”，看起来这个项目什么都做不了。'),
    ],
    decision: S('Rewrite the Arena and quant pages, remove the disclaimer boxes, and find a structure that is not a template.', '重写角斗场和量化两页，删掉免责框，换一个不是模板的结构。'),
    shots: [
      { img: 'v1-home', cap: S('Home, first screen.', '首页首屏。') },
      { img: 'v1-limits', cap: S('The box at the end of every case page.', '每个案例页结尾的框。') },
    ],
  },
  {
    v: 'v0.3',
    when: '2026-10-18T05:07Z',
    title: S('Fixture board', '赛程表'),
    verdict: 'rejected',
    proposed: S(
      'Most projects are contests, so the site became a sports fixture board: each project a match, each page a match report.',
      '大部分项目都是比赛，于是整站做成体育赛程表：每个项目是一场比赛，每页是一份赛报。',
    ),
    review: [
      S('There is something to it, but it misleads. A visitor cannot tell what I do at first glance and may think they are on the wrong site.', '有一点意思，但误解太大。观众第一眼不知道我做什么，甚至怀疑自己进错了网站。'),
      S('About the self-introduction: would good portfolios write it like this, “who I am, what I do”?', '自我简介这里，优秀的作品集会这么写吗？说我是谁、我做什么之类的？'),
    ],
    decision: S('Put my name and roles first; keep the contest framing secondary.', '先放名字和方向，比赛框架退到次要位置。'),
    shots: [{ img: 'v2-home', cap: S('Home, first screen.', '首页首屏。') }],
  },
  {
    v: 'v0.4',
    when: '2026-10-18T05:51Z',
    title: S('Name first, theme second', '名字在前，主题在后'),
    verdict: 'rejected',
    proposed: S('The same board, with a name masthead and a role line on top.', '同一套赛程表，顶部加上名字和方向。'),
    review: [
      S('The problem is the layout and theme itself. It still makes people unsure what they are looking at.', '问题在整个排版和主题框架，它仍然让人看不懂这是什么。'),
    ],
    decision: S('Drop the sports theme completely and look for new directions.', '彻底放弃体育主题，重新找方向。'),
    shots: [{ img: 'v3-home', cap: S('Home, first screen.', '首页首屏。') }],
  },
  {
    v: 'A–C',
    when: '',
    title: S('Three new directions', '三个新方向'),
    verdict: 'rejected',
    proposed: S('Three directions to choose from: a split hero, a card grid and an index list.', '三个方向供选择：左右分栏、卡片网格、索引列表。'),
    review: [
      S('All three are mediocre. They look like the generic templates online.', '三个都很一般，和网上的通用模板一样。'),
      S('Study how top companies and the best portfolios design their sites, and make a piece a master graphic and UI/UX designer would sign.', '去参考顶级公司和优秀作品集的网页，拿出平面设计师和 UI/UX 设计师的大师之作。'),
    ],
    decision: S('Go back to references from top product sites and design one direction properly instead of three quickly.', '回到顶级产品网站做参考，认真做一个方向，而不是快速出三个。'),
    shots: [
      { img: 'dir-a', cap: S('A: split hero.', 'A：左右分栏。') },
      { img: 'dir-b', cap: S('B: card grid.', 'B：卡片网格。') },
      { img: 'dir-c', cap: S('C: index list.', 'C：索引列表。') },
    ],
  },
  {
    v: 'v1.0',
    when: '2026-10-18T06:50Z',
    title: S('Dark product site', '深色产品站'),
    verdict: 'chosen',
    proposed: S(
      'A dark product-site layout: who I am in the first line, real screens on a stage, one art-directed chapter per project.',
      '深色产品站：第一句就说明我是谁，真实界面放在舞台上，每个项目一个单独设计的章节。',
    ),
    review: [
      S('This one has something. It catches the eye. Keep it.', '有点东西，有眼前一亮的感觉，先保留。'),
      S('Before settling, show me two completely different versions.', '定稿前，再看两个完全不一样的版本。'),
      S('After comparing the three, I chose this one.', '三版对比之后，我选了这一版。'),
    ],
    decision: S('v1.0 becomes the base. The two alternatives are archived.', 'v1.0 定为基础版本，另外两版存档。'),
    shots: [
      { img: 'v4-home', cap: S('Chosen: v1.0.', '选定：v1.0。') },
      { img: 'v4-alt-issue', cap: S('Alternative: editorial issue.', '备选：杂志刊物。') },
      { img: 'v4-alt-bento', cap: S('Alternative: bento grid.', '备选：便当格。') },
    ],
  },
  {
    v: 'v1.1',
    when: '2026-10-18T07:56Z',
    title: S('Polish the details', '打磨细节'),
    verdict: 'fixed',
    proposed: S('The v1.0 details as first generated.', 'v1.0 最初生成的细节。'),
    review: [
      S('The GPT vs Claude image says nothing. A viewer cannot tell what they are looking at.', 'GPT vs Claude 这张配图不知所谓，观众看不出这是什么。'),
      S('The small sequence labels at the start of each section break the theme, in size and in texture.', '每个栏目开头的序列小字，大小和质感都破坏了主题。'),
      S('No line may end with a lone character or word. Visual balance first, without slowing the reader.', '禁止孤字寡行。视觉平衡优先，但不能影响阅读流畅。'),
    ],
    decision: S(
      'The image now shows one real evaluation question and both scores. Labels became sans-serif pills. A build step keeps the last words of every text block together; a check across 12 pages at 4 widths finds no orphan lines.',
      '配图换成一道真实评测题和两边的得分；序列小字换成无衬线胶囊标签；构建时把每段文字的末尾几个字粘在一起，12 个页面 × 4 种宽度检查，孤字寡行为 0。',
    ),
    pairs: [
      { before: 'v5-eval-before', after: 'v5-eval-after', cap: S('GPT vs Claude image.', 'GPT vs Claude 配图。') },
      { before: 'v5-label-before', after: 'v5-label-after', cap: S('Section label.', '栏目序列标签。') },
      { before: 'v5-orphan-before', after: 'v5-orphan-after', cap: S('A Chinese line that ended in two characters.', '一段末行只剩两个字的中文。') },
    ],
  },
  {
    v: 'v1.2',
    when: '2026-10-18T09:12Z',
    title: S('Motion and navigation', '动效与导航'),
    verdict: 'mixed',
    proposed: S(
      'For my brief (glide instead of jumping, open every page at its top, a top bar that gets out of the way), the AI added eased scrolling and a nav that shrinks into a pill on the left while reading.',
      '按我的要求（滚动要顺滑而不是瞬移、每页从顶部打开、顶栏不要挡阅读），AI 加了缓动滚动，并让导航在阅读时缩成左侧的胶囊。',
    ),
    review: [
      S('The transitions are good.', '转换做得不错。'),
      S('The pill has to be redone. Look at how great portfolios and top companies avoid covering the text, and what they trade off.', '胶囊要重做。去看优秀作品集和顶尖公司怎么处理和避免遮挡阅读，以及他们的取舍。'),
      S('The arrows in this figure are crooked. It reads as generated at a glance.', '这张图的箭头都是歪的，一眼就是生成的问题。'),
    ],
    decision: S('Keep the scrolling; replace the pill and redraw the figure.', '保留滚动，替换胶囊，重画这张图。'),
    shots: [
      { img: 'v6-pill', cap: S('The pill sits on the start of every line in left-aligned text.', '左对齐正文里，胶囊正好压在每行开头。') },
      { img: 'v6-flow-before', cap: S('Text arrows sitting on the column borders.', '用文字符号画的箭头，压在分栏线上。') },
    ],
  },
  {
    v: 'v1.3',
    when: '2026-10-18T09:30Z',
    title: S('Reading comes first', '阅读优先'),
    verdict: 'kept',
    proposed: S(
      'The nav slides away while reading down and returns on any scroll up, the pattern long-form reading sites use. A 2 px line on the top edge keeps the position. The figure became one continuous track with a node per step.',
      '往下读时导航滑走，往上滚立刻回来，这是长文阅读网站的通行做法；顶部 2px 细线保留进度。流程图改成一条连续轨道，每一步一个节点。',
    ),
    review: [S('No objection to the new navigation; my next notes moved on to alignment and the progress line.', '对新导航没有异议；下一轮意见转向对齐和进度线。')],
    decision: S('This becomes the reading behaviour of every page.', '成为全站的阅读行为。'),
    shots: [{ img: 'v6-flow-after', cap: S('The redrawn trading-day flow.', '重画后的交易日流程。') }],
  },
  {
    v: 'v1.4',
    when: '2026-10-18T09:49Z',
    title: S('Alignment, balance, checkpoints', '对齐、平衡、检查点'),
    verdict: 'fixed',
    proposed: S('The case pages and the progress line from v1.3.', 'v1.3 的案例页和进度线。'),
    review: [
      S('This DebtRunner section is uncomfortable to read. It does not look centred or aligned; it leans to one side.', 'DebtRunner 这部分排版看着不舒服，像没有居中或对齐，歪向一边。'),
      S('The loop is unbalanced. In a way it is also an orphan line.', '循环的呈现不平衡，某种意义上也是孤字寡行。'),
      S('Use the motion library to make the progress line more interesting, within the theme.', '用特效库的组件，在符合主题的前提下让进度线更有趣。'),
    ],
    decision: S(
      'Tag, heading, text and figure now share one left edge. The loop is redrawn from the game’s real state machine. The progress line has a checkpoint per section that pops when passed and briefly names the section.',
      '标签、标题、正文和图表对齐到同一条左边线；循环按游戏代码里真实的状态机重画；进度线上每个章节一个检查点，经过时弹一下并短暂显示章节名。',
    ),
    pairs: [
      { before: 'v7-loop-before', after: 'v7-loop-after', cap: S('DebtRunner, “The loop I built”.', 'DebtRunner“我搭的这个循环”。') },
      { before: 'v7-progress-before', after: 'v7-progress-after', cap: S('Progress line.', '进度线。') },
    ],
  },
];
