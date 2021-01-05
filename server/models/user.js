const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nickname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    Authorization: {
      type: DataTypes.STRING(45),
      allowNull: true
    }

  };
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING

  }, {
    sequelize,
    tableName: 'user',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "email" },
        ]
      },
    ]
  });
};
