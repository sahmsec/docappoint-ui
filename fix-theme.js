const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f === 'node_modules' || f === '.next' || f === '.git') return;
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const replacements = [
  // -- Cards, modals, containers that use bg-white --
  // Standalone bg-white (not bg-white/XX patterns which are intentional opacity)
  [/\bbg-white(?!\/)\b/g, 'bg-bg-card'],
  
  // bg-white/85, bg-white/80, bg-white/60 in card contexts
  [/\bbg-white\/85\b/g, 'bg-bg-card/85'],
  [/\bbg-white\/80\b/g, 'bg-bg-card/80'],
  [/\bbg-white\/60\b/g, 'bg-bg-card/60'],
  
  // -- Borders --
  [/\bborder-\[#EAF7E8\]/g, 'border-border'],
  [/\bborder-slate-100\b/g, 'border-border'],
  [/\bborder-slate-200\b/g, 'border-border'],
  
  // -- Text colors (slate → theme-aware) --
  [/\btext-slate-300\b/g, 'text-text-secondary'],
  [/\btext-slate-400\b/g, 'text-text-secondary'],
  [/\btext-slate-500\b/g, 'text-text-secondary'],
  [/\btext-slate-600\b/g, 'text-text-secondary'],
  
  // -- Backgrounds --
  [/\bbg-slate-50\b/g, 'bg-bg-main'],
  [/\bbg-slate-100\b/g, 'bg-bg-soft/30'],
  
  // -- Hover states --
  [/\bhover:bg-slate-100\b/g, 'hover:bg-bg-soft/30'],
  
  // -- #EAF7E8 hex (a lighter mint green) → bg-soft --
  [/\bbg-\[#EAF7E8\]/g, 'bg-bg-soft'],
  [/\bhover:bg-\[#EAF7E8\]/g, 'hover:bg-bg-soft'],
  
  // -- yellow-50 background for rating badges --
  [/\bbg-yellow-50\b/g, 'bg-yellow-500/10'],
  
  // -- text-black used in textarea --
  [/\btext-black\b/g, 'text-text-main'],
];

let totalChanges = 0;
const srcDir = path.join(__dirname, 'src');

walkDir(srcDir, (filePath) => {
  if (!/\.(jsx|js)$/.test(filePath)) return;
  // Skip the theme-context file itself
  if (filePath.includes('theme-context')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let fileChanges = 0;
  
  for (const [regex, replacement] of replacements) {
    const matches = content.match(regex);
    if (matches) {
      fileChanges += matches.length;
      content = content.replace(regex, replacement);
    }
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${path.relative(__dirname, filePath)}: ${fileChanges} replacements`);
    totalChanges += fileChanges;
  }
});

console.log(`\nDone! Total changes: ${totalChanges}`);
