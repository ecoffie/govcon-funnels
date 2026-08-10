const sharp = require('/Users/kkii/Documents/Cursor/govcon-funnels-main/node_modules/sharp');
const fs = require('fs');
const s = fs.readFileSync('/Users/kkii/Documents/Cursor/govcon-funnels-main/govcon-giants-site/src/data/episodes.ts', 'utf8');
const imgs = [...s.matchAll(/"image": "([^"]+)"/g)].map(m => m[1]);
const cards = [1,8,15,22,29,36,43,50,57,64,71,78,85,92,99,106,113,120,127,138,143,148];
const out = '/Users/kkii/Documents/Cursor/govcon-funnels-main/govcon-giants-site/public/episodes/';
(async () => {
  for (const i of cards) {
    const resp = await fetch(imgs[i]);
    const buf = Buffer.from(await resp.arrayBuffer());
    const img = sharp(buf).rotate();
    const meta = await img.metadata();
    const box = {
      left: Math.round(meta.width * 0.53),
      top: Math.round(meta.height * 0.24),
      width: Math.round(meta.width * 0.42),
      height: Math.round(meta.height * 0.51),
    };
    await img.extract(box)
      .resize(700, 700, { fit: 'cover', position: sharp.strategy.attention })
      .jpeg({ quality: 82 })
      .toFile(`${out}ep-${String(i).padStart(3, '0')}.jpg`);
  }
  console.log('guest crops done:', cards.length);
})();
