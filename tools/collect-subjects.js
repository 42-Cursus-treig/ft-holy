(async () => {
  "use strict";

  const SLUGS = __SLUGS__;

  const DELAY_MS = 700;
  const RETRY_BACKOFF = [2000, 5000];
  const ABORT_AFTER = 8;
  const STORE_KEY = "ft_holy:subjects";

  const CDN_PDF = /^https:\/\/cdn\.intra\.42\.fr\/pdf\/pdf\//;
  const PDF_NAME = /\/pdf\/pdf\/(\d+)\/(?:([a-z]{2})\.)?([^/]+\.pdf)$/i;
  const LOGIN_URL = /signin|oauth|auth\.42\.fr/;

  if (location.hostname !== "projects.intra.42.fr") {
    alert(
      "Ouvre d'abord un onglet sur projects.intra.42.fr en étant connecté, " +
        "puis relance le collecteur depuis cette page."
    );
    return;
  }

  const restore = () => {
    try {
      return JSON.parse(sessionStorage.getItem(STORE_KEY)) || {};
    } catch {
      return {};
    }
  };

  const subjects = restore();
  const failures = [];
  const todo = SLUGS.filter((s) => !subjects[s]);
  const alreadyDone = SLUGS.length - todo.length;

  const panel = document.createElement("div");
  panel.style.cssText = [
    "position:fixed", "top:16px", "right:16px", "z-index:2147483647",
    "width:340px", "padding:16px 18px",
    "background:#0a0c14", "color:#e8e3d3",
    "border:1px solid rgba(212,175,55,.35)", "border-radius:2px",
    "box-shadow:0 12px 48px rgba(0,0,0,.6)",
    "font:13px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace",
  ].join(";");
  panel.innerHTML =
    '<div style="font-size:10px;letter-spacing:.18em;text-transform:uppercase;' +
    'color:#d4af37;margin-bottom:10px">ft_holy — collecte des sujets</div>' +
    '<div id="fh-count" style="font-size:22px;color:#d4af37"></div>' +
    '<div id="fh-current" style="color:#8a8676;margin:6px 0;height:1.5em;' +
    'overflow:hidden;text-overflow:ellipsis;white-space:nowrap"></div>' +
    '<div id="fh-stats" style="font-size:11px;color:#8a8676"></div>' +
    '<button id="fh-stop" style="margin-top:12px;width:100%;padding:7px;' +
    "background:transparent;color:#e8e3d3;border:1px solid rgba(232,227,211,.25);" +
    'border-radius:2px;cursor:pointer;font:inherit">Arrêter et exporter</button>';
  document.body.appendChild(panel);

  const $count = panel.querySelector("#fh-count");
  const $current = panel.querySelector("#fh-current");
  const $stats = panel.querySelector("#fh-stats");

  let stopped = false;
  panel.querySelector("#fh-stop").onclick = () => {
    stopped = true;
    $current.textContent = "arrêt demandé…";
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const extract = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const seen = new Set();
    const docs = [];

    for (const a of doc.querySelectorAll("a[href]")) {
      const href = new URL(a.getAttribute("href"), location.origin).href;
      if (!CDN_PDF.test(href) || seen.has(href)) continue;
      seen.add(href);

      const m = href.match(PDF_NAME);
      docs.push({
        lang: (m && m[2]) || null,
        name: (m && m[3]) || href.split("/").pop(),
        href,
      });
    }
    return docs;
  };

  const attempt = async (slug) => {
    const r = await fetch("/projects/" + encodeURIComponent(slug), {
      credentials: "include",
      redirect: "follow",
    });

    if (LOGIN_URL.test(r.url)) return { fatal: true, reason: "session expirée" };
    if (r.status >= 500) return { retryable: true, reason: "HTTP " + r.status };
    if (!r.ok) return { retryable: false, reason: "HTTP " + r.status };

    return { ok: true, docs: extract(await r.text()) };
  };

  let done = alreadyDone;
  let found = Object.keys(subjects).length;
  let streak = 0;
  let sessionLost = false;

  const render = () => {
    $count.textContent = done + " / " + SLUGS.length;
    $stats.textContent = found + " résolus · " + failures.length + " sans sujet";
  };
  render();

  for (const slug of todo) {
    if (stopped) break;
    $current.textContent = slug;

    let result = null;
    for (let tryNo = 0; tryNo <= RETRY_BACKOFF.length; tryNo++) {
      try {
        result = await attempt(slug);
      } catch (e) {
        result = { retryable: true, reason: String(e.message || e) };
      }

      if (result.ok || result.fatal || !result.retryable) break;

      if (tryNo < RETRY_BACKOFF.length) {
        const wait = RETRY_BACKOFF[tryNo];
        $current.textContent =
          slug + " — " + result.reason + ", retry dans " + wait / 1000 + "s";
        await sleep(wait);
      }
    }

    if (result.fatal) {
      sessionLost = true;
      break;
    }

    if (result.ok && result.docs.length) {
      subjects[slug] = result.docs;
      sessionStorage.setItem(STORE_KEY, JSON.stringify(subjects));
      found++;
      streak = 0;
    } else {
      failures.push({
        slug,
        reason: result.ok ? "aucun pdf sur la page" : result.reason,
      });
      streak = result.ok || !result.retryable ? 0 : streak + 1;
    }

    done++;
    render();

    if (streak >= ABORT_AFTER) {
      alert(
        ABORT_AFTER +
          " échecs serveur consécutifs malgré les tentatives — collecte " +
          "interrompue.\n\nLes résultats déjà obtenus sont exportés, et " +
          "relancer le collecteur reprendra où il s'est arrêté."
      );
      break;
    }

    await sleep(DELAY_MS);
  }

  if (sessionLost) {
    alert(
      "Session intra expirée. Reconnecte-toi, puis relance le collecteur : " +
        "il reprendra où il s'est arrêté."
    );
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    source: "projects.intra.42.fr",
    requested: SLUGS.length,
    resolved: Object.keys(subjects).length,
    subjects,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "subjects.json";
  a.click();
  URL.revokeObjectURL(a.href);

  if (failures.length) console.table(failures);
  console.info(
    "ft_holy — repartir de zéro : sessionStorage.removeItem('" + STORE_KEY + "')"
  );

  $current.textContent = "subjects.json téléchargé";
  $stats.textContent =
    payload.resolved + " sujets · " + failures.length + " non résolus (console)";
  const $stop = panel.querySelector("#fh-stop");
  $stop.textContent = "Fermer";
  $stop.onclick = () => panel.remove();
})();
