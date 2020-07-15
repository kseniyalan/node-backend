module.exports = (sequelize, DataTypes) => {
  let ClientsToPollsAnswers = sequelize.define(
    'ClientsToPollsAnswers',
    {},
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'clients_to_polls_answers',
    },
  );

  ClientsToPollsAnswers.afterCreate(async (modelData, options) => {
    await sequelize.query(`UPDATE polls_answers 
      SET answers_count = answers_count + 1
      WHERE id = ${modelData.PollAnswerId};`);
  });

  return ClientsToPollsAnswers;
};
