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
    return {counter: 0};
  },
	//ボタンがクリックされたら
  handleClick: function(increment){
    this.setState({counter:increment});
  },
  render: function(){
    return(
      <div>
        <Button localHandleClick={this.handleClick} increment={1} />
        <Button localHandleClick={this.handleClick} increment={2} />
        <Button localHandleClick={this.handleClick} increment={3} />
        <Button localHandleClick={this.handleClick} increment={4} />
        <Result localCounter={this.state.counter} />
				<a href="page3.html?id={this.state.counter}">リンク</a>
      </div>
    );
  }
});

React.render(
  <Main />,
  document.getElementById("display_wrap")
 );
