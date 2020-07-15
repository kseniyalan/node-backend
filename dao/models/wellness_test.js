module.exports = (sequelize, DataTypes) => {
  let WellnessTest = sequelize.define(
    'WellnessTest',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      is_new: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      is_target: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      values: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      created_at: {
        name: 'created_at',
        field: 'created_at',
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'wellness_tests',
    },
  );

  WellnessTest.associate = function (models) {
    WellnessTest.belongsTo(models.Client, {
      foreignKey: 'client_id',
      onDelete: 'CASCADE',
    });
  };

  return WellnessTest;
};
