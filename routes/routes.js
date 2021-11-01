const Router = require('koa-router');
const koaBody = require('koa-body');
const path = require('path');
const fs = require('fs');

const AuthController = require('../controllers/auth');
const FruitsController = require('../controllers/fruits');
const UploadController = require('../controllers/upload');
const AuthMiddleware = require('../controllers/middlewares/middleware');

const config = require('../config');

const router = new Router({
  prefix: `/api`,
});

//AUTHORIZATION
router.get('/ping', AuthMiddleware, AuthController.Ping);

router.post('/auth', koaBody(), AuthController.Auth);
router.post('/auth/signup', koaBody(), AuthController.CreateManager);
router.delete('/auth', AuthMiddleware, AuthController.LogOut);
router.post('/auth/refresh', koaBody(), AuthController.RefreshToken);

//FRUITS
//Getting a list of fruits or a single fruit
router.get('/fruits', AuthMiddleware, FruitsController.GetFruitsList);
router.get('/fruits/:id', AuthMiddleware, FruitsController.GetSingleFruit);

//Refresh fruit is eaten or not
router.patch('/fruits/:id', AuthMiddleware, koaBody(), FruitsController.PatchSingleFruit);

//Edit fruit
router.put('/fruits/:id', AuthMiddleware, koaBody(), FruitsController.PutFruit);

//Create fruit
router.post('/fruits', AuthMiddleware, koaBody(), FruitsController.CreateFruit);

//Delete fruit
router.delete('/fruits/:id', AuthMiddleware, FruitsController.DeleteFruit);

//Remove fruit avatar
router.patch('/fruits/:id/image', AuthMiddleware, koaBody(), FruitsController.PatchFruitAvatar);

//PICTURES UPLOADING

//Creates a folder if it is missing
if (
  !fs.existsSync(
    path.join(__dirname, '..', config.static_directory, config.temp_directory),
  )
) {
  fs.mkdirSync(
    path.join(__dirname, '..', config.static_directory, config.temp_directory),
  );
}

//Save files to folder /static/temp
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
        config.temp_directory,
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
