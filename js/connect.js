const socket = io.connect();
const $count = $('#count');
const count_arrow = ['first','second','default'];
const id_name = $('#display_wrap');
const width=window.innerWidth;
var contents_open = false;

//接続時の処理
socket.on('count', function(data) {
    conosle.log("通った");
});

//接続時の処理
socket.on('mysql', function(data) {
  conosle.log("通った");
});

//切断時の処理
socket.on('disconnect', function(data){
  conosle.log("通ったaaaa");
  var data_plus = data + 1;
  if(width >= 768){
    id_name.removeClass(count_arrow[data]);
    id_name.addClass(count_arrow[data - 1]);
    $("#user_connect").text(data);
  }
  if(data == 0){
    $('#user' + data_plus).remove();
    no_connect();
  }
});

function display_contents(connect_count){
  var i,str,index,listitems;
  var open = false;
  if(connect_count != 0){
    $("#user0").remove();
    id_name.removeClass(count_arrow[2]);
  }
  if(width >= 768){
    for(i=1;i<count_arrow.length;i++){
      if(i == connect_count){
        if(contents_open == false){
          str = html_contents_wrap(i);
          id_name.append(str);
        }
        $("#user_connect").text(connect_count);
        id_name.addClass(count_arrow[i - 1]);
        open = true;
      }else{
        id_name.removeClass(count_arrow[i - 1]);
      }
    }
    if(open == false){
      no_connect();
    }
  }else{
    str = sp_html_contents_wrap(connect_count);
    id_name.append(str);
    listitems = $('#user'+connect_count);
    index = $('.user_wrap').index(listitems);
    if(index != 0){
      $('#user' + connect_count).remove();
    }
  }
}

function no_connect(){
  str = top_contents_wrap();
  id_name.append(str);
  id_name.addClass(count_arrow[2]);
}

function html_contents_wrap(number){
  str = ''
  str += '<div id="user'+number+'" class="user_wrap">';
  str += '<span id="user_connect"></span>人接続済み';
  str += '</div>';
  // str += '';
  // str += '';
  // str += '';
  contents_open = true;
  return str;
}

function top_contents_wrap(){
  str = ''
  str += '<div id="user0" class="user_wrap">接続してください</div>';
  // str += '';
  // str += '';
  // str += '';
  contents_open = false;
  return str;
}

function sp_html_contents_wrap(number){
  str = ''
  str += '<div id="user'+number+'" class="user_wrap sp_w">';
  str += 'あなたはユーザ';
  str += '<span id="user_connect">'+number+'</span>です';
  str += '</div>';
  // str += '';
  // str += '';
  // str += '';
  contents_open = true;
  return str;
}
