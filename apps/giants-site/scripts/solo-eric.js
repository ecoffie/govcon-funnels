const sharp = require('/Users/kkii/Documents/Cursor/govcon-funnels-main/node_modules/sharp');
const dir = '/Users/kkii/Documents/Cursor/govcon-funnels-main/govcon-giants-site/public/episodes/';
const cards = new Set([1,8,15,22,29,36,43,50,57,64,71,78,85,92,99,106,113,120,127,138,143,148]);
(async () => {
  const eric = await sharp('/Users/kkii/Documents/Cursor/govcon-funnels-main/govcon-giants-site/public/eric-portrait.png')
    .resize(700, 700, { fit: 'cover' }).jpeg({ quality: 82 }).toBuffer();
  for (let i = 0; i < 150; i++) {
    if (cards.has(i)) continue;
    await sharp(eric).toFile(`${dir}ep-${String(i).padStart(3, '0')}.jpg`);
  }
  console.log('solo episodes set to Eric photo');
})();
