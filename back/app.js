const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();
const app = express();
const sequelize = require('./models').sequelize;

//passport
const passport = require('passport');
const passportConfig = require('./passport');

//라우터
const indexRouter = require('./routes/index');
const uploadRouter = require('./routes/upload');
const workRouter = require('./routes/work');
const authRouter = require('./routes/auth');
const noteRouter = require('./routes/note');

const cors = require('cors');

sequelize.sync();
passportConfig(passport);


app.set('port', process.env.PORT || 8001);

app.use(cors());
app.use(morgan('dev'));

if(process.env.DOCKER_COMPOSE){
    app.use(express.static(process.env.FRONT_BUILD_DIR));
}
else{
    app.use(express.static(path.join(__dirname, '../front/public/build')));
}

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//라우터 등록
app.use('/upload', uploadRouter);
app.use('/work', workRouter);
app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/note', noteRouter);

app.listen(app.get('port'), ()=>{
    console.log(`${app.get('port')}번 포트에서 서버 실행중입니다.`);
});