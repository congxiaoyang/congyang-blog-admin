//sql语句
var sqlMap = {
  changeInfo:'update users set name = ? , intro= ? where id = 0', // 设置个人信息
  getInfo:'select * from users where id = ?', // 获取到用户信息
  setBlog: 'insert into blogs (title, content, abstract, author, publish_date) values (?, ?, ?, ?, ?)', // 插入新blog入数据库
  removeBlog: 'delete from blogs where id = ?', // 删除
  judgeUserExist: 'select * from users where name = ?',
  loginSql: 'select * from users where name = ? and pwd = ? '
};

module.exports = sqlMap;
