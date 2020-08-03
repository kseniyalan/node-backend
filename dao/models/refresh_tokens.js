module.exports = (sequelize, DataTypes) => {
  let Refresh = sequelize.define(
    'RefreshToken',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      token: {
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
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'refresh_tokens',
    },
  );

  Refresh.associate = function (models) {
    Refresh.belongsTo(models.Session, {
      foreignKey: 'session_id',
      onDelete: 'CASCADE',
    });
  };

  return Refresh;
};
