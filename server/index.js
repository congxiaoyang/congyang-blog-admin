const routerApi = require('./router');
const bodyParser = require('body-parser'); // post 时需要
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 后端api接口
app.use('/api',routerApi);

// 监听端口
app.listen('3000');
console.log('success listen at port:3000...');



