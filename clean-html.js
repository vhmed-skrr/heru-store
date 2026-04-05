const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (!dirPath.includes('node_modules') && !dirPath.includes('.git')) {
        walkDir(dirPath, callback);
      }
    } else if (dirPath.endsWith('.html')) {
        callback(dirPath);
    }
  });
}

const dir = 'd:\\web\\heru-store';
let count = 0;

walkDir(dir, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // We want to remove the literal string \n (backslash followed by n)
  // that appears between tags: e.g. >AR\n</button>
  // A safe way is to replace it iteratively as long as it's outside tags,
  // but simpler: replace /\>([^<]*)(\\n)+([^<]*)\</g with />$1$3</
  
  // Since multiple \n can be present, we can just replace >...<
  content = content.replace(/>([^<]+)</g, (match, inner) => {
      // remove literal '\n' which in string is '\\n'
      if (inner.includes('\\n')) {
          return '>' + inner.split('\\n').join('').trim() + '<';
      }
      return match;
  });

  if (content !== original) {
      fs.writeFileSync(filePath, content);
      count++;
      console.log('Cleaned:', filePath);
  }
});

console.log('Files cleaned:', count);
