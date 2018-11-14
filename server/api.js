// 连接数据库，各种方法实现
const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true    // 多语句查询
});

module.exports = {

  login(req, res, next){
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    var param = '',
      judgeUserExistSql = sqlMap.judgeUserExist,
      loginSql = sqlMap.loginSql;
    if (req.method == 'POST') {
      param = req.body;
    } else {
      param = req.query || req.params;
    }
    var username = param.username,pwd = param.pwd;
    if(username != '' && pwd!=''){
      pool.getConnection((err,connection) => {
        if(err){
          throw err;
        }
        connection.query(loginSql,[username,pwd], (err,result) => {
          console.log(result);
          if(err){
            res.end(JSON.stringify({msg:'连接超时',status:'error'}));
          }else if(result.length < 1){
            res.end(JSON.stringify({msg:'登陆失败',status:'error'}));
            connection.release();
          }else{
            res.end(JSON.stringify({msg:'登录成功',status:'ok'}));
            connection.release();
            // connection.query(loginSql,[username,pwd], (err,result) => {
            //   console.log(result);
            //   if(result){
            //     res.end(JSON.stringify({msg:'登录成功',status:'ok'}));
            //     connection.release();
            //   }
            // })
          }
        })
      })
    }else{
      res.end(JSON.stringify({msg:'请填写完整',status:'error'}))
    }
  },

  getInfo(req, res, next) {
    var id = req.query.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getInfo;
      connection.query(sql, [id], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  getBlogs(req, res, next) {
    var param = '';
    if (req.method == 'POST') {
      param = req.body;
    } else {
      param = req.query || req.params;
    }

    if (param.page == '' || param.page == null || param.page == undefined) {
      res.end(JSON.stringify({msg: '请传入参数', status: 'error'}));
      return;
    }

    var start = (param.page - 1) * param.size;
    var sql = 'select count(*) from blogs; select * from blogs limit ' + start + ',' + param.size;

    pool.getConnection(function (err, connection) {
      if (err) {
        console.log("数据库出错，原因是: " + err.message);
      }
      connection.query(sql, [start, param.size], function (err, results) {
        if (err) {
          throw err
        } else {
          var allCount = results[0][0]['count(*)'];
          var blogList = results[1];
          res.setHeader('Content-Type', 'text/plain;charset=utf-8');
          res.end(JSON.stringify({msg: '操作成功', status: 'ok', total: allCount, data: blogList}));
          connection.release();
        }
      });
    })
  },
  changeInfo(req, res, next) {
    var intro = req.body.intro, name = req.body.name;
    if (intro == '' || name == '') {
      res.end(JSON.stringify({msg: '请传入参数', status: 'error'}));
    }
    pool.getConnection((err, connection) => {
      if (err) {
        console.log('请求超时，请稍后重试');
      }
      var sql = sqlMap.changeInfo;
      connection.query(sql, [name, intro], (err, result) => {
        if (err) {
          throw err;
        } else {
          res.setHeader('Content-Type', 'text/plain;charset=utf-8');
          res.end(JSON.stringify({status: 'ok', msg: '修改成功'}));
          connection.release();
        }

      })
    })
  },
  setBlog(req, res, next) {
    var title = req.body.title, content = req.body.content, abstract = req.body.abstract, author = req.body.author,
      publish_date = req.body.publish_date;
    if (content == '' || publish_date == '' || author == '') {
      res.end(JSON.stringify({msg: '请输入参数', status: 'error'}))
    }

    pool.getConnection((err, connection) => {
      if (err) {
        res.end(JSON.stringify({msg: '链接数据库失败', status: 'error'}))
      }
      var sql = sqlMap.setBlog;
      connection.query(sql, [title, content, abstract, author, publish_date], (err, result) => {
        if (err) {
          throw err;
          console.log('error');
        } else {
          res.setHeader('Content-Type', 'text/plain;charset=utf-8');
          res.end(JSON.stringify({status: 'ok', msg: '发布成功'}));
          connection.release();
        }
      })
    })
  },
  removeBlog(req, res, next) {
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    var param = '',
        sql = sqlMap.removeBlog;
    if (req.method == 'POST') {
      param = req.body;
    } else {
      param = req.query || req.params;
    }
    var id = param.id;
    if (id == '') {
      res.end(JSON.stringify({status: 'error', msg: '请选择一项进行操作'}))
    }else{
      pool.getConnection((err, connection) => {
        connection.query(sql,[id],(err,result) =>{
          if(err){
            throw err;
          }else{
            res.end(JSON.stringify({msg:'删除成功',status:'ok'}))
          }
        })
      })
    }
  }
}
;

