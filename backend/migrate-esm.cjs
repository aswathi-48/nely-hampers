const fs = require('fs');
const path = require('path');

const directory = __dirname;

function walk(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      if (file === 'node_modules' || file.startsWith('.')) {
        if (!--pending) done(null, results);
        return;
      }
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          if (file.endsWith('.js') && file !== __filename) {
            results.push(file);
          }
          if (!--pending) done(null, results);
        }
      });
    });
  });
}

walk(directory, function(err, results) {
  if (err) throw err;
  
  results.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace: const { a, b } = require('module'); -> import { a, b } from 'module';
    content = content.replace(/const\s+(\{[\s\w,]+\})\s*=\s*require\((['"])(.*?)\2\);?/g, "import $1 from '$3';");
    
    // Replace: const a = require('module'); -> import a from 'module';
    content = content.replace(/const\s+([\w]+)\s*=\s*require\((['"])(.*?)\2\);?/g, "import $1 from '$3';");

    // Replace local imports with .js extension if missing
    // Matches: import ... from './path' OR '../path'
    content = content.replace(/from\s+(['"])(\.\/|\.\.\/)(.*?)(?!\.js)\1/g, (match, p1, p2, p3) => {
       if (!p3.endsWith('.js')) {
           return `from '${p2}${p3}.js'`;
       }
       return match;
    });

    // Replace: module.exports = ... -> export default ...
    content = content.replace(/module\.exports\s*=\s*(.*?);?/g, "export default $1;");

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Migrated:', file);
    }
  });
});
