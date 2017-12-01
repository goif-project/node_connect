const socket = io.connect();
const $count = $('#count');
const count_arrow = ['first','second','default'];
const id_name = $('#display_wrap');
const width=window.innerWidth;
var contents_open = false;

//接続時の処理
socket.on('count', function(data) {
    // $count.text(data);
    display_contents(data);
});

//切断時の処理
socket.on('disconnect', function(data){
  var data_plus = data + 1;
  if(width >= 768){
    id_name.removeClass(count_arrow[data]);
    id_name.addClass(count_arrow[data - 1]);
    $("#user_connect").text(data);
  }
  if(data == 0){
    $('#user' + data_plus).remove();
    str = top_contents_wrap();
    id_name.append(str);
  }
});

function display_contents(connect_count){
  var i,str,index,listitems;
  var open = false;
  if(connect_count != 0){
    $("#user0").remove();
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
      str = top_contents_wrap();
      id_name.append(str);
    }
  }else{
    str = sp_html_contents_wrap(connect_count);
    id_name.append(str);
    listitems = $('#user'+connect_count);
    index = $('#user_wrap').index(listitems);
    if(index != 0){
      $('#user' + connect_count).remove();
    }
  }
}

function html_contents_wrap(number){
  str = ''
  str += '<div id="user'+number+'" class="user_wrap">';
  str += '追加されました:只今の人数は';
  str += '<span id="user_connect"></span>人です';
  str += '</div>';
  // str += '';
  // str += '';
  // str += '';
  contents_open = true;
  return str;
}

function top_contents_wrap(){
  str = ''
  str += '<div id="user0" class="default">繋がってない</div>';
  // str += '';
  // str += '';
  // str += '';
  return str;
}

function sp_html_contents_wrap(number){
  str = ''
  str += '<div id="user_sp" class="user_wrap sp"';
  str += 'あなたはユーザ';
  str += '<span id="user_connect">'+number+'</span>です';
  str += '</div>';
  // str += '';
  // str += '';
  // str += '';
  contents_open = true;
  return str;
}
