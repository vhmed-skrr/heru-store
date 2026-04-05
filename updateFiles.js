const fs = require('fs');
const path = require('path');
const dirs = ['d:/web/heru-store', 'd:/web/heru-store/admin'];
let files = [];
dirs.forEach(d => {
  const items = fs.readdirSync(d);
  items.forEach(i => {
    if (i.endsWith('.html')) files.push(path.join(d, i));
  });
});

const socialDiv = `                <div class="social-links">
                    <a href="#" data-social="instagram" target="_blank" rel="noopener"><i data-lucide="instagram"></i></a>
                    <a href="#" data-social="tiktok" target="_blank" rel="noopener"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg></a>
                    <a href="#" data-social="facebook" target="_blank" rel="noopener"><i data-lucide="facebook"></i></a>
                </div>`;

for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Inject <script src="/data.js"></script> into <head>
  if (!content.includes('/data.js') && content.includes('<head>')) {
    content = content.replace('<head>', '<head>\n    <script src="/data.js"></script>');
    changed = true;
  }

  // 2. Add social links if not present in the footer
  if (content.includes('class="footer-bottom"') && !content.includes('data-social')) {
      const res = content.replace(/(<div class="footer-bottom">[\s\S]*?)(<\/div>\s*<\/div>\s*<\/footer>)/i, `$1\n${socialDiv}\n            $2`);
      if (res !== content) {
          content = res;
          changed = true;
      }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated: ' + file);
  }
}
