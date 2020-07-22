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
