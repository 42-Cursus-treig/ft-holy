"""
Pousse radialement tous les nœuds de projectDB.js pour accompagner
l'agrandissement du disque "Tronc Commun".

    python3 push-radial.py src/data/projectDB.js 150
"""
import re, math, sys

path = sys.argv[1] if len(sys.argv) > 1 else "src/data/projectDB.js"
delta = float(sys.argv[2]) if len(sys.argv) > 2 else 150.0

src = open(path).read()

trunk = re.search(
    r'"tronc-commun":\s*\{(.*?)\n    \}', src, re.S
)
if not trunk:
    sys.exit('"tronc-commun" introuvable — vérifie le fichier.')
tsize = int(re.search(r'size:\s*(\d+)', trunk.group(1)).group(1))
tpos = re.search(r'position:\s*\{\s*x:\s*(-?\d+),\s*y:\s*(-?\d+)', trunk.group(1))
CX = int(tpos.group(1)) + tsize / 2
CY = int(tpos.group(2)) + tsize / 2
print(f"Centre du disque : ({CX:.0f}, {CY:.0f}) — rayon {tsize/2:.0f} → {tsize/2+delta:.0f}")

NODE_SIZE = 60

moved = 0

TRUNK_SPAN = (trunk.start(), trunk.end())

def replace(match):
    global moved
    head, x, y = match.group(1), int(match.group(2)), int(match.group(3))
    if TRUNK_SPAN[0] <= match.start() < TRUNK_SPAN[1]:
        return match.group(0)
    cx, cy = x + NODE_SIZE / 2, y + NODE_SIZE / 2
    dx, dy = cx - CX, cy - CY
    d = math.hypot(dx, dy)
    if d < 1:
        return match.group(0)
    ncx, ncy = CX + dx / d * (d + delta), CY + dy / d * (d + delta)
    moved += 1
    return f"{head}x: {round(ncx - NODE_SIZE / 2)}, y: {round(ncy - NODE_SIZE / 2)}"

out = re.sub(r'(position:\s*\{\s*)x:\s*(-?\d+),\s*y:\s*(-?\d+)', replace, src)

new_size = round(tsize + 2 * delta)
out = out.replace(f"size: {tsize},", f"size: {new_size},", 1)
out = out.replace(
    f"position: {{ x: {tpos.group(1)}, y: {tpos.group(2)} }}",
    f"position: {{ x: {round(CX - new_size / 2)}, y: {round(CY - new_size / 2)} }}",
    1,
)

dest = path + ".new"
open(dest, "w").write(out)
print(f"{moved} nœuds poussés de +{delta:.0f}px — disque {tsize} → {round(tsize + 2*delta)}")
print(f"Écrit dans {dest} (diff avant de remplacer)")
