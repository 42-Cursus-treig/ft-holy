import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const { FT_SLUGS } = await import(
  new URL("../src/data/ft42.js", import.meta.url).href
);

const slugs = [...new Set(Object.values(FT_SLUGS).flat().filter(Boolean))].sort();

if (!slugs.length) {
  console.error("Aucun slug trouvé dans FT_SLUGS — génération annulée.");
  process.exit(1);
}

const source = await readFile(resolve(here, "collect-subjects.js"), "utf8");

const MARKER = /^(\s*const SLUGS = )__SLUGS__;$/m;
const hits = source.match(new RegExp(MARKER.source, "gm")) || [];

if (hits.length !== 1) {
  console.error(
    `Attendu exactement 1 déclaration « const SLUGS = __SLUGS__; », trouvé ${hits.length}.`
  );
  process.exit(1);
}

const filled = source.replace(MARKER, `$1${JSON.stringify(slugs)};`);

if (filled.includes("__SLUGS__;")) {
  console.error("Le marqueur subsiste après remplacement — génération annulée.");
  process.exit(1);
}

const bookmarklet = "javascript:" + encodeURIComponent(filled);

await writeFile(resolve(here, "bookmarklet.txt"), bookmarklet + "\n", "utf8");

await writeFile(resolve(here, "console-snippet.js"), filled, "utf8");

const page = `<!doctype html>
<html lang="fr">
<meta charset="utf-8">
<title>ft_holy — installer le collecteur</title>
<style>
  body { margin:0; min-height:100vh; display:grid; place-items:center;
         background:#0a0c14; color:#e8e3d3;
         font:15px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace; }
  main { width:min(560px,90vw); }
  .eyebrow { font-size:10px; letter-spacing:.18em; text-transform:uppercase;
             color:#d4af37; margin-bottom:8px; }
  h1 { font-size:22px; font-weight:600; margin:0 0 20px; }
  ol { padding-left:20px; color:#8a8676; }
  li { margin-bottom:10px; }
  .grab { display:inline-block; margin:18px 0; padding:11px 22px;
          background:transparent; color:#d4af37; text-decoration:none;
          border:1px solid rgba(212,175,55,.4); border-radius:2px;
          cursor:grab; }
  .grab:active { cursor:grabbing; }
  button { padding:9px 16px; background:transparent; color:#e8e3d3;
           border:1px solid rgba(232,227,211,.25); border-radius:2px;
           cursor:pointer; font:inherit; }
  #ok { color:#d4af37; margin-left:10px; font-size:13px; }
</style>
<main>
  <div class="eyebrow">ft_holy</div>
  <h1>Installer le collecteur de sujets</h1>
  <ol>
    <li>Affiche ta barre de favoris (Ctrl+Maj+B).</li>
    <li>Glisse le lien ci-dessous dessus.</li>
    <li>Ouvre projects.intra.42.fr en étant connecté, puis clique le favori.</li>
  </ol>
  <a class="grab" href="${bookmarklet}">ft_holy — sujets</a>
  <p style="color:#8a8676;font-size:13px">
    Glisser ne marche pas ? Copie le lien&nbsp;:
    <button id="copy">Copier</button><span id="ok"></span>
  </p>
</main>
<script>
  document.getElementById("copy").onclick = async () => {
    const url = document.querySelector(".grab").getAttribute("href");
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const t = document.createElement("textarea");
      t.value = url; document.body.appendChild(t); t.select();
      document.execCommand("copy"); t.remove();
    }
    document.getElementById("ok").textContent = "copié";
  };
</script>
</html>
`;

await writeFile(resolve(here, "bookmarklet.html"), page, "utf8");

const kb = (bookmarklet.length / 1024).toFixed(1);
console.log(`${slugs.length} slugs · bookmarklet de ${kb} ko`);
console.log("→ tools/bookmarklet.txt");
console.log("→ tools/bookmarklet.html  (ouvre ce fichier dans le navigateur)");
console.log("→ tools/console-snippet.js  (repli : à coller dans la console)");
if (bookmarklet.length > 60000) {
  console.warn(
    "Le marque-page dépasse 60 ko : certains navigateurs peuvent le tronquer."
  );
}
