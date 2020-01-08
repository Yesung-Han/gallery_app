exports.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        console.log('로그인 된 상태 입니다.');
        next();
    }else{
        res.status(403).send('로그인 필요');
    }
}

exports.isNotLoggedIn = (req, res, next)=>{
    console.log("로그인 여부 : ",req.isAuthenticated());
    console.log(req.session);
    if(!req.isAuthenticated()){
        console.log('로그인 안된 상태 입니다.');
        next();
    }
    else{
        console.log('이미 로그인 되어있습니다.');
        res.status(403).send('이미 로그인 됨');
    }
}