const fs = require('fs');
const lines = fs.readFileSync('d:/web/heru-store/script.js', 'utf8').split('\n');

for (let i = 1270; i <= 1360; i++) {
  if (lines[i].includes('`')) {
     console.log(`Line ${i+1}: ${lines[i]}`);
  }
}
