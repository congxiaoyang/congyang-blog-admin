const express = require('express');
const router = express.Router();
const api = require('./api');

router.post('/login', (req, res, next) =>{
  api.login(req, res, next);
});

router.post('/changeInfo',(req, res, next)=>{
  api.changeInfo(req, res, next);
});

router.post('/setBlog',(req, res, next)=>{
  api.setBlog(req, res, next);
});

router.get('/getInfo', (req, res, next) =>{
  api.getInfo(req, res, next);
});

router.get('/getBlogs', (req, res, next) =>{
  api.getBlogs(req, res, next);
});

router.post('/removeBlog', (req, res, next) =>{
  api.removeBlog(req, res, next);
});

module.exports = router;
