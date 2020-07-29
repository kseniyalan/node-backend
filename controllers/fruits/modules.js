const { Op } = require('sequelize');
const { Fruit, sequelize } = require('../../dao');
const Validators = require('../../modules/validators');

exports.GetFruitsComposeQuery = async (queryData) => {
  let { page, limit, sort, order, eaten, search } = queryData;
  let fruitsOrderQuery = [], fruitsWhereQuery = {};

  page = Number.parseInt(page, 10) || 1;
  limit = Number.parseInt(limit, 10) || 30;
  order = order === '1' ? 'ASC' : 'DESC';

  if (
    ['name', 'amount'].includes(sort)
  ) {
    fruitsOrderQuery = [[sort, order]];
  } else {
    fruitsOrderQuery = [['created_at', order]];
  }

  if (Validators.isBoolean(eaten)) {
    fruitsWhereQuery.eaten = eaten;
  }

  //Поиск
  if (Validators.nonEmptyString(search) && search.length < 255) {
    search = search.match(/\S+/g).map((doc) => `%${doc}%`);
    fruitsWhereQuery.name = { [Op.iLike]: { [Op.any]: search } };
  }

  return {
    fruitsWhereQuery,
    fruitsOrderQuery,
    page,
    limit,
  };
};

exports.CreateFruit = async ({ name, amount, eaten }) => {
  const fruitId = await sequelize.transaction(async (t) => {
    let fruit = await Fruit.create(
      {
        name,
        amount,
        eaten,
        for: eaten,
      },
      {
        transaction: t,
      },
    );

    return fruit.id;
  });

  return fruitId;
};

exports.ValidateFruitData = async ({ name, amount, eaten }) => {
  let invalid_params = [];

  if (!Validators.nonEmptyString(name) || name.length > 50)
    invalid_params.push('name');
  
  if (!Validators.positiveIntNumber(amount))
    invalid_params.push('amount');

  if (!Validators.isBoolean(eaten))
    invalid_params.push('eaten');

    if (invalid_params.length > 0) {
    return {
      error: true,
      errorText: `Неверный параметр: ${invalid_params.join(', ')}`,
    };
  }

  return { name, amount, eaten, error: false };
};
