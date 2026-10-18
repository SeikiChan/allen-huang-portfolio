// Page motion shared by every page: in-page links glide instead of jumping, a new page opens at its top,
// and the floating nav condenses while the reader scrolls down.

// Motion Prompt #093 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#093
// Smooth scroll: cubic ease-in-out, 1.05 s, stop = target top − fixed header. Shorter jumps take less time.
const eIO = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const reduce = matchMedia('(prefers-reduced-motion: reduce)');

let glideRaf = 0;
function stopGlide() { cancelAnimationFrame(glideRaf); glideRaf = 0; }

function glide(to: number, done?: () => void) {
  stopGlide();
  const from = scrollY;
  const dist = to - from;
  if (reduce.matches || Math.abs(dist) < 2) { scrollTo({ top: to, behavior: 'instant' }); done?.(); return; }
  const dur = Math.min(1050, 600 + Math.abs(dist) * 0.45);
  const t0 = performance.now();
  const step = (now: number) => {
    const p = clamp((now - t0) / dur);
    scrollTo({ top: from + dist * eIO(p), behavior: 'instant' });
    if (p < 1) glideRaf = requestAnimationFrame(step);
    else { glideRaf = 0; done?.(); }
  };
  glideRaf = requestAnimationFrame(step);
}

function targetY(el: Element) {
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const max = document.documentElement.scrollHeight - innerHeight;
  return clamp(el.getBoundingClientRect().top + scrollY - margin, 0, max);
}

function initGlide() {
  // The reader takes over as soon as they scroll or press a key.
  ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach((t) => addEventListener(t, stopGlide, { passive: true }));
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element).closest?.('a[href]') as HTMLAnchorElement | null;
    if (!a || a.target) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search) return;
    const id = decodeURIComponent(url.hash.slice(1));
    const el = id ? document.getElementById(id) : null;
    if (id && !el) return;
    e.preventDefault();
    if (url.hash !== location.hash) history.pushState(null, '', url.hash || url.pathname + url.search);
    glide(el ? targetY(el) : 0, () => {
      if (!el) return;
      if (!el.hasAttribute('tabindex') && !(el as HTMLElement).matches('a, button, input, select, textarea')) el.setAttribute('tabindex', '-1');
      (el as HTMLElement).focus({ preventScroll: true });
    });
  });
}

// A fresh visit without a #target always starts at the top. Browsers already do this; the guard covers
// hosts that keep the old scroll position across pages, e.g. a preview frame that grows with its content.
function landAtTop() {
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  if (location.hash || nav?.type === 'back_forward' || nav?.type === 'reload') return;
  scrollTo({ top: 0, behavior: 'instant' });
  if (window.top === window) return;
  const first = document.querySelector('main > *');
  if (!first) return;
  const io = new IntersectionObserver(([e]) => {
    io.disconnect();
    // The frame's own viewport cannot see the host page; this tells us whether the top is cut off there.
    if (!e.isIntersecting || e.intersectionRect.top > e.boundingClientRect.top + 1) document.documentElement.scrollIntoView({ block: 'start' });
  });
  io.observe(first);
}

// Motion Prompt #075 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#075
// Sticky header: once the page moves, a shadow under the header fades in over the next 24 px of scroll.
// Motion Prompt #079 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#079
// Scroll progress bar: fill = scroll fraction of the page.
function initCondense() {
  const nav = document.getElementById('nav');
  const btn = document.getElementById('nav-now');
  const label = document.getElementById('nav-label');
  const brand = nav?.querySelector<HTMLElement>('.brand');
  const nowIn = btn?.querySelector<HTMLElement>('.now-in');
  const inner = nav?.querySelector<HTMLElement>('.nav-inner');
  if (!nav || !btn || !label || !brand || !nowIn || !inner) return;

  const marks = [...document.querySelectorAll<HTMLElement>('[data-nav]')];
  const links = [...nav.querySelectorAll<HTMLAnchorElement>('a[data-sec]')];
  const page = document.body.dataset.page ?? '';
  const TOP = 140; // below this the nav always shows in full
  let compact = false, lastY = scrollY, run = 0, need = 8, raf = 0, current = '';

  const fit = () => {
    const cs = getComputedStyle(inner);
    const w = parseFloat(cs.paddingLeft) + brand.offsetWidth + nowIn.offsetWidth + parseFloat(cs.paddingRight) + 2;
    nav.style.setProperty('--cw', `${Math.ceil(w)}px`);
  };
  const set = (on: boolean) => {
    if (on === compact) return;
    compact = on;
    nav.classList.toggle('compact', on);
    btn.setAttribute('aria-expanded', String(!on));
    btn.tabIndex = on ? 0 : -1;
  };

  const update = () => {
    raf = 0;
    const y = scrollY;
    const dy = y - lastY;
    lastY = y;
    // Direction with a little hysteresis, so a jittery trackpad does not flip the nav back and forth.
    if ((dy > 0 && run < 0) || (dy < 0 && run > 0)) run = 0;
    run += dy;
    if (y < TOP) set(false);
    else if (run > need) { set(true); need = 8; }
    else if (run < -24) set(false);

    nav.style.setProperty('--sh', clamp(y / 24).toFixed(3));
    const max = document.documentElement.scrollHeight - innerHeight;
    nav.style.setProperty('--p', max > 0 ? clamp(y / max).toFixed(4) : '0');

    // Where the reader is: the last marked block whose top has passed 35% of the viewport.
    const line = innerHeight * 0.35;
    let mark = marks[0];
    for (const m of marks) if (m.getBoundingClientRect().top <= line) mark = m;
    const text = mark?.dataset.nav ?? '';
    if (text !== current) {
      current = text;
      label.textContent = text;
      label.classList.remove('swap');
      void label.offsetWidth;
      label.classList.add('swap');
      fit();
    }
    const sec = mark?.dataset.sec ?? page;
    links.forEach((a) => a.classList.toggle('on', a.dataset.sec === sec));
  };
  const queue = () => { if (!raf) raf = requestAnimationFrame(update); };

  btn.addEventListener('click', () => {
    set(false);
    need = 48; // stay open until the reader clearly scrolls on
    run = 0;
    nav.querySelector<HTMLElement>('.nav-links a')?.focus({ preventScroll: true });
  });
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', () => { fit(); queue(); }, { passive: true });
  document.fonts?.ready.then(fit);
  update();
}

export function initNav() {
  landAtTop();
  initGlide();
  initCondense();
}
