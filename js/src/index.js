class H1H1 extends React.Component{
  render(){
    return(
      <div>
        <TestCode />
        <h1 className="ttttt">
          ゴルフゴルフゴルフ
        </h1>
      </div>
    )
  }
}
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
  <H1H1 />,
  document.getElementById('app')
)
