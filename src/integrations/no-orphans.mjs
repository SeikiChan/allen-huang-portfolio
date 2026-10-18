// Build-time typesetting: keep the end of every text block together so no line ends with a lone word or
// one or two Chinese characters. Chinese: the last four characters are joined so they cannot break apart.
// Latin: the last two words are joined with a no-break space.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const CLOSERS = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'dd', 'dt', 'li', 'figcaption', 'span', 'b', 'strong', 'em', 'a', 'div', 'td', 'th', 'small', 'time', 'blockquote']);
const SKIP = new Set(['script', 'style', 'code', 'pre', 'svg', 'textarea', 'title']);
const CJK = /[㐀-鿿　-〿＀-￯]/;

/** Split text into display units, keeping HTML entities whole. */
const units = (text) => text.match(/&[a-zA-Z0-9#]+;|[\s\S]/g) ?? [];

function glue(text) {
  const u = units(text);
  const visible = u.filter((c) => c.trim()).length;
  if (visible < 6) return text;
  const tail = u.slice(-4).join('');
  if (CJK.test(tail)) {
    // U+2060 WORD JOINER forbids a line break between its neighbours without adding an element,
    // so flex and grid containers lay the text out exactly as before.
    const head = u.slice(0, -4).join('');
    return head + u.slice(-4).map((c) => (c === ' ' ? '\u00a0' : c)).join('\u2060');
  }
  const i = text.search(/ (?=\S+\s*$)/);
  return i > 0 ? text.slice(0, i) + '&nbsp;' + text.slice(i + 1) : text;
}

export function typeset(html) {
  const tokens = html.split(/(<[^>]+>)/);
  const stack = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.startsWith('<')) {
      const m = /^<(\/?)([a-zA-Z0-9]+)/.exec(t);
      if (m && SKIP.has(m[2].toLowerCase()) && !t.endsWith('/>')) {
        if (m[1]) stack.pop(); else stack.push(m[2]);
      }
      continue;
    }
    if (stack.length || !t.trim()) continue;
    const next = tokens[i + 1];
    const close = next && /^<\/([a-zA-Z0-9]+)>/.exec(next);
    if (close && CLOSERS.has(close[1].toLowerCase())) tokens[i] = glue(t);
  }
  return tokens.join('');
}

async function* htmlFiles(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

export default function noOrphans() {
  return {
    name: 'no-orphans',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        for await (const file of htmlFiles(fileURLToPath(dir))) {
          await writeFile(file, typeset(await readFile(file, 'utf8')));
        }
      },
    },
  };
}
