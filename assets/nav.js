// Shared navigation menu: to add a page, only edit the MENU array below.
(() => {
  const root = new URL("..", document.currentScript.src).href;
  const MENU = [
    ["Getting started", [
      ["Home", "index.html"],
      ["My first game with JSGE", "pages/first-game.html"]]],
    ["Classes", [
      ["Camera", "pages/camera.html"], ["Scene", "pages/scene.html"],
      ["Entity", "pages/entity.html"], ["Sprite", "pages/sprite.html"], ["Animation", "pages/animation.html"],
      ["Text", "pages/text.html"], ["Button", "pages/button.html"],
      ["Element", "pages/element.html"], ["Transition", "pages/transition.html"],
      ["ParticleEmitter", "pages/particleEmitter.html"]]],
    ["Effects", [["Light engine", "pages/maskLightEngine.html"]]]
  ]; // A third value of 1 means the page is not written yet (greyed-out link). Remove it once the page is published.
  const here = location.pathname.replace(/\/$/, "/index.html");
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const nav = document.createElement("aside");
  nav.id = "nav";
  nav.innerHTML = `<a class="brand" href="${root}index.html">🎮 JSGE</a>` + MENU.map(([g, items]) =>
    `<h4>${g}</h4>` + items.map(([t, h, soon]) => {
      const u = new URL(h, root);
      if (soon) return `<span class="i">${esc(t)}</span>`;
      return `<a class="i${u.pathname === here ? " on" : ""}" href="${u.href}">${esc(t)}</a>`;
    }).join("")).join("");
  const tg = document.createElement("button");
  tg.id = "tg"; tg.textContent = "☰ Menu";
  tg.onclick = () => nav.classList.toggle("open");
  document.body.prepend(nav, tg);
})();
