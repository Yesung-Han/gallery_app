module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('note', {
        title: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        subTitle: {
            type: DataTypes.STRING(25),
            allowNull: true,          
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        }

    },{
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
}