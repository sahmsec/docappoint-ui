const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content
      .replace(/\[#F4FAF2\]/gi, 'bg-main')
      .replace(/\[#DDF1D8\]/gi, 'bg-soft')
      .replace(/\[#FFFFFF\]/gi, 'bg-card')
      .replace(/\[#11281F\]/gi, 'primary')
      .replace(/\[#111111\]/gi, 'text-main')
      .replace(/\[#6B7280\]/gi, 'text-secondary')
      .replace(/\[#4E9B63\]/gi, 'accent')
      .replace(/\[#E5E7EB\]/gi, 'border')
      .replace(/\[#F7F7F4\]/gi, 'bg-main')
      // Also handle raw hex codes used in inline styles and props!
      .replace(/#F4FAF2/gi, 'var(--bg-main)')
      .replace(/#DDF1D8/gi, 'var(--bg-soft)')
      .replace(/#FFFFFF/gi, 'var(--bg-card)')
      .replace(/#11281F/gi, 'var(--primary)')
      .replace(/#111111/gi, 'var(--text-main)')
      .replace(/#6B7280/gi, 'var(--text-secondary)')
      .replace(/#4E9B63/gi, 'var(--accent)')
      .replace(/#E5E7EB/gi, 'var(--border)')
      .replace(/#F7F7F4/gi, 'var(--bg-main)');
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
