class App_start extends React.Component{
  render(){
    return(
      <div>
        <div className="henko">
          <a className="pc pc_connect" href="page2.html">
            START
          </a>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <App_start />,
  document.getElementById('app')
)
