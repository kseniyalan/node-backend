const config = require('../config');
const path = require('path');

const transform = (ctx, document) => {
  if (!document) return null;

  return {
    id: document.id,
    url: document.src,
    width: document.width,
    height: document.height,
    preview: document.preview,
  };
};

module.exports = transform;