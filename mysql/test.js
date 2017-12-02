const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'jack50611',
    database : 'node_test'
});

//ここからMySQLアクセス
connection.connect();

let sql = 'select * from t_user';
connection.query(sql, (err, rows, fields) => {
  console.log('test_userテーブル: ', rows);
});

connection.end();
