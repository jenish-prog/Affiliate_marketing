const links = [
  'https://brandlogos.net/wp-content/uploads/2022/01/nykaa-logo-brandlogos.net_.png',
  'https://brandlogos.net/wp-content/uploads/2022/10/croma-logo_brandlogos.net_lts51.png',
  'https://brandlogos.net/wp-content/uploads/2022/10/pepperfry-logo_brandlogos.net_536v2.png'
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
