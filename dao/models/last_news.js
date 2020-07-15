module.exports = (sequelize, DataTypes) => {
  let LastNews = sequelize.define(
    'LastFeedIds',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      last_id: {
        type: DataTypes.INTEGER,
        default_value: 0,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'last_feed_ids',
    },
  );

  return LastNews;
};
