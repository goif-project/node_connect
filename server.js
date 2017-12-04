//httpサーバー立ち上げ
const http = require('http');
const fs   = require('fs');
const path = require('path');
const port = 4000
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
  io.sockets.emit('count', connect_count);

  socket.on('disconnect', function(data) {
    connect_count--;
    // コネクション数-接続マイナス
    io.sockets.emit('disconnect', connect_count);
  });
});

//ここからMySQL
const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'jack50611',
    database : 'node_test'
});

connection.connect();

let sql = 'select * from t_user';
connection.query(sql, (err, rows, fields) => {
  console.log('test_userテーブル: ', rows);
});

connection.end();


//postのデータ取得
var express = require("express");
var app = express();
app.post('/post', function(req, res) {
    req.on('data', function(chunk) {
      console.log(chunk);
    });
});
