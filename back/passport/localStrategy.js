const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport)=>{
    console.log('이야이야');
    passport.use(new LocalStrategy({
        usernameField: 'id-field',
        passwordField: 'password-field',
        passReqToCallback: true,
    }, (req, id, password, done)=>{
        try{
            console.log("인증 시작:"+ id + ", "+ password);
            if(id === process.env.ADMIN_ID && 
                password === process.env.ADMIN_PWD){
                    return done(null, {
                        'user_id': id,
                    });
            }else{
                //로그인 실패시
                console.log("인증 실패:"+ id + ", "+ password);
                return done(null, false, "아이디 또는 비밀번호를 확인해주새요.");
            }
        } catch(err){
            console.log(err);
            done(err);
        }
    }))
}