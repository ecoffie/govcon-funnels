const sharp = require('/Users/kkii/Documents/Cursor/govcon-funnels-main/node_modules/sharp');
const dir = '/Users/kkii/Documents/Cursor/govcon-funnels-main/govcon-giants-site/public/episodes/';
(async () => {
  const blue = [], card = [];
  for (let i = 0; i < 150; i++) {
    const f = `${dir}ep-${String(i).padStart(3, '0')}.jpg`;
    const st = await sharp(f).stats();
    const [r, g, b] = st.channels.map(c => c.mean);
    // generic blue podcast graphic vs dark template card
    if (b > r * 1.5 && b > 70) blue.push(i); else card.push(i);
  }
  console.log('generic blue (Eric solo):', blue.length);
  console.log('template cards (guests):', card.length, card.join(','));
})();
