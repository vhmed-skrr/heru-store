const fs = require('fs');
const lines = fs.readFileSync('d:/web/heru-store/script.js', 'utf8').split('\n');

let inString = false;
let inTemplate = false;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    // very basic parser just for backticks
    if (line[j] === '`' && line[j-1] !== '\\') {
       inTemplate = !inTemplate;
    }
  }
  if (i >= 1340 && i <= 1360) {
      console.log(`Line ${i+1}: inTemplate=${inTemplate}`);
  }
}
