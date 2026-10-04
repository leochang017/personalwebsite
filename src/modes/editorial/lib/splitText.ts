/**
 * Minimal text splitting (no paid SplitText plugin).
 *
 * splitLines: wraps words, measures offsetTop to find the rendered lines and
 * rebuilds the element as overflow-hidden masks with one inner line each, so a
 * line can slide up from below its own mask.
 * splitChars: wraps every character (words stay unbreakable) for char flips.
 */
export interface SplitLinesResult {
  masks: HTMLElement[];
  lines: HTMLElement[];
  revert: () => void;
}

export function splitLines(el: HTMLElement): SplitLinesResult {
  const original = el.innerHTML;
  const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
  const words = text.length ? text.split(" ") : [];

  el.innerHTML = "";
  const probes: HTMLSpanElement[] = [];
  words.forEach((w, i) => {
    const s = document.createElement("span");
    s.textContent = w;
    s.style.display = "inline-block";
    el.appendChild(s);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    probes.push(s);
  });

  const groups: string[][] = [];
  let lastTop = Number.NaN;
  probes.forEach((p) => {
    const top = p.offsetTop;
    if (groups.length === 0 || Math.abs(top - lastTop) > 2) {
      groups.push([]);
      lastTop = top;
    }
    groups[groups.length - 1].push(p.textContent ?? "");
  });

  el.innerHTML = "";
  const masks: HTMLElement[] = [];
  const lines: HTMLElement[] = [];
  groups.forEach((g) => {
    const mask = document.createElement("span");
    mask.className = "sl-mask";
    mask.style.cssText =
      "display:block;overflow:hidden;padding-bottom:.15em;margin-bottom:-.15em;";
    const line = document.createElement("span");
    line.className = "sl-line";
    line.style.cssText = "display:block;will-change:transform;";
    line.textContent = g.join(" ");
    mask.appendChild(line);
    el.appendChild(mask);
    masks.push(mask);
    lines.push(line);
  });

  return {
    masks,
    lines,
    revert: () => {
      el.innerHTML = original;
    },
  };
}

export interface SplitCharsResult {
  chars: HTMLElement[];
  revert: () => void;
}

export function splitChars(el: HTMLElement): SplitCharsResult {
  const original = el.innerHTML;
  const text = el.textContent ?? "";
  el.innerHTML = "";
  const chars: HTMLElement[] = [];
  text.split(" ").forEach((word, wi, arr) => {
    const w = document.createElement("span");
    w.style.cssText = "display:inline-block;white-space:nowrap;";
    for (const ch of word) {
      const c = document.createElement("span");
      c.className = "sc-char";
      c.style.display = "inline-block";
      c.textContent = ch;
      w.appendChild(c);
      chars.push(c);
    }
    el.appendChild(w);
    if (wi < arr.length - 1) el.appendChild(document.createTextNode(" "));
  });
  return {
    chars,
    revert: () => {
      el.innerHTML = original;
    },
  };
}
