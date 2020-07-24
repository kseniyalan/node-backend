
const ApiModels = {
  image: require('../../api-models/image'),
};


exports.Upload = async (ctx) => {
  const files = ctx.request.files;
  let image = {};
  return (ctx.body = ApiModels.image(ctx, image));
};
