const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database,
    config.username,
    config.password,
    config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//모델 등록
db.Work = require('./work')(sequelize, Sequelize);
db.Note = require('./note')(sequelize, Sequelize);
db.Photo = require('./photo')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);

//1:N 관계 등록
db.Post.hasMany(db.Photo, {
    foreignKey: 'poster',
    sourceKey: 'id'
});
db.Photo.belongsTo(db.Post, {
    foreignKey: 'poster',
    targetKey: 'id'
});

module.exports = db;
