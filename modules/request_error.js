module.exports = function (ctx, code, error_text) {
  ctx.status = code;
  ctx.body = {
    error: error_text,
  };

  return ctx;
};
