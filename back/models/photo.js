module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('photo', {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },{
        timestamps: false,
        charset:'utf8',
        collate:'utf8_general_ci',
    })
}