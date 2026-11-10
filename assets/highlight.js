// Minimal syntax highlighting (JS and HTML), no dependency.
// Usage: <pre><code class="language-js">…</code></pre>
(() => {
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const sp = (c, s) => `<span class="tk-${c}">${esc(s)}</span>`;
  const KW = "import|from|export|default|const|let|var|function|return|new|if|else|for|while|class|extends|of|in|true|false|null|undefined|async|await|this";
  const JS = new RegExp(`(\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\/)|("(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*'|\`(?:\\\\.|[^\`\\\\])*\`)|\\b(${KW})\\b|\\b(\\d+(?:\\.\\d+)?)\\b|\\b([A-Z][\\w$]*)\\b|\\b([A-Za-z_$][\\w$]*)(?=\\()`, "g");
  const js = c => c.replace(JS, (m, a, b, k, n, cl, f) => a ? sp("c", m) : b ? sp("s", m) : k ? sp("k", m) : n ? sp("n", m) : cl ? sp("cl", m) : sp("f", m));
  // One single pass over the tag, so spans we generate are never re-matched
  const tag = t => {
    let out = "", last = 0, m;
    const re = /^(<\/?)([\w-]+)|([\w:-]+)=("[^"]*"|'[^']*')/g;
    while ((m = re.exec(t))) {
      out += esc(t.slice(last, m.index));
      out += m[1] ? esc(m[1]) + sp("t", m[2]) : esc(m[3]) + "=" + sp("s", m[4]);
      last = re.lastIndex;
    }
    return out + esc(t.slice(last));
  };
  const html = c => {
    const re = /(<!--[\s\S]*?-->)|(<script[^>]*>)([\s\S]*?)(<\/script>)|(<\/?[a-zA-Z][^>]*>)/g;
    let out = "", last = 0, m;
    while ((m = re.exec(c))) {
      out += esc(c.slice(last, m.index));
      out += m[1] ? sp("c", m[1]) : m[2] ? tag(m[2]) + js(m[3]) + tag(m[4]) : tag(m[5]);
      last = re.lastIndex;
    }
    return out + esc(c.slice(last));
  };
  document.querySelectorAll("pre code").forEach(el => {
    const lang = (el.className.match(/language-(\w+)/) || [])[1];
    const src = el.textContent.replace(/^\n/, "").replace(/\s+$/, "");
    el.innerHTML = lang === "html" ? html(src) : lang === "js" ? js(src) : esc(src);
  });
})();
