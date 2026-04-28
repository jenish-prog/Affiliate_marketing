const links = [
  'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  'https://brandlogos.net/wp-content/uploads/2020/11/flipkart-logo.png',
  'https://cdn.iconscout.com/icon/free/png-256/myntra-2709168-2249158.png',
  'https://assets.ajio.com/static/img/Ajio-Logo.svg',
  'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/nykaa-logo-icon.png',
  'https://w7.pngwing.com/pngs/398/824/png-transparent-croma-logo.png'
];

async function testLinks() {
  for (const link of links) {
    try {
      const resp = await fetch(link, { method: 'HEAD' });
      console.log(link, resp.status);
    } catch(e) {
      console.log(link, 'Error:', e.message);
    }
  }
}
testLinks();
