import axios from 'axios';
import React, { Component } from 'react'

const URL = "https://jsonplaceholder.typicode.com/users"

export class ClassComponent extends Component {

    constructor () {
        super();
        this.state = {count: 0};
        this.num = 0;
    }

  render() {
    console.log("rendering done");
    
    const { count } = this.state
    // const  num = this.num;

    const increment = () => {
        this.num++;
        console.log(this.num);
    }

    
    return (
        <>
      <h2>state count: {count}</h2>
      <h2>num: {this.num}</h2>
      <button onClick={() => this.setState({count : count + 1})}>update</button>
      <button onClick={increment}>click me</button>
      </>
    )
  }

  async componentDidMount () {
    const { data } = await axios.get(URL);
    console.log(`componentDidMount :`, data);
    
}

shouldComponentUpdate(nextProps, nextState) {
    // console.log("current props:", this.props);
    // console.log("Next props:", nextProps);
    // console.log("current state:", this.state);
    // console.log("Next state:", nextState);
    console.log("shouldComponentUpdate");
    return true
    // return this.state.count % 2 === 0;
}

async componentDidUpdate (){
    console.log("componentDidUpdate");
    const { data } = await axios.get(`${URL}/${this.state.count}`)
    console.log(data);
}

componentWillUnmount(){
    console.log("componentWillUnmount");
}
}


export default ClassComponent 