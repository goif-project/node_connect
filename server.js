//httpサーバー立ち上げ
const http = require('http');
const fs   = require('fs');
const querystring = require('querystring');
const path = require('path');
const express = require('express');
const port = 4000;
const session = require('express-session');
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


console.log('接続開始');

//Socket.ioコネクション
const io = require('socket.io').listen(http_server);
io.sockets.on('connection', function(socket) {

  var connect_count = socket.client.conn.server.clientsCount;
  connect_count--;
  // コネクション数-接続プラスor最初に開いた時の処理
  // io.sockets.emit('count', connect_count);

  socket.on('count', function(data) {
    connect_count++;
    io.sockets.emit('count', connect_count);
  });

  socket.on('disconnect', function(data) {
    connect_count--;
    // コネクション数-接続マイナス
    io.sockets.emit('disconnect', connect_count);
  });

  socket.on('mysql', function(data) {
    //ここからMySQL

    io.sockets.emit('mysql', connect_count);
  });
});

connection.connect();

let sql = 'select * from score_name';
connection.query(sql, (err, rows, fields) => {
  console.log('test_userテーブル: ', rows[0].score_name_value);
  const value = rows[0].score_name_value;
  console.log(value);
  exports.value = value;
  const aaaa = exports.value;
  console.log("aaaa:"+aaaa);
});
connection.end();

/*getやpostなどの処理を行うときに行うコード？？

const app = express()

// GETリクエストに対処
app.get([url], (request, response) => {
  // requestをもとに処理をし、クライアントにresponseを返す
})

// POSTリクエストに対処
app.post([url], (request, response) => {
  //
})

// PUTリクエストに対処
app.put([url], (request, response) => {
  //
})

// DELETEリクエストに対処
app.delete([url], (request, response) => {
  //
})

// ポートを指定してアクセスを受け付ける
app.listen([ポート番号], callback)

*/
