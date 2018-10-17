//sql语句
var sqlMap = {
  changeInfo:'update users set name = ? , intro= ? where id = 0', // 设置个人信息
  getInfo:'select * from users where id = ?' // 获取到用户信息
};

module.exports = sqlMap;
