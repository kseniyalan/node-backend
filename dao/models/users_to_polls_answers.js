module.exports = (sequelize, DataTypes) => {
  let UsersToPollsAnswers = sequelize.define(
    'UsersToPollsAnswers',
    {},
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'users_to_polls_answers',
    },
  );

  UsersToPollsAnswers.afterCreate(async (modelData, options) => {
    await sequelize.query(`UPDATE polls_answers 
      SET answers_count = answers_count + 1
      WHERE id = ${modelData.PollAnswerId};`);
  });

  return UsersToPollsAnswers;
};
