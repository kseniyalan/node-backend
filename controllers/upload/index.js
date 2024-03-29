const fs = require('fs');
const util = require('util');
const config = require('../../config');
const path = require('path');
const UploadModule = require('./modules');

const ApiModels = {
  image: require('../../api-models/image'),
};

const { Image } = require('../../dao');

const fsUnlink = util.promisify(fs.unlink);

exports.Upload = async (ctx) => {
  const files = ctx.request.files;
  let image = {};

  if (!files) {
    return Error(ctx, 400, 'No files found');
  }

  for (let key in files) {
    if (key !== 'image') await fsUnlink(files[key].path);
  }

  if (!files.image) {
    return Error(ctx, 400, 'Failed to get file "image"');
  }
  files.image.name = files.image.path.split('_')[1];

  try {
    const {
      originalOrientation,
      meta,
      previewBuffer,
    } = await UploadModule.HandleImage({ files: files });

    image = {
      height:
        originalOrientation && originalOrientation > 4
          ? meta.width
          : meta.height,
      width:
        originalOrientation && originalOrientation > 4
          ? meta.height
          : meta.width,
      preview: `data:image/jpeg;base64,${previewBuffer.toString('base64')}`,
      src: `${config.static_directory}/${config.temp_directory}/${files.image.name}`
    };

  } catch (err) {
      console.log(err);
      await fsUnlink(files.image.path);
    return Error(ctx, 400, 'Failed to process file "image"');
  }

  image = await Image.create(image);

  return (ctx.body = ApiModels.image(ctx, image));
};
