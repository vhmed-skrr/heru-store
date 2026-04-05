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

const newSocials = `<div class="footer-socials">
  <a id="social-instagram"
     data-social="instagram"
     href="#" 
     target="_blank" 
     rel="noopener noreferrer"
     aria-label="Instagram"
     style="display:none">
    <svg width="20" height="20" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" 
              stroke="none"/>
    </svg>
  </a>
  
  <a id="social-tiktok"
     data-social="tiktok"
     href="#"
     target="_blank"
     rel="noopener noreferrer"
     aria-label="TikTok"
     style="display:none">
    <svg width="20" height="20" viewBox="0 0 24 24"
         fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67
               a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89
               2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01
               a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34
               6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34
               V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76
               a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  </a>
  
  <a id="social-facebook"
     data-social="facebook"
     href="#"
     target="_blank"
     rel="noopener noreferrer"
     aria-label="Facebook"
     style="display:none">
    <svg width="20" height="20" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7
               a1 1 0 0 1 1-1h3z"/>
    </svg>
  </a>
</div>`;

for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Find existing .social-links and replace
  // It could be <div class="social-links"> ... </div>
  const match = content.match(/<div class="social-links">[\s\S]*?<\/div>/);
  if (match && match[0].includes('data-social="instagram"')) {
      content = content.replace(match[0], newSocials);
      changed = true;
  } else if (content.includes('class="footer-bottom"') && !content.includes('class="footer-socials"')) {
      // In case it wasn't named social-links or failed previously. But we updated them all.
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated: ' + file);
  }
}
