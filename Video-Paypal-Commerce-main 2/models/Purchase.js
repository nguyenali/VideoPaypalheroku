const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Purchase extends Model {}

Purchase.init(
  {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull : false,
      autoIncrement : true
    },
    qty : {
      type: DataTypes.INTEGER
    },
    video_id : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    client_id : {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Purchase',
  }
);


module.exports = Purchase;
