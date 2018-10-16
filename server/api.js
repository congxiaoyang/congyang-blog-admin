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
  // 获取到用户信息（左侧aside展示的）
  getUsersInfo(req, res, next) {
    var id = req.query.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getUsersInfo;
      connection.query(sql, [id], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  setValue(req, res, next) {
    var id = req.body.id, name = req.body.name;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.setValue;
      connection.query(sql, [name, id], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  // 获取博客列表
  getBlogs(req,res,next){
    var param = '';
    if(req.method == 'POST'){
      param = req.body;
    }else{
      param = req.query || req.params;
    }

    if(param.page == '' || param.page == null || param.page == undefined){
      res.end(JSON.stringify({msg:'请传入参数',status:'error'}));
      return;
    }

    var start  = (param.page - 1) * param.size;
    var sql = 'select count(*) from blogs; select * from blogs limit '+ start +','+param.size;

    pool.getConnection(function (err,connection) {
      if (err){
        console.log("数据库出错，原因是: " + err.message);
      }
      connection.query(sql,[start,param.size],function (err,results) {
        if(err){
          throw err
        }else {
          var allCount = results[0][0]['count(*)'];
          var blogList = results[1];
          res.setHeader('Content-Type', 'text/plain;charset=utf-8');
          res.end(JSON.stringify({msg:'操作成功',status:'success',total:allCount,data:blogList}));
          connection.release();
        }
      });
    })
  },
  getBlogDetails(req,res,next){
    var param = '';
    if(req.method == 'POST'){
      param = req.body;
    }else{
      param = req.query || req.params;
    }

    if(param.id == '' || param.id == null || param.id == undefined){
      res.setHeader('Content-Type','text/plain;charset=utf-8');
      res.end(JSON.stringify({msg:'请传入参数',status:'error'}));
      return;
    }

    pool.getConnection((err,connection) => {
      var sql = sqlMap.getBlogDetails;
      connection.query(sql,[param.id],(err,result) =>{
        if(err){
          throw err
        }else{
          res.setHeader('Content-Type', 'text/plain;charset=utf-8');
          res.end(JSON.stringify({msg:'操作成功',status:'success',data:result}));
          connection.release();
        }
      })
    })

  }
};

