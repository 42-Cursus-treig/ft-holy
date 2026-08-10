/**
 * ft_holy — collecteur de sujets 42
 * ---------------------------------
 * Ce fichier est la SOURCE du bookmarklet. Ne le colle pas tel quel dans un
 * marque-page : lance `npm run build:bookmarklet`, qui injecte la liste des
 * slugs et produit tools/bookmarklet.html et tools/console-snippet.js.
 *
 * Contexte d'exécution : un onglet ouvert et connecté sur
 * https://projects.intra.42.fr. La résolution repose sur la session web de
 * l'intra (cookies), qui n'est jamais lue ni copiée — seules les pages projet
 * sont récupérées, exactement comme si tu les ouvrais à la main.
 *
 * Reprise : les résultats sont conservés dans sessionStorage. Si la collecte
 * s'interrompt, relancer le collecteur reprend là où il s'était arrêté sans
 * refaire les projets déjà résolus.
 *
 * Sortie : un fichier subjects.json téléchargé, à placer dans public/.
 */
/* eslint-disable no-undef -- le marqueur de slugs est résolu à la génération */
(async () => {
  "use strict";

  const SLUGS = ["42_collaborative_resume","42adv-fdf","42adv-fract-ol","42adv-minitalk","42adv-pipex","42adv-so_long","42cursus-42run","42cursus-42sh","42cursus-abstract-vm","42cursus-agent-smith","42cursus-avaj-launcher","42cursus-bomberman","42cursus-boot2root","42cursus-call-me-maybe","42cursus-camagru","42cursus-cloud-1","42cursus-computorv1","42cursus-computorv2","42cursus-corewar","42cursus-cub3d","42cursus-darkly","42cursus-death","42cursus-doom-nukem","42cursus-dr-quine","42cursus-drivers-and-interrupts","42cursus-dslr","42cursus-expert-system","42cursus-famine","42cursus-fdf","42cursus-filesystem","42cursus-fix-me","42cursus-fract-ol","42cursus-ft_ality","42cursus-ft_hangouts","42cursus-ft_linear_regression","42cursus-ft_linux","42cursus-ft_ls","42cursus-ft_nmap","42cursus-ft_ping","42cursus-ft_printf","42cursus-ft_script","42cursus-ft_select","42cursus-ft_shield","42cursus-ft_ssl_des","42cursus-ft_ssl_md5","42cursus-ft_ssl_rsa","42cursus-ft_traceroute","42cursus-ft_turing","42cursus-ft_vox","42cursus-get_next_line","42cursus-gomoku","42cursus-guimp","42cursus-h42n42","42cursus-humangl","42cursus-hypertube","42cursus-in-the-shadows","42cursus-kfs-1","42cursus-kfs-2","42cursus-kfs-3","42cursus-kfs-4","42cursus-kfs-5","42cursus-kfs-6","42cursus-kfs-7","42cursus-kfs-8","42cursus-kfs-9","42cursus-kfs-x","42cursus-krpsim","42cursus-lem-ipc","42cursus-lem_in","42cursus-libft","42cursus-little-penguin-1","42cursus-malloc","42cursus-matcha","42cursus-matt-daemon","42cursus-minirt","42cursus-minishell","42cursus-mod1","42cursus-multilayer-perceptron","42cursus-music-room","42cursus-n-puzzle","42cursus-nibbler","42cursus-override","42cursus-particle-system","42cursus-pestilence","42cursus-philosophers","42cursus-piscine-ocaml","42cursus-process-and-memory","42cursus-push_swap","42cursus-rag-against-the-machine","42cursus-rainfall","42cursus-red-tetris","42cursus-rt","42cursus-rubik","42cursus-scop","42cursus-shaderpixel","42cursus-snow-crash","42cursus-strace","42cursus-swifty-companion","42cursus-swifty-proteins","42cursus-swingy","42cursus-taskmaster","42cursus-total-perspective-vortex","42cursus-userspace_digressions","42cursus-war","42cursus-woody-woodpacker","42cursus-xv","42cursus-zappy","42next-born2beroot","42next-exam-rank-02","42next-exam-rank-03","42next-exam-rank-04","42next-exam-rank-05","42next-exam-rank-06","42next-push_swap","a-maze-ing","abstract_data","agent-smith","b","bgp-at-doors-of-autonomous-systems-is-simple","born2beroot","c-piscine-bsq","c-piscine-c-00","c-piscine-c-01","c-piscine-c-02","c-piscine-c-03","c-piscine-c-04","c-piscine-c-05","c-piscine-c-06","c-piscine-c-07","c-piscine-c-08","c-piscine-c-09","c-piscine-c-10","c-piscine-c-11","c-piscine-c-12","c-piscine-c-13","c-piscine-exam-00","c-piscine-exam-01","c-piscine-exam-02","c-piscine-final-exam","c-piscine-rush-00","c-piscine-rush-01","c-piscine-rush-02","c-piscine-shell-00","c-piscine-shell-01","call-me-maybe","cc1","codexion","cpp-module-00","cpp-module-01","cpp-module-02","cpp-module-03","cpp-module-04","cpp-module-05","cpp-module-06","cpp-module-07","cpp-module-08","cpp-module-09","cub3d","exam-rank-02","exam-rank-03","exam-rank-04","exam-rank-05","exam-rank-06","fly-in","freddie-mercury","ft_irc","ft_kalman","ft_lex","ft_lgtm","ft_malcolm","ft_minecraft","ft_newton","ft_transcendence","ft_yacc","ftl_quantum","inception","inception-of-context","inception-of-things","inception-of-wisdom","leaffliction","learn2slither","libasm","libftpp","matrix","minirt","minishell-d972f7c4-dbec-4811-b575-c967db09f1f1","minitalk","netpractice","nm","old-irc","old-philosophers","open-project","pac-man","peace_break","pipex","piscine-data-science","piscine-django","python-module-00","python-module-01","python-module-02","python-module-03","python-module-04","python-module-05","python-module-06","python-module-07","python-module-08","python-module-09","python-module-10","rag-against-the-machine","ready-set-boole","retroemu","so_long","supercharge","the-answer-protocol","tinky-winkey","tokenizeart","tokenizer","unleashthebox","very_real_engine","webserv"];

  const DELAY_MS = 700;               // rythme de croisière
  const RETRY_BACKOFF = [2000, 5000]; // attentes avant 2e et 3e tentative
  const ABORT_AFTER = 8;              // échecs consécutifs, après retries
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

  /* ------------------------------------------------------------ état repris */

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

  /* ---------------------------------------------------------------- panneau */

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

  /* --------------------------------------------------------------- collecte */

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

  /**
   * Une tentative. Les 5xx sont réessayables (throttling probable) ; les 4xx
   * ne le sont pas — le projet n'existe pas sous ce slug, insister est inutile
   * et impoli envers l'intra.
   */
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
      // Un projet sans sujet, ou un 404, n'est pas une panne : seuls les
      // échecs serveur/réseau alimentent le compteur d'arrêt d'urgence.
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

  /* ----------------------------------------------------------------- export */

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
