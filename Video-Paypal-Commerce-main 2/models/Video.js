const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Video extends Model {}

Video.init(
  {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull : false,
      autoIncrement : true
    },
    video_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price : {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Video',
  }
);

module.exports = Video;
