const fs = require('fs');
let code = fs.readFileSync('d:/web/heru-store/script.js', 'utf8');

// Strip redundant data declarations
code = code.replace(/const\s+DEFAULT_CATEGORIES\s*=\s*\[[\s\S]*?\];/g, '/* DEFAULT_CATEGORIES REMOVED */');
code = code.replace(/const\s+DEFAULT_STORE_REVIEWS\s*=\s*\[[\s\S]*?\];/g, '/* DEFAULT_STORE_REVIEWS REMOVED */');
code = code.replace(/const\s+DEFAULT_PRODUCTS\s*=\s*\[[\s\S]*?\];/g, '/* DEFAULT_PRODUCTS REMOVED */');

code = code.replace(/window\.PRODUCTS\s*=\s*JSON\.parse[^;]+;/g, '/* window.PRODUCTS INIT REMOVED */');
code = code.replace(/if\s*\(\!localStorage\.getItem\('heru_categories'\)\)\s*\{[\s\S]*?\}/g, '/* cat init removed */');
code = code.replace(/if\s*\(\!localStorage\.getItem\('heru_store_reviews'\)\)\s*\{[\s\S]*?\}/g, '/* store rev init removed */');
code = code.replace(/if\s*\(\!localStorage\.getItem\('heru_products'\)\)\s*\{[\s\S]*?\}/g, '/* prod init removed */');

// Strip redundant cart constants
code = code.replace(/const\s+getCart\s*=\s*\(\)\s*=>\s*\{[\s\S]*?\};/g, '/* getCart REMOVED */');
code = code.replace(/const\s+saveCart\s*=\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\};/g, '/* saveCart REMOVED */');
code = code.replace(/const\s+addToCart\s*=\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\};/g, '/* addToCart REMOVED */');
code = code.replace(/const\s+removeFromCart\s*=\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\};/g, '/* removeFromCart REMOVED */');
code = code.replace(/const\s+updateQuantity\s*=\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\};/g, '/* updateQuantity REMOVED */');
code = code.replace(/const\s+clearCart\s*=\s*\(\)\s*=>\s*\{[\s\S]*?\};/g, '/* clearCart REMOVED */');
code = code.replace(/const\s+getCartCount\s*=\s*\(\)\s*=>\s*\{[\s\S]*?\};/g, '/* getCartCount REMOVED */');
code = code.replace(/const\s+getCartSubtotal\s*=\s*\(\)\s*=>\s*\{[\s\S]*?\};/g, '/* getCartSubtotal REMOVED */');

// Replace PRODUCTS array iterations with getProducts() logic globally
code = code.replace(/\bwindow\.PRODUCTS\b/g, 'getProducts()');
code = code.replace(/\bPRODUCTS\.filter/g, 'getProducts().filter');
code = code.replace(/\bPRODUCTS\.find/g, 'getProducts().find');
code = code.replace(/\bPRODUCTS\.forEach/g, 'getProducts().forEach');
code = code.replace(/\bPRODUCTS\.length/g, 'getProducts().length');
code = code.replace(/\bPRODUCTS\.map/g, 'getProducts().map');
code = code.replace(/\bPRODUCTS\.slice/g, 'getProducts().slice');
code = code.replace(/ PRODUCTS /g, ' getProducts() ');

// Fix HTML string templates calling addToCart('${pStr}') -> addToCart(getProductById('${p.id}'))
// Wait, looking at how pStr was passed: 'addToCart(\\'${pStr}\\')' maybe?
code = code.replace(/onclick="addToCart\('\$\{pStr\}'\)"/g, 'onclick="addToCart(getProductById(\'${p.id}\'))"');
code = code.replace(/onclick='addToCart\(`\$\{pStr\}`\)'/g, 'onclick="addToCart(getProductById(\'${p.id}\'))"');

fs.writeFileSync('d:/web/heru-store/script.js', code, 'utf8');
console.log('script.js safely refactored.');
