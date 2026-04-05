const fs = require('fs');
const lines = fs.readFileSync('d:/web/heru-store/script.js', 'utf8').split('\n');

let inTemplate = false;
let toggles = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    if (line[j] === '`' && line[j-1] !== '\\') {
       inTemplate = !inTemplate;
       toggles.push({line: i+1, state: inTemplate});
    }
  }
}
toggles.filter(t => t.line > 500 && t.line <= 1400).forEach(t => console.log(`Line ${t.line}: state=${t.state}`));
