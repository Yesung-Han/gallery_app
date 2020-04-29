const express = require('express');
const path = require('path');
const router = express.Router();

let sendURL = "";


if(process.env.DOCKER_COMPOSE){
    sendURL = process.env.FRONT_BUILD_DIR + 'index.html'
}
else{
    sendURL = path.join(__dirname, '../../front/public/build/', 'index.html')
}

/* GET home page */
router.get('/', (req, res, next) => {
    res.sendFile(sendURL);
});

module.exports = router;