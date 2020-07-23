const Router = require('koa-router');
const koaBody = require('koa-body');

const FruitsController = require(`../controllers/fruits`);

const router = new Router({
  prefix: `/api`,
});

//Получение списка фруктов или одного фрукта
router.get('/fruits', FruitsController.GetFruitsList);
router.get('/fruits/:id', FruitsController.GetSingleFruit);

//Обновить, фрукт съеден или нет
router.patch('/fruits/:id', koaBody(), FruitsController.PatchSingleFruit);

//Отредактировать фрукт
router.put('/fruits/:id', koaBody(), FruitsController.PutFruit);

module.exports = router;
