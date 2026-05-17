const sanitizeHtml = require('sanitize-html');

const html = `<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparaison cadre légal" style="max-width:100%;background:#fafafa;border-radius:8px;padding:12px;display:block;margin:0 auto;"></svg>`;

const result = sanitizeHtml(html, {
  allowedTags: ['svg'],
  allowedAttributes: {
    'svg': ['viewBox', 'xmlns', 'role', 'aria-label', 'style'],
  },
  allowedStyles: false
});

console.log('Result:', result);
