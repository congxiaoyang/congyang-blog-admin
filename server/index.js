const routerApi = require('./router');
const bodyParser = require('body-parser'); // post 时需要
const express = require('express');
const app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 后端api接口
app.use('/api',routerApi);

// 监听端口
app.listen('3001');
console.log('success listen at port:3001...');



