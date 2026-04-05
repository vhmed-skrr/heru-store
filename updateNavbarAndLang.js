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

const headAdditions = `
<style>
/* Hide Google Translate toolbar completely */
.goog-te-banner-frame { display: none !important; }
.goog-te-menu-value { display: none !important; }
#goog-gt-tt { display: none !important; }
.goog-tooltip { display: none !important; }
body { top: 0 !important; }
.skiptranslate { display: none !important; }

/* Protect design from translation */
[data-notranslate] { 
  font-family: inherit !important; 
}
.navbar-logo { 
  font-family: inherit !important;
}

#theme-toggle-btn:hover, #lang-toggle-btn:hover {
  border-color: var(--accent) !important;
}
#lang-toggle-btn:hover {
  color: var(--accent) !important;
}
</style>

<div id="google_translate_element" style="display:none; visibility:hidden; position:absolute;"></div>
`;

const bodyAdditions = `<script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>`;

const newButtons = `
            <button id="theme-toggle-btn" 
                    onclick="toggleTheme()"
                    class="navbar-icon-btn"
                    aria-label="تبديل الوضع"
                    style="background:none; border:1px solid var(--border);
                           border-radius:8px; padding:8px;
                           cursor:pointer; color:var(--text-primary);
                           display:flex; align-items:center;
                           justify-content:center; width:38px; height:38px;
                           transition:all 200ms;">
            </button>
            <button id="lang-toggle-btn"
                    onclick="toggleLanguage()"
                    class="navbar-icon-btn"
                    style="background:none; 
                           border:1px solid var(--border);
                           border-radius:8px; 
                           padding:0 10px;
                           cursor:pointer; 
                           color:var(--text-primary);
                           font-family:'Space Grotesk',sans-serif;
                           font-size:13px; font-weight:700;
                           height:38px; min-width:38px;
                           letter-spacing:0.5px;
                           transition:all 200ms;">
              AR
            </button>`;

for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Add head dependencies
  if (!content.includes('google_translate_element')) {
      content = content.replace('</head>', headAdditions + '\n</head>');
      changed = true;
  }

  // Add body script
  if (!content.includes('element.js?cb=googleTranslateElementInit')) {
      content = content.replace('</body>', bodyAdditions + '\n</body>');
      changed = true;
  }

  // Replace old theme and language buttons if present
  if (content.includes('class="nav-actions"')) {
      // Find the inner buttons to replace, but leave cart/hamburger intact
      const matchNavbar = content.match(/(<div class="nav-actions">)([\s\S]*?)(<a href="[^"]*cart\.html|<button class="icon-btn hamburger")/);
      if (matchNavbar) {
          const replacement = matchNavbar[1] + "\\n" + newButtons + "\\n            " + matchNavbar[3];
          if (content !== content.replace(matchNavbar[0], replacement)) {
              content = content.replace(matchNavbar[0], replacement);
              changed = true;
          }
      }
  } else if (file.endsWith('admin\\index.html') || file.endsWith('admin/index.html')) {
     if (content.includes('class="admin-header"')) {
        const replacement = `<div class="admin-header">
            <h2 id="header-title" style="margin: 0; font-size: 20px;">الرئيسية</h2>
            <div class="nav-actions" style="display:flex; gap:8px;">${newButtons}</div>
        </div>`;
        const r = content.replace(/<div class="admin-header">\s*<h2 id="header-title"[^>]*>.*?<\/h2>\s*<\/div>/g, replacement);
        if (r !== content) {
           content = r;
           changed = true;
        }
     }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated: ' + file);
  }
}
