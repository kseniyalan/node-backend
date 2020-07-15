module.exports = (sequelize, DataTypes) => {
  let ClientsToGoals = sequelize.define(
    'ClientsToGoals',
    {
      is_new: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      tableName: 'clients_to_goals',
    },
  );

  return ClientsToGoals;
};
