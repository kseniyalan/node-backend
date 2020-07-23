const Router = require('koa-router');
const koaBody = require('koa-body');

const FruitsController = require('../controllers/fruits');
const AuthMiddleware = require('../controllers/middlewares/middleware');

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

module.exports = router;
