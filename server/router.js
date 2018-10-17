const express = require('express');
const router = express.Router();
const api = require('./api');

router.post('/changeInfo',(req, res, next)=>{
  api.changeInfo(req, res, next);
});

router.get('/getInfo', (req, res, next) =>{
  api.getInfo(req, res, next);
});

module.exports = router;
