const links = [
  'https://www.tatacliq.com/src/general/components/img/tata_cliq_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/a/ae/Nykaa_logo.svg',
  'https://www.boat-lifestyle.com/cdn/shop/files/boAt_logo_small_3067da8c-a83b-46dd-b28b-6ef1e16ccd17_small.svg',
  'https://cdn.fcglcdn.com/brainbees/images/n/fc_logo.png',
  'https://www.reliancedigital.in/build/client/images/loaders/rd_logo.svg',
  'https://ii1.pepperfry.com/assets/10b2302e-w_logo_new.svg',
  'https://www.croma.com/assets/images/croma_logo.svg',
  'https://media.croma.com/image/upload/v1637735974/Croma%20Assets/CMS/Category%20icon/Final%20icon/CromaLogo_icydju.svg'
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
