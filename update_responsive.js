const fs = require('fs');
const path = require('path');

const HTML_DIRS = [__dirname, path.join(__dirname, 'admin')];
const viewportTag = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">';

// 1. HTML files
HTML_DIRS.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        if (file.endsWith('.html')) {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Remove existing viewport meta tags
            content = content.replace(/<meta\s+name="viewport"[^>]*>\s*/gi, '');
            
            // Insert the exact tag inside <head> as the first meta tag
            const headMatch = content.match(/<head([^>]*)>/i);
            if (headMatch) {
                const insertIndex = headMatch.index + headMatch[0].length;
                content = content.substring(0, insertIndex) + '\n    ' + viewportTag + content.substring(insertIndex);
            }

            // Replace grid-cols-4 with products-grid
            content = content.replace(/class="([^"]*)grid-cols-4([^"]*)"/g, 'class="$1products-grid$2"');
            content = content.replace(/class='([^']*)grid-cols-4([^']*)'/g, 'class=\'$1products-grid$2\'');
            
            // Wait, also check if there is an explicit grid-cols-4 assignment without quotes (rare)
            // Or maybe class="grid-cols-4 something"

            fs.writeFileSync(filePath, content);
            console.log('Updated ' + filePath);
        }
    });
});

// 2. CSS updates
const cssAppend = `
/* Prevent horizontal overflow on ALL elements */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  overflow-x: hidden;
  scroll-behavior: smooth;
}

body {
  overflow-x: hidden;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

/* All images responsive by default */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Main container */
.container {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: 20px;
}

@media (max-width: 768px) {
  .container {
    padding-inline: 16px;
  }
}

@media (max-width: 480px) {
  .container {
    padding-inline: 12px;
  }
}

/* Navbar responsive */
.navbar {
  width: 100%;
  padding-inline: 20px;
}

@media (max-width: 768px) {
  .navbar {
    padding-inline: 12px;
  }
}

/* Section padding responsive */
section {
  padding-block: 60px;
}

@media (max-width: 768px) {
  section {
    padding-block: 40px;
  }
}

@media (max-width: 480px) {
  section {
    padding-block: 28px;
  }
}

/* Products grid responsive */
.products-grid, .grid-cols-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 16px !important;
  width: 100% !important;
}

@media (max-width: 1024px) {
  .products-grid, .grid-cols-4 {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

@media (max-width: 768px) {
  .products-grid, .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 12px !important;
  }
}

@media (max-width: 360px) {
  .products-grid, .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 8px !important;
  }
}

/* Hero responsive */
.hero-section, .hero, .hero-inner {
  min-height: 100vh;
  display: grid !important;
  grid-template-columns: 55% 45% !important;
  align-items: center;
  gap: 32px;
  padding-block: 80px;
}
/* WAIT, the previous .hero just used flex, let's override with grid as requested */

@media (max-width: 1024px) {
  .hero-section, .hero, .hero-inner {
    grid-template-columns: 1fr 1fr !important;
    padding-block: 60px;
  }
}

@media (max-width: 768px) {
  .hero-section, .hero, .hero-inner {
    grid-template-columns: 1fr !important;
    min-height: auto;
    padding-block: 40px;
    text-align: center;
  }
  
  .hero-visual {
    order: -1;
    max-height: 300px;
  }
  
  .hero-cta-row, .hero-ctas {
    justify-content: center !important;
  }
}

/* Product page responsive */
.product-main {
  display: grid;
  grid-template-columns: 55% 45% !important;
  gap: 40px;
  align-items: start;
}

@media (max-width: 768px) {
  .product-main {
    grid-template-columns: 1fr !important;
    gap: 24px;
  }
}

/* Cart AND CHECKOUT RESPONSIVE */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 360px !important;
  gap: 24px;
  align-items: start;
}

@media (max-width: 1024px) {
  .cart-layout {
    grid-template-columns: 1fr 300px !important;
  }
}

@media (max-width: 768px) {
  .cart-layout {
    grid-template-columns: 1fr !important;
  }
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 360px !important;
  gap: 24px;
  align-items: start;
}

@media (max-width: 768px) {
  .checkout-layout {
    grid-template-columns: 1fr !important;
  }
}

/* Admin responsive */
.admin-layout {
  display: grid;
  grid-template-columns: 240px 1fr !important;
  min-height: 100vh;
}

@media (max-width: 1024px) {
  .admin-layout {
    grid-template-columns: 200px 1fr !important;
  }
}

@media (max-width: 768px) {
  .admin-layout {
    grid-template-columns: 1fr !important;
  }
  
  .admin-sidebar {
    display: none;
  }
  
  .admin-sidebar.open {
    display: block !important;
    position: fixed;
    inset: 0;
    z-index: 200;
    width: 260px;
    background: var(--bg-secondary);
  }
}

.admin-table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.admin-table {
  min-width: 600px;
  width: 100%;
}

/* Typography RESPONSIVE */
.hero-h1 {
  font-size: clamp(36px, 6vw, 80px) !important;
  line-height: 1.1 !important;
}

.section-heading, .section-title {
  font-size: clamp(22px, 4vw, 32px) !important;
}

.product-title, .product-name {
  font-size: clamp(22px, 4vw, 32px) !important;
}

.product-price {
  font-size: clamp(28px, 5vw, 48px) !important;
}
`;

const cssPath = path.join(__dirname, 'styles.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// replace some original parts that we want to avoid interference from, or just append at the bottom
// Since wait, .hero has absolute positioning or something?
// Original hero:
// .hero { display: flex; align-items: center; overflow: hidden; }
// .hero-inner { display: flex; align-items: center; ... gap: var(--space-12); }
// .hero-text { flex: 0 0 55%; max-width: 55%; }
// .hero-visual { flex: 0 0 45%; max-width: 45%; }
// If we add grid to .hero-section (is it .hero-section or .hero?)
// the prompt says .hero-section
// let's do exactly what it says plus map to existing classes.

cssContent += '\n\n/* --- RESPONSIVE FIXES FROM SCRIPT --- */\n' + cssAppend;
fs.writeFileSync(cssPath, cssContent);
console.log('Appended to ' + cssPath);

const adminCssPath = path.join(__dirname, 'admin', 'admin.css');
if (fs.existsSync(adminCssPath)) {
    let adminCssContent = fs.readFileSync(adminCssPath, 'utf8');
    adminCssContent += '\n\n/* --- RESPONSIVE FIXES FROM SCRIPT --- */\n' + cssAppend;
    fs.writeFileSync(adminCssPath, adminCssContent);
    console.log('Appended to ' + adminCssPath);
}

