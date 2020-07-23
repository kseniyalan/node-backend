const { Fruit } = require('../../dao');
const FruitModules = require('./modules');
const Error = require('../../modules/request_error');

const ApiModels = {
  fruitsList: require('../../api-models/fruitsList'),
  fruit: require('../../api-models/fruit'),
};

//Получение списка фруктов
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

//Получение одного фрукта по ID
exports.GetSingleFruit = async (ctx) => {
  const fruitId = Number.parseInt(ctx.params.id) || null;

  if (!fruitId) {
    return Error(ctx, 400, 'Не удалось получить id фрукта');
  }

  let fruitResponse = await Fruit.findOne({
    where: {
      id: fruitId,
    },
  });

  if (!fruitResponse) {
    return Error(ctx, 404, 'Фрукт не найден');
  }

  return (ctx.body = ApiModels.fruit(ctx, fruitResponse));
};

//Обновить отдельные свойства одного фрукта
exports.PatchSingleFruit = async (ctx) => {
  const fruitId = Number.parseInt(ctx.params.id) || null;

  if (!fruitId) {
    return Error(ctx, 400, 'Не удалось получить id фрукта');
  }

  const { eaten } = ctx.request.body;

  if (![true, false].includes(eaten)) {
    return Error(ctx, 400, 'Не указано состояние фрукта');
  }

  let fruitResponse = await Poll.findOne({
    where: {
      id: fruitId,
    },
  });

  if (!fruitResponse) {
    return Error(ctx, 404, 'Фрукт не найден');
  }

  fruitResponse.eaten = eaten;

  await fruitResponse.save();

  return (ctx.body = ApiModels.fruit(ctx, fruitResponse));
};
