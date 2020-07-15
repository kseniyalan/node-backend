module.exports = (sequelize, DataTypes) => {
  let Consultant = sequelize.define(
    'Consultant',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      external_id: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      sso_access_token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      sso_refresh_token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        name: 'created_at',
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      type_code: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      sub_type_code: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'consultants',
    },
  );

  Consultant.associate = function (models) {
    Consultant.belongsTo(models.Image, {
      foreignKey: {
        name: 'avatar',
        allowNull: true,
      },
      onDelete: 'SET NULL',
    });
    Consultant.hasMany(models.Client, {
      foreignKey: 'consultant_id',
    });
    Consultant.belongsToMany(models.PollAnswer, {
      through: models.ConsultantsToPollsAnswers,
    });
  };

  return Consultant;
};
