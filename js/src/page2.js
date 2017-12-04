var Button = React.createClass({
  localHandleClick: function(){
    this.props.localHandleClick(this.props.increment);
  },
  render: function(){
    return (
      <button onClick={this.localHandleClick}>{this.props.increment}</button>
    );
  }
});

var Result = React.createClass({
  render: function(){
    return(
      <div>{this.props.localCounter}</div>
    );
  }
});

var Main = React.createClass({
  getInitialState: function(){
    return {counter: 1};
  },
	//ボタンがクリックされたら
  handleClick: function(increment){
    this.setState({counter:increment});
  },
  render: function(){
    return(
      <div className="char_set">
        <div className="result_wrap">
          <Result localCounter={this.state.counter} />
        </div>
        <div className="btn_wrap">
          <Button localHandleClick={this.handleClick} increment={1} />
          <Button localHandleClick={this.handleClick} increment={2} />
          <Button localHandleClick={this.handleClick} increment={3} />
          <Button localHandleClick={this.handleClick} increment={4} />
        </div>
        <form action="page3.html" method="post">
          <input type="hidden" name="counter_num" value={this.state.counter} />
          <button className="sp sp_connect" type="submit" onclick="getData()" name="coutner_btn">
            送信
          </button>
        </form>
      </div>
    );
  }
});

React.render(
  <Main />,
  document.getElementById("display_wrap")
 );
