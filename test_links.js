const https = require('https');
const links = [
  'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  'https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png',
  'https://cdn.iconscout.com/icon/free/png-256/free-myntra-logo-icon-download-in-svg-png-gif-file-formats--shopping-ecommerce-brand-pack-logos-icons-2709180.png?f=webp&w=256',
  'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/ajio-logo-icon.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Tata_CLiQ_logo.svg/1200px-Tata_CLiQ_logo.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Nykaa_logo.svg/2000px-Nykaa_logo.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/e/e1/Croma_Logo.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Boat_Logo.png/1200px-Boat_Logo.png',
  'https://upload.wikimedia.org/wikipedia/commons/f/fe/Firstcry_logo.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Reliance_Digital_Logo.svg/2560px-Reliance_Digital_Logo.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Pepperfry_logo.png/800px-Pepperfry_logo.png'
];

links.forEach(urlStr => {
  try {
    let u = new URL(urlStr);
    let req = https.get({
      hostname: u.hostname,
      path: u.pathname + u.search,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (res) => {
      console.log(u.hostname + u.pathname + ': ' + res.statusCode);
    }).on('error', (e) => {
      console.log(u.hostname + u.pathname + ': ERROR ' + e.message);
    });
  } catch(e) {}
});
