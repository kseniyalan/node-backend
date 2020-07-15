module.exports = (sequelize, DataTypes) => {
  let Verification = sequelize.define(
    'Verification',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      actual: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(4),
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
      tableName: 'verifications',
    },
  );

  return Verification;
};
