import React, { Component } from "react"
import ReactDOM from "react-dom"

class App extends Component {
  render() {
    return (
      <h1>Hello world</h1>
    )
  }
}

export default App

ReactDOM.render(<App />, document.getElementById("root"))