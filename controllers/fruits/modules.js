const Validators = require('../../modules/validators');

exports.GetFruitsComposeQuery = async (queryData) => {
  let { page, limit, sort, order, eaten } = queryData;
  let fruitsOrderQuery = [],
    fruitsWhereQuery = {};

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

  if (eaten) {
    fruitsWhereQuery.eaten = eaten;
  }

  return {
    fruitsWhereQuery,
    fruitsOrderQuery,
    page,
    limit,
  };
};

exports.PutFruitValidateData = async ({ name, amount, eaten }) => {
  let invalid_params = [];

  if (!Validators.nonEmptyString(name) || name.length > 50)
    invalid_params.push('name');
  
  if (!Validators.positiveIntNumber(amount))
    invalid_params.push('amount');

  if (![true, false].includes(eaten))
    invalid_params.push('eaten');

    if (invalid_params.length > 0) {
    return {
      error: true,
      errorText: `Не удалось получить параметры: ${invalid_params.join(', ')}`,
    };
  }

  return { name, amount, eaten, error: false };
};
