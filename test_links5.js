const links = [
  'https://upload.wikimedia.org/wikipedia/commons/e/ae/Croma_Logo_1.png',
  'https://upload.wikimedia.org/wikipedia/en/8/8b/Nykaa_logo.svg',
  'https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Nykaa_logo.svg/1024px-Nykaa_logo.svg.png',
  'https://brandlogos.net/wp-content/uploads/2021/11/nykaa-logo.png',
  'https://iconape.com/wp-content/png_logo_vector/nykaa-logo.png',
  'https://upload.wikimedia.org/wikipedia/commons/c/ce/Pepperfry_logo.png'
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
