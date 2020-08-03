module.exports = (sequelize, DataTypes) => {
  let Session = sequelize.define(
    'Session',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(['fruit']),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(['ENABLED', 'DISABLED', 'PENDING']),
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      last_update: {
        name: 'last_update',
        field: 'last_update',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'sessions',
    },
  );

  Session.associate = function (models) {
    Session.belongsTo(models.Fruit, {
      foreignKey: {
        name: 'fruit_id',
      },
      onDelete: 'CASCADE',
    });
  };

  return Session;
};
