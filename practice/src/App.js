// Lifting up state

import React from 'react';
import './App.css';
import Counter from './component/Counter';
import NameManipulate from './component/nameManipulate';
import NameManipulate2 from './component/nameManipulation2';
import RenderCount from './component/RenderCount';

class App extends React.Component{

  state ={
    count:0
}

increment =() => {
    this.setState({count : this.state.count + 1})
}

decrement =() => {
    this.setState({count : this.state.count - 1})
}
render(){
  return (
    <div className="App">
      {/* <NameManipulate2 /> */}
      <Counter 
        count={this.state.count}
        increment={this.increment}
        decrement={this.decrement}
     />
     <RenderCount />
      {/* <Counter 
        count={this.state.count}
        increment={this.increment}
        decrement={this.decrement}
     />  */}
    </div>
  );
}

}

export default App;
