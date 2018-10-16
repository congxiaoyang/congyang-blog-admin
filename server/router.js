const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/getUsersInfo',(req, res, next)=>{
  api.getUsersInfo(req, res, next);
});

router.post('/setValue',(req, res, next)=>{
  api.setValue(req, res, next);
});

router.get('/getBlogs',(req, res, next)=>{
  api.getBlogs(req, res, next);
});

router.get('/getBlogDetails',(req, res, next)=>{
  api.getBlogDetails(req, res, next);
});

module.exports = router;
