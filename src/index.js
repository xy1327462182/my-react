import React, { Component } from './my-react/index'
import ReactDOM from './react-dom/index'

class App2 extends Component {
  constructor(props){
    super(props)
    this.state = {
      num: 0,
      score: 100
    }
  }
  handelClick() {
    this.setState({
      num: this.state.num + 1
    })
    this.setState({
      score: this.state.score + 1
    })
    console.log(this.state);
  }
  componentDidUpdated() {
    console.log('componentDidUpdated');
  }
  render() {
    return (
      <div>
        <p>{this.state.score}======{this.state.num}</p>
        <button onClick={this.handelClick.bind(this)}>按钮</button>
      </div>
    )
  }
}

ReactDOM.render(<App2/>, document.getElementById('root'))