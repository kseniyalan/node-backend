const { Fruit } = require('../../dao');
const FruitModules = require('./modules');

const ApiModels = {
  fruitsList: require('../../api-models/fruitsList'),
};

exports.GetFruitsList = async (ctx) => {
  const {
    fruitsOrderQuery,
    fruitsWhereQuery,
    page,
    limit,
  } = await FruitModules.GetFruitsComposeQuery(ctx.request.query);

  const fruits = await Fruit.findAll({ //response
    where: fruitsWhereQuery,
    order: fruitsOrderQuery,
    limit: limit,
    offset: limit * (page - 1),
  });

  const totalFruitsCount = await Fruit.count({
    where: fruitsWhereQuery,
  });

  return (ctx.body = {
    total: totalFruitsCount,
    fruits: fruits.map((doc) => ApiModels.fruitsList(ctx, doc)),
  });
};
