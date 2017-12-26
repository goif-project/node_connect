var mysql = require('mysql');

var dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'jack50611',
  database: 'golf_db'
};

var connection = mysql.createConnection(dbConfig);

module.exports = connection;
