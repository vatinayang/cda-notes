/* =========================================================
   CDA 讀講義筆記 — 共用互動元件
   使用方式：在頁面放 <div class="widget" data-widget="logit-curve" ...>
   目前元件：
     logit-curve  S 形曲線 + 切線，示範「odds ratio 處處相同、斜率會變」
       data-alpha  預設 α      data-beta  預設 β
       data-xmin   x 最小值    data-xmax  x 最大值
       data-xlabel x 軸名稱
   新增元件時：在下方 WIDGETS 加一個函式，並更新 CLAUDE.md 的元件表。
   ========================================================= */
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const fmt = (v, d = 3) => (Math.abs(v) >= 1000 ? v.toExponential(2) : v.toFixed(d));
  const logistic = (z) => 1 / (1 + Math.exp(-z));

  function el(tag, attrs, parent) {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  const WIDGETS = {
    "logit-curve": function (root) {
      const a0 = parseFloat(root.dataset.alpha ?? "0");
      const b0 = parseFloat(root.dataset.beta ?? "1");
      const xmin = parseFloat(root.dataset.xmin ?? "-5");
      const xmax = parseFloat(root.dataset.xmax ?? "5");
      const xlabel = root.dataset.xlabel || "x";
      const uid = "w" + Math.random().toString(36).slice(2, 7);

      root.innerHTML = `
        <svg viewBox="0 0 600 280" role="img" aria-label="logistic 曲線"></svg>
        <div class="controls">
          <label for="${uid}-x">${xlabel}：<span data-o="x"></span>
            <input id="${uid}-x" type="range" min="${xmin}" max="${xmax}" step="0.1" value="${((xmin + xmax) / 2).toFixed(1)}"></label>
          <label for="${uid}-b">β（斜率參數）：<span data-o="b"></span>
            <input id="${uid}-b" type="range" min="-1" max="1.5" step="0.001" value="${b0}"></label>
          <label for="${uid}-a">α（截距）：<span data-o="a"></span>
            <input id="${uid}-a" type="range" min="${(a0 - 10).toFixed(1)}" max="${(a0 + 10).toFixed(1)}" step="0.01" value="${a0}"></label>
        </div>
        <div class="readout">
          <div>π̂(x)<b data-o="p"></b></div>
          <div>odds(x)<b data-o="o1"></b></div>
          <div>odds(x+1)<b data-o="o2"></b></div>
          <div>odds 比值<b data-o="or"></b></div>
          <div>斜率 βπ(1−π)<b data-o="s"></b></div>
        </div>`;

      const svg = root.querySelector("svg");
      const L = 48, R = 584, T = 16, B = 244;
      const sx = (x) => L + ((x - xmin) / (xmax - xmin)) * (R - L);
      const sy = (p) => B - p * (B - T);
      const css = getComputedStyle(document.documentElement);
      const col = (n) => css.getPropertyValue(n).trim();

      // 座標軸與格線
      for (const p of [0, 0.25, 0.5, 0.75, 1]) {
        el("line", { x1: L, x2: R, y1: sy(p), y2: sy(p), stroke: col("--sen"), "stroke-width": 1 }, svg);
        const t = el("text", { x: L - 8, y: sy(p) + 4, "text-anchor": "end", "font-size": 11, fill: col("--usuzumi") }, svg);
        t.textContent = p.toFixed(2);
      }
      const step = (xmax - xmin) / 5;
      for (let i = 0; i <= 5; i++) {
        const x = xmin + i * step;
        const t = el("text", { x: sx(x), y: B + 18, "text-anchor": "middle", "font-size": 11, fill: col("--usuzumi") }, svg);
        t.textContent = x.toFixed(1);
      }
      const xl = el("text", { x: R, y: B + 34, "text-anchor": "end", "font-size": 11, fill: col("--usuzumi") }, svg);
      xl.textContent = xlabel;

      const curve = el("path", { fill: "none", stroke: col("--ai"), "stroke-width": 2.5 }, svg);
      const tangent = el("line", { stroke: col("--trap"), "stroke-width": 1.5, "stroke-dasharray": "5 4" }, svg);
      const dot = el("circle", { r: 5, fill: col("--ai"), stroke: col("--kami"), "stroke-width": 2 }, svg);

      const ix = root.querySelector(`#${uid}-x`), ib = root.querySelector(`#${uid}-b`), ia = root.querySelector(`#${uid}-a`);
      const out = (k) => root.querySelector(`[data-o="${k}"]`);

      function draw() {
        const x = +ix.value, b = +ib.value, a = +ia.value;
        let d = "";
        for (let i = 0; i <= 120; i++) {
          const xx = xmin + (i / 120) * (xmax - xmin);
          d += (i ? "L" : "M") + sx(xx).toFixed(1) + "," + sy(logistic(a + b * xx)).toFixed(1);
        }
        curve.setAttribute("d", d);
        const p = logistic(a + b * x), p2 = logistic(a + b * (x + 1));
        const slope = b * p * (1 - p);
        const h = (xmax - xmin) * 0.12;
        const clamp = (v) => Math.max(0, Math.min(1, v));
        tangent.setAttribute("x1", sx(x - h)); tangent.setAttribute("y1", sy(clamp(p - slope * h)));
        tangent.setAttribute("x2", sx(x + h)); tangent.setAttribute("y2", sy(clamp(p + slope * h)));
        dot.setAttribute("cx", sx(x)); dot.setAttribute("cy", sy(p));
        const o1 = p / (1 - p), o2 = p2 / (1 - p2);
        out("x").textContent = x.toFixed(1); out("b").textContent = b.toFixed(3); out("a").textContent = a.toFixed(2);
        out("p").textContent = fmt(p); out("o1").textContent = fmt(o1, 2); out("o2").textContent = fmt(o2, 2);
        out("or").textContent = fmt(o2 / o1, 3) + "  (e^β = " + fmt(Math.exp(b), 3) + ")";
        out("s").textContent = fmt(slope);
      }
      [ix, ib, ia].forEach((n) => n.addEventListener("input", draw));
      draw();
    },
  };

  /* 講義原頁：圖檔不存在時（公開網站預設不上傳），改成一行頁碼提示 */
  function markMissing(fig) {
    if (fig.classList.contains("missing")) return;
    fig.classList.add("missing");
    const cap = fig.querySelector("figcaption");
    if (cap) cap.textContent += "　原頁僅在本機顯示，請對照紙本講義";
    const sheet = fig.closest(".sheet");
    if (sheet && sheet.querySelectorAll("figure:not(.missing)").length === 0) {
      sheet.closest(".spread")?.classList.add("no-sheet");
    }
  }
  document.querySelectorAll(".sheet figure").forEach((fig) => {
    const img = fig.querySelector("img");
    if (!img) return;
    if (img.complete && img.naturalWidth === 0) markMissing(fig);
    img.addEventListener("error", () => markMissing(fig));
  });

  document.querySelectorAll("[data-widget]").forEach((n) => {
    const f = WIDGETS[n.dataset.widget];
    if (f) f(n);
  });
})();
