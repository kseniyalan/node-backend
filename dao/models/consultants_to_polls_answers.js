module.exports = (sequelize, DataTypes) => {
  let ConsultantsToPollsAnswers = sequelize.define(
    'ConsultantsToPollsAnswers',
    {},
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'consultants_to_polls_answers',
    },
  );

  ConsultantsToPollsAnswers.afterCreate(async (modelData, options) => {
    await sequelize.query(`UPDATE polls_answers 
      SET answers_count = answers_count + 1
      WHERE id = ${modelData.PollAnswerId};`);
  });

  return ConsultantsToPollsAnswers;
};
