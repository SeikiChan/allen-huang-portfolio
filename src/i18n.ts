export const LANGS = ['en', 'zh'] as const;
export type Lang = (typeof LANGS)[number];

/** A string in both site languages. Every visible string goes through this so the two versions stay in step. */
export type T = Record<Lang, string>;

export const CONTACT = {
  email: 'allenh6103@gmail.com',
  linkedin: 'https://www.linkedin.com/in/yilun-huang-7a45a32bb',
  github: 'https://github.com/SeikiChan',
};

/** Prefix a site-internal path with the deploy base and the language segment. `path` has no leading slash. */
export function href(lang: Lang, path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const prefix = lang === 'zh' ? 'zh/' : '';
  return base + prefix + path.replace(/^\/+/, '');
}

export const UI = {
  htmlLang: { en: 'en', zh: 'zh-CN' },
  skip: { en: 'Skip to content', zh: '跳到正文' },
  navWork: { en: 'Work', zh: '作品' },
  navPlayer: { en: 'About', zh: '关于' },
  navContact: { en: 'Contact', zh: '联系' },
  navLog: { en: 'Changelog', zh: '更新日志' },
  switchTo: { en: '中文', zh: 'EN' },
  switchLabel: { en: '切换到中文', zh: 'Switch to English' },
  home: { en: 'Allen Huang, home', zh: 'Allen Huang，首页' },
  back: { en: 'All work', zh: '全部作品' },
  next: { en: 'Next project', zh: '下一个项目' },
  role: { en: 'My role', zh: '我的角色' },
  built: { en: 'Built with', zh: '技术' },
  links: { en: 'Links', zh: '链接' },
  privateRepo: { en: 'Private repository', zh: '私有仓库' },
  email: { en: 'Email', zh: '邮箱' },
  placeholder: { en: 'Media slot', zh: '待补素材' },
} satisfies Record<string, T>;
