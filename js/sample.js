var form_value = null

class Form_Field extends React.Component{
  constructor(props){
     super(props)
        this.state = {
            testValue: "",
        }
  }
  handleChange(event) {
    this.setState({
      testValue: event.target.value
    })
  }
  submitHandler(event) {
    event.preventDefault();
    form_value = this.state.testValue
    console.log(form_value)
  }
  render(){
    return(
      <div>
        <form onSubmit={this.submitHandler.bind(this)}>
          <input type="text" value={this.state.testValue} onChange = {this.handleChange.bind(this)} />
          <button type="submit">
            送信！!!!
          </button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(
  <Form_Field />,
  document.getElementById('app')
)
