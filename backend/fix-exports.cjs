const fs = require('fs');
const path = require('path');
const files = [
  'middleware/authMiddleware.js',
  'controllers/authController.js',
  'controllers/categoryController.js',
  'controllers/enquiryController.js',
  'controllers/mediaController.js',
  'controllers/orderController.js',
  'controllers/productController.js',
  'controllers/reviewController.js'
];
files.forEach(f => {
  const fullPath = path.join(__dirname, f);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/^const (\w+) = (async \()/gm, 'export const $1 = $2');
    content = content.replace(/^const (\w+) = (\()/gm, 'export const $1 = $2');
    fs.writeFileSync(fullPath, content);
    console.log('Fixed exports for', f);
  }
});
