import React from 'react';

class Counter extends React.Component{
   
    render(){
        return(
            <>
            <h4>Count ={ this.props.count } </h4>
            <button onClick={this.props.increment}>increment</button>
            <button onClick={this.props.decrement}>decrement</button>
            </>
        )
    }
}
export default Counter;