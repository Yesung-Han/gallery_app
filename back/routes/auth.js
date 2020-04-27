const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

router.get('/', (req, res, next)=>{
    console.log(req.session);
    if(req.isAuthenticated()){
        return res.status(200).json({
            isLoggedIn: true,
            id: req.session.passport.user.user_id,
        });
    }
    else{
        return res.status(200).json({
            isLoggedIn: false
        });
    }
})

router.post('/login', isNotLoggedIn, (req, res, next)=>{
    console.log('로그인 라우터 진입', req.body);

    passport.authenticate('local', (authErr, user, info)=>{
        console.log(authErr, user, info);
        
        if(authErr){
            console.log("로그인 실패 1");
            console.error(authErr);
            return next(authErr);
        }
        if(!user){
            req.flash('loginError', info.message);
            console.log("로그인 실패 2");
            return res.json({
                result: false
            });
        }
        //req.login은 passport에 의해 추가된것
        //passport.serializeUser를 호출시킴
        return req.logIn(user, (loginErr)=>{
            if(loginErr){
                //세션등록 실패
                console.error(loginErr);
                return next(loginErr);
            }
            //로그인 성공, 세션등록 성공
            console.log("세션 등록 성공");
            console.log(req.session);
            console.log(req.isAuthenticated());
            return res.status(200).json({
                id: user.user_id,
                result: true
            });
        })
    })(req, res, next);
})

router.get('/logout',isLoggedIn, (req, res)=>{
    req.logout();
    req.session.destroy();
    res.status(200).json({
        result: true
    })
})

module.exports = router;