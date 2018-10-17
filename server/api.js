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

  getInfo(req,res,next){
    var id = req.query.id;
    pool.getConnection((err,connection) => {
      var sql = sqlMap.getInfo;
      connection.query(sql,[id],(err,result) => {
        res.json(result);
        connection.release();
      })
    })
  },
  changeInfo(req, res, next) {
    var intro = req.body.intro, name = req.body.name;
    if(intro == '' || name == ''){
      res.end(JSON.stringify({msg:'请传入参数',status:'error'}));
    }
    pool.getConnection((err, connection) => {
      if(err){
         console.log('请求超时，请稍后重试');
      }
      var sql = sqlMap.changeInfo;
      connection.query(sql, [name, intro], (err, result) => {
        if(err){
          throw err;
        }else{
          res.setHeader('Content-Type', 'text/plain;charset=utf-8');
          res.end(JSON.stringify({status:'ok',msg:'修改成功'}));
          connection.release();
        }

      })
    })
  }
};

