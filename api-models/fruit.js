const image = require('./image');

const transform = (ctx, document) => {
  if (!document) return null;

  return {
    id: document.id,
    name: document.name,
    amount: document.amount,
    eaten: document.eaten,
    created_at: new Date(document.created_at),
    avatar: image(ctx, document.Image),
  };
};

module.exports = transform;