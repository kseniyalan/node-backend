module.exports = (sequelize, DataTypes) => {
  let Image = sequelize.define(
    'Image',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      src: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      width: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      preview: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'images',
    },
  );

  return Image;
};
