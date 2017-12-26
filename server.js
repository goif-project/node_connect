const http = require('http');
const fs   = require('fs');
const path = require('path');
const port = 4000;
const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'jack50611',
    database : 'golf_db'
});
const mime = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":  "text/plain"
};

var http_server = new http.createServer(function(req, res) {
  if (req.url == '/') {
    filePath = '/index.html';
  } else {
    filePath = req.url;
  }
  var fullPath = __dirname + filePath;

  res.writeHead(200, {"Content-Type": mime[path.extname(fullPath)] || "text/plain"});
  fs.readFile(fullPath, function(err, data) {
    if (err) {
    } else {
      res.end(data, 'UTF-8');
    }
  });
}).listen(port);

//Socket.ioコネクション
const io = require('socket.io').listen(http_server);

connection.connect();

let sql = 'select * from score_name';
connection.query(sql, (err, rows, fields) => {
  console.log('test_userテーブル: ', rows[0].score_name_value);
  const value = rows[0].score_name_value;
  exports.value = value;
});
connection.end();
