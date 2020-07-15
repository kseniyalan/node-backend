module.exports = (sequelize, DataTypes) => {
  let Contacts = sequelize.define(
    'Contacts',
    {
      data: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'contacts',
    },
  );

  return Contacts;
};
