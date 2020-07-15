module.exports = (sequelize, DataTypes) => {
  let PollAnswer = sequelize.define(
    'PollAnswer',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      answersCount: {
        name: 'answersCount',
        field: 'answers_count',
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'polls_answers',
    },
  );

  PollAnswer.associate = function (models) {
    PollAnswer.belongsTo(models.Poll, {
      foreignKey: 'polls_id',
      onDelete: 'CASCADE',
    });
  };

  return PollAnswer;
};
