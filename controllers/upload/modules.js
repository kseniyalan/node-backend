const fs = require('fs');
const util = require('util');
const sharp = require('sharp');
const path = require('path');

const fsreadFile = util.promisify(fs.readFile);

const config = require('../../config');

exports.HandleImage = async ({ files }) => {
  const originalBuffer = await fsreadFile(files.image.path);
  const savedObject = sharp(originalBuffer);
  const meta = await savedObject.metadata();

  const originalOrientation = meta.orientation;

  //Обработка поворотов картинки
  if (originalOrientation) { 
    switch (originalOrientation) {
      case 2:
        savedObject.flip();
        break;
      case 3:
        savedObject.rotate(180);
        break;
      case 4:
        savedObject.flop();
        break;
      case 5:
        savedObject.flip().rotate(270);
        break;
      case 6:
        savedObject.rotate(90);
        break;
      case 7:
        savedObject.flip().rotate(90);
        break;
      case 8:
        savedObject.rotate(270);
    }
  }

  const previewBuffer = await savedObject
    .clone()
    .resize(config.preview_size, config.preview_size)
    .toBuffer();
  await savedObject.toFormat('jpg').quality(80).withMetadata().toFile(path.join(__dirname, '../../', config.static_directory, config.temp_directory, files.image.name));

  return {
    originalOrientation,
    meta,
    previewBuffer,
  };
};
