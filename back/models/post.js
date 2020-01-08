module.exports = (sequelize, DataTypes) => {
    return sequelize.define('post', {
        title: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    },{
        timestamps: false,
        charset:'utf8',
        collate:'utf8_general_ci',
    })
}