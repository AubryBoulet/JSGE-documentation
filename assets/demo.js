// Interactive example: <div class="demo" data-title="…" [data-width="800" data-height="600" data-fixed]><script type="text/plain">code</script></div>
// The code runs in an isolated iframe; JSGE is imported from the CDN. A <canvas id="gameCanvas"> is provided (800×600 by default).
// By default the canvas scales with the width of the page (the camera corrects the mouse position accordingly).
// data-fixed: the canvas keeps its exact pixel size instead (the example scrolls if the page is narrower).
document.querySelectorAll(".demo").forEach(el => {
  const init = el.querySelector('script[type="text/plain"]').textContent.trim();
  const w = +el.dataset.width || 800, h = +el.dataset.height || 600, fixed = el.hasAttribute("data-fixed");
  el.innerHTML = `<header><b></b><button class="reset">Reset</button><button class="run">▶ Run</button></header><textarea spellcheck="false"></textarea><iframe sandbox="allow-scripts" title="Result"></iframe>`;
  const [ta, fr] = [el.querySelector("textarea"), el.querySelector("iframe")];
  el.querySelector("b").textContent = el.dataset.title || "Interactive example";
  if (fixed) { fr.style.aspectRatio = "auto"; fr.style.height = h + "px"; fr.style.maxHeight = "none"; }
  else fr.style.aspectRatio = `${w}/${h}`;
  ta.value = init;
  const run = () => {
    fr.srcdoc = `<!DOCTYPE html><body style="margin:0;background:#000;overflow:${fixed ? "auto" : "hidden"}"><canvas id="gameCanvas" width="${w}" height="${h}" style="${fixed ? "" : "width:100%;"}display:block"></canvas><script type="module">${ta.value.replace(/<\/script/gi, "<\\/script")}<\/script>`;
  };
  el.querySelector(".run").onclick = run;
  el.querySelector(".reset").onclick = () => { ta.value = init; run(); };
  run();
});
