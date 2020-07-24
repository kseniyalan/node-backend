const Router = require('koa-router');
const koaBody = require('koa-body');
const path = require('path');
const fs = require('fs');

const FruitsController = require('../controllers/fruits');
const UploadController = require('../controllers/upload');
const AuthMiddleware = require('../controllers/middlewares/middleware');

const config = require('../config');

const router = new Router({
  prefix: `/api`,
});

//Получение списка фруктов или одного фрукта
router.get('/fruits', AuthMiddleware, FruitsController.GetFruitsList);
router.get('/fruits/:id', AuthMiddleware, FruitsController.GetSingleFruit);

//Обновить, фрукт съеден или нет
router.patch('/fruits/:id', AuthMiddleware, koaBody(), FruitsController.PatchSingleFruit);

//Отредактировать фрукт
router.put('/fruits/:id', AuthMiddleware, koaBody(), FruitsController.PutFruit);

//Создать фрукт
router.post('/fruits', AuthMiddleware, koaBody(), FruitsController.CreateFruit);

//Удалить фрукт
router.delete('/fruits/:id', AuthMiddleware, FruitsController.DeleteFruit);

//Загрузка картинок
//Создает папку в случае ее отсутствия
if (
  !fs.existsSync(
    path.join(__dirname, '..', config.staticDirectory, config.tempDirectory),
  )
) {
  fs.mkdirSync(
    path.join(__dirname, '..', config.staticDirectory, config.tempDirectory),
  );
}

//Сохранит файлы в папку /static/temp
router.post(
  '/files/upload',
  AuthMiddleware,
  koaBody({
    multipart: true,

    formidable: {
      uploadDir: path.join(
        __dirname,
        '..',
        config.static_directory,
        config.tempDirectory,
      ),
      keepExtensions: true,
      multiples: false,
      maxFileSize: 1024 * 1024 * config.max_file_size,
      maxFields: 1,
    },
  }),
  UploadController.Upload,
);

module.exports = router;
