const links = [
  'https://brandlogos.net/wp-content/uploads/2021/11/croma-logo.png',
  'https://brandlogos.net/wp-content/uploads/2016/11/pepperfry-logo.png',
  'https://iconape.com/wp-content/png_logo_vector/croma-logo.png',
  'https://iconape.com/wp-content/png_logo_vector/pepperfry-logo.png',
  'https://iconape.com/wp-content/png_logo_vector/reliance-digital.png'
];
async function testLinks() {
  for (const link of links) {
    try {
      const resp = await fetch(link, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
      console.log(link, resp.status);
    } catch(e) {
      console.log(link, 'Error:', e.message);
    }
  }
}
testLinks();
