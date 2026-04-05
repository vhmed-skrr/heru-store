const fs = require('fs');
let code = fs.readFileSync('d:/web/heru-store/script.js', 'utf8');

// Unescape \` to `
code = code.replace(/\\`/g, '`');

// Unescape \${ to ${
code = code.replace(/\\\$\{/g, '${');

fs.writeFileSync('d:/web/heru-store/script.js', code, 'utf8');
console.log('Unescaped script.js.');
