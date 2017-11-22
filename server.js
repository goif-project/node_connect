//httpサーバー立ち上げ
var http = require('http');
var fs   = require('fs');
var path = require('path');
var port = 4000
var mime = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":  "text/plain"
  // 読み取りたいMIMEタイプはここに追記
};

var http_server = new http.createServer(function(req, res) {
  // console.log(req.url);
  if (req.url == '/') {
    filePath = '/load.html';
  } else {
    filePath = req.url;
  }
  var fullPath = __dirname + filePath;

  res.writeHead(200, {"Content-Type": mime[path.extname(fullPath)] || "text/plain"});
  fs.readFile(fullPath, function(err, data) {
    if (err) {
      // エラー時の応答
    } else {
      res.end(data, 'UTF-8');
    }
  });
}).listen(port);


console.log('接続開始');

//Socket.ioコネクション
var io = require('socket.io').listen(http_server);
io.sockets.on('connection', function(socket) {

  var connect_count = socket.client.conn.server.clientsCount;
  //接続が2台以上(メインpc1つ、sp最大4つ)のため、初期の接続はカウントしない
    connect_count--;
  // コネクション数-接続プラスor最初に開いた時の処理
  io.sockets.emit('count', connect_count);
  // connect_hantei(connect_count);

  socket.on('disconnect', function(data) {
    connect_count--;
    // コネクション数-接続マイナス
    io.sockets.emit('disconnect', connect_count);
    // connect_hantei(connect_count);
  });
});
//
// function connect_hantei(connect_count){
//   switch(connect_count){
//     case 1:
//       console.log('1つになった！！');
//       break;
//     case 2:
//       console.log('2つ！！');
//       break;
//     case 3:
//       console.log('3つ！！');
//       break;
//     case 4:
//       console.log('4つ！！');
//       break;
//     default:
//       console.log('0か5つ以上！！');
//       break;
//   }
// }
