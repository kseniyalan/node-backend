const config = require('../config');

const transform = (ctx, document) => {
  if (!document) return null;

  return {
    id: document.id,
    url: `${config.host}/${document.src}`,
    width: document.width,
    height: document.height,
    preview: document.preview,
  };
};

module.exports = transform;