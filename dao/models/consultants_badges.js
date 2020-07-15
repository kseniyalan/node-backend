module.exports = (sequelize, DataTypes) => {
  let ConsultantsBadges = sequelize.define(
    'ConsultantsBadges',
    {
      url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
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
      tableName: 'consultants_badges',
    },
  );

  return ConsultantsBadges;
};
