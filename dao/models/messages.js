module.exports = (sequelize, DataTypes) => {
  let Message = sequelize.define(
    'Message',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      consultant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sended_by_client: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      viewed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      tableName: 'messages',
    },
  );

  Message.associate = function (models) {
    Message.belongsTo(models.Client, {
      foreignKey: {
        name: 'client_id',
      },
      onDelete: 'CASCADE',
    });
    Message.belongsTo(models.Image, {
      foreignKey: {
        name: 'image_id',
        allowNull: true,
      },
      onDelete: 'CASCADE',
    });
  };

  return Message;
};
