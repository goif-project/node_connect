class TestCode extends React.Component{
  render(){
    return(
      <div>
        <h1 className="henko">
          Hello World !!
        </h1>
      </div>
    )
  }
}

ReactDOM.render(
  <TestCode />,
  document.getElementById('app')
);
