module.exports = (sequelize, DataTypes) => {
  let TargetValues = sequelize.define(
    'TargetValue',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      have_progress: {
        type: DataTypes.BOOLEAN,
        default: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'target_values',
    },
  );

  return TargetValues;
};
