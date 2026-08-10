const sharp = require('/Users/kkii/Documents/Cursor/govcon-funnels-main/node_modules/sharp');
const fs = require('fs');
const s = fs.readFileSync('/Users/kkii/Documents/Cursor/govcon-funnels-main/govcon-giants-site/src/data/episodes.ts', 'utf8');
const imgs = [...s.matchAll(/"image": "([^"]+)"/g)].map(m => m[1]);
const out = '/Users/kkii/Documents/Cursor/govcon-funnels-main/govcon-giants-site/public/episodes/';
(async () => {
  let ok = 0, fail = [];
  for (let i = 0; i < imgs.length; i++) {
    const name = `ep-${String(i).padStart(3, '0')}.jpg`;
    try {
      const resp = await fetch(imgs[i]);
      if (!resp.ok) throw new Error('http ' + resp.status);
      const buf = Buffer.from(await resp.arrayBuffer());
      await sharp(buf).rotate()
        .resize(700, 700, { fit: 'cover', position: sharp.strategy.attention })
        .jpeg({ quality: 80 }).toFile(out + name);
      ok++;
    } catch (e) { fail.push(i + ': ' + e.message); }
  }
  console.log('ok:', ok, 'fail:', fail.length, fail.slice(0, 5));
})();
