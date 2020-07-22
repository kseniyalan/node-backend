const Router = require('koa-router');
//const koaBody = require('koa-body');

const FruitsController = require(`../controllers/fruits`);

const router = new Router({
  prefix: `/api`,
});

router.get('/fruits', FruitsController.GetFruitsList);

module.exports = router;
