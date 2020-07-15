module.exports = (sequelize, DataTypes) => {
  let Client = sequelize.define(
    'Client',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      phone: {
        validator: {
          is: /^\d{11,13}$/,
        },
        type: DataTypes.STRING(13),
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      is_new_consultant: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      consultant_badge: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      geo_location: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      firebase_tokens: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: [],
        allowNull: false,
      },
      push_subscription: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        name: 'created_at',
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      consultant_update: {
        name: 'consultant_update',
        field: 'consultant_update',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'clients',
    },
  );

  Client.associate = function (models) {
    Client.belongsTo(models.Image, {
      foreignKey: {
        name: 'avatar',
        allowNull: true,
      },
      onDelete: 'SET NULL',
    });
    Client.belongsTo(models.City, {
      foreignKey: {
        name: 'city_id',
        allowNull: true,
      },
      onDelete: 'SET NULL',
    });
    Client.belongsTo(models.Consultant, {
      foreignKey: {
        name: 'consultant_id',
        allowNull: true,
      },
      onDelete: 'SET NULL',
    });
    Client.belongsToMany(models.Goal, {
      through: models.ClientsToGoals,
    });
    Client.belongsToMany(models.PollAnswer, {
      through: models.ClientsToPollsAnswers,
    });
  };

  return Client;
};
