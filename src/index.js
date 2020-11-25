import React, { Component } from './my-react/index'
import ReactDOM from './react-dom/index'

class App2 extends Component {
  constructor(props){
    super(props)
    this.state = {
      num: 0
    }
  }
  handelClick() {
    this.setState({
      num: this.state.num + 1
    })
  }
  render() {
    return (
      <div>
        <p>App2 class组件======{this.state.num}</p>
        <button onClick={this.handelClick.bind(this)}>按钮</button>
      </div>
    )
  }
}

ReactDOM.render(<App2/>, document.getElementById('root'))


