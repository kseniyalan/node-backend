const { Fruit, Image } = require('../../dao');
const FruitModules = require('./modules');
const Error = require('../../modules/request_error');
const Validators = require('../../modules/validators');

const ApiModels = {
  fruitsList: require('../../api-models/fruitsList'),
  fruit: require('../../api-models/fruit'),
};

//Getting a list of fruits + SEARCH
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
    include: [Image],
  });

  const totalFruitsCount = await Fruit.count({
    where: fruitsWhereQuery,
  });

  return (ctx.body = {
    total: totalFruitsCount,
    fruits: fruits.map((doc) => ApiModels.fruitsList(ctx, doc)),
  });
};

//Getting one fruit by ID
exports.GetSingleFruit = async (ctx) => {
  const fruitId = Number.parseInt(ctx.params.id) || null;

  if (!fruitId) {
    return Error(ctx, 400, 'Failed to get the fruit id');
  }

  let fruitResponse = await Fruit.findOne({
    where: {
      id: fruitId,
    },
    include: [Image],
  });

  if (!fruitResponse) {
    return Error(ctx, 404, 'Fruit is not found');
  }

  return (ctx.body = ApiModels.fruit(ctx, fruitResponse));
};

//Refresh properties of one fruit
exports.PatchSingleFruit = async (ctx) => {
  const fruitId = Number.parseInt(ctx.params.id) || null;

  if (!fruitId) {
    return Error(ctx, 400, 'Failed to get the fruit id');
  }

  const { eaten } = ctx.request.body;

  if (!Validators.isBoolean(eaten)) {
    return Error(ctx, 400, 'Fruit condition is not specified');
  }

  let fruitResponse = await Fruit.findOne({
    where: {
      id: fruitId,
    },
    include: [Image],
  });

  if (!fruitResponse) {
    return Error(ctx, 404, 'Fruit not found');
  }

  fruitResponse.eaten = eaten;

  await fruitResponse.save();

  return (ctx.body = ApiModels.fruit(ctx, fruitResponse));
};

//Edit fruit
exports.PutFruit = async (ctx) => {
  const fruitId = Number.parseInt(ctx.params.id) || null;

  if (!fruitId) {
    return Error(ctx, 400, 'Failed to get the fruit id');
  }

  let { name, amount, eaten, error, errorText } = await FruitModules.ValidateFruitData(ctx.request.body);

  if (error) {
    return Error(ctx, 400, errorText);
  }

  let [fruit] = await Fruit.update(
    {
      name,
      amount,
      eaten,
      for: eaten,
    },
    {
      where: {
        id: fruitId,
      },
      returning: false,
    },
  );

  if (!fruit) {
    return Error(ctx, 404, 'Fruit is not found');
  }

  let response = await Fruit.findOne({
    where: {
      id: fruitId,
    },
    include: [Image],
  });

  return (ctx.body = ApiModels.fruit(ctx, response));
};

//Create new fruit
exports.CreateFruit = async (ctx) => {
  const { name, amount, eaten, error, errorText } = await FruitModules.ValidateFruitData(ctx.request.body);

  if (error) {
    return Error(ctx, 400, errorText);
  }

  let fruitId = await FruitModules.CreateFruit({ name, amount, eaten });

  let response = await Fruit.findOne({
    where: {
      id: fruitId,
    },
  });

  return (ctx.body = ApiModels.fruit(ctx, response));
};

//Delete fruit
exports.DeleteFruit = async (ctx) => {
  const fruitId = Number.parseInt(ctx.params.id) || null;

  if (!fruitId) {
    return Error(ctx, 400, 'Failed to get the fruit id');
  }

  //Find the ID of the picture of the fruit
  let fruitResponse = await Fruit.findOne({
    where: {
      id: fruitId,
    },
    include: [Image],
  });

  if (!fruitResponse) {
    return Error(ctx, 404, 'Fruit is not found');
  }

  const fruitImageId = fruitResponse.Image && fruitResponse.Image.id;

  //Delete the picture, if exists
  if (fruitImageId !== null) {
    let fruitImageResponse = await Image.destroy({
      where: {
        id: fruitImageId,
      },
    });

    if (!fruitImageResponse) {
      return Error(ctx, 404, 'Failed to delete avatar');
    }
  }
  
  //Remove the fruit itself
  let fruitDeleteResponse = await Fruit.destroy({
    where: {
      id: fruitId,
    },
  });

  if (!fruitDeleteResponse) {
    return Error(ctx, 404, 'Fruit is not found');
  }

  return (ctx.body = fruitResponse);
};

//Fruit avatar editing
exports.PatchFruitAvatar = async (ctx) => {
  const fruitId = Number.parseInt(ctx.params.id) || null;

  if (!fruitId) {
    return Error(ctx, 400, 'Failed to get the fruit id');
  }

  const { imageId } = ctx.request.body;

  if (!Validators.positiveIntNumberOrNull(imageId)) {
    return Error(ctx, 400, 'Image ID not specified');
  }

  //Find the fruit you need
  let fruitResponse = await Fruit.findOne({
    where: {
      id: fruitId,
    },
    include: [Image],
  });

  if (!fruitResponse) {
    return Error(ctx, 404, 'Fruit is not found');
  }

  //Check if the fruit has an avatar
  const fruitImageId = fruitResponse.Image && fruitResponse.Image.id;

  //Remove the avatar from the image table, if exists
  if (fruitImageId !== null) {
    let fruitImageResponse = await Image.destroy({
      where: {
        id: fruitImageId,
      },
    });

    if (!fruitImageResponse) {
      return Error(ctx, 404, 'Failed to delete avatar');
    }
  }

  //Let's add a new ID of the picture to the avatar of the fruit, and it can be either a number or null
  fruitResponse.avatar = imageId;
  await fruitResponse.save();

  //Let's return the updated fruit
  let newFruitResponse = await Fruit.findOne({
    where: {
      id: fruitId,
    },
    include: [Image],
  });

  if (!fruitResponse) {
    return Error(ctx, 404, 'Fruit is not found');
  }

  return (ctx.body = ApiModels.fruit(ctx, newFruitResponse));
};