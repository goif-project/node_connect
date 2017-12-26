const socket = io.connect();
socket.on('database', function() {
  let sql = 'select * from t_user';
  connection.query(sql, (err, rows, fields) => {
    var db_contents = rows[0];
  });
});
