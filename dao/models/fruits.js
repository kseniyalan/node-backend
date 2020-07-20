module.exports = (sequelize, DataTypes) => {
  let Fruit = sequelize.define(
    'Fruit',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'fruits',
    },
  );

  return Fruit;
};