module.exports = (sequelize, DataTypes) => {
  return sequelize.define('work', {
    title: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    material: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    width: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    showMain: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })
}