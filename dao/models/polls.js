module.exports = (sequelize, DataTypes) => {
  let Poll = sequelize.define(
    'Poll',
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
      status: {
        type: DataTypes.ENUM(['ENABLED', 'DISABLED']),
        allowNull: false,
        defaultValue: 'ENABLED',
      },
      for: {
        type: DataTypes.ENUM(['CLIENTS', 'CONSULTANTS', 'ALL']),
        allowNull: false,
        defaultValue: 'ALL',
      },
      created_at: {
        name: 'created_at',
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'polls',
    },
  );

  Poll.associate = function (models) {
    Poll.hasMany(models.PollAnswer, {
      foreignKey: 'polls_id',
      onDelete: 'CASCADE',
    });
  };

  return Poll;
};
