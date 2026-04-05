const fs = require('fs');
const path = require('path');

function walkDir(d) {
  let list = fs.readdirSync(d);
  let res = [];
  list.forEach(file => {
    let p = path.join(d, file);
    if(fs.statSync(p).isDirectory()) {
      if(!p.includes('node_modules') && !p.includes('.gemini')) {
        res = res.concat(walkDir(p));
      }
    } else {
      res.push(p);
    }
  });
  return res;
}

const htmlFiles = walkDir('d:/web/heru-store').filter(f => f.endsWith('.html'));
htmlFiles.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  if(!c.includes('<script src="/data.js"></script>')) {
    c = c.replace('<head>', '<head>\n    <script src="/data.js"></script>');
    fs.writeFileSync(f, c, 'utf8');
    console.log('Injected ' + f);
  }
});
