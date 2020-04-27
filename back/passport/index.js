const local = require('./localStrategy');

module.exports = (passport)=>{
    //로그인 성공시 user정보를 세션에 저장, done의 첫번째 인자는 에러발생시 사용,
    passport.serializeUser((user, done)=>{
        console.log('세션에 주입');
        done(null, user)
    })

    //인증이 완료된후 매 요청마다 호출됨
    //세션에 저장된 유저 데이터 불러올때 사용
    passport.deserializeUser((user, done)=>{
        console.log('로그인 정보: ' + user);
        done(null, user)
    })
    
    console.log("로컬 스트레트지 실행");
    local(passport);
}