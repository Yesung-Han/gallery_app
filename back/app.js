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

//배포시 없애야함.
if(process.env.DEVELOP){
    frontURL = "http://localhost:3000";
}
else{
    frontURL = process.env.FRONT_URL;
}

app.use(cors({
    origin: frontURL,
    credentials: true,
}))
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
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