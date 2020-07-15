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
        type: DataTypes.ENUM(['client', 'consultant', 'temp_token', 'manager']),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(['ENABLED', 'DISABLED', 'PENDING']),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
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
    Session.belongsTo(models.Consultant, {
      foreignKey: {
        name: 'consultant_id',
      },
      onDelete: 'CASCADE',
    });
    Session.belongsTo(models.Client, {
      foreignKey: {
        name: 'client_id',
        allowNull: true,
      },
      onDelete: 'CASCADE',
    });
    Session.belongsTo(models.Manager, {
      foreignKey: {
        name: 'manager_id',
        allowNull: true,
      },
      onDelete: 'CASCADE',
    });
  };

  return Session;
};
