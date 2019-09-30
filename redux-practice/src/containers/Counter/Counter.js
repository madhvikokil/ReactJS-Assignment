import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators  from '../../store/actions/index';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

const counter = (props) =>{
    // this.state = {
    //     counter: 0
    // }

    // counterChangedHandler = ( action, value ) => {
    //     switch ( action ) {
    //         case 'inc':
    //             this.setState( ( prevState ) => { return { counactionTypester: prevState.counter + 1 } } )
    //             break;
    //         case 'dec':
    //             this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
    //             break;
    //         case 'add':
    //             this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
    //             break;
    //         case 'sub':
    //             this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
    //             break;
    //     }
    // }

   
        return (
            <div>
                <CounterOutput value={props.ctr} />
                <CounterControl label="Increment" clicked={props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={props.onSubtractCounter}  />
                <hr />
                <button onClick={()=>{props.store(props.ctr)}}> STORE RESULT</button>
                <ul>
                    { props.resultStored.map(strResult => (
                        console.log(strResult),
                         <li key={strResult.id} onClick={() => props.remove(strResult.id)}> {strResult.value}  </li>
                    ))}
                   
                </ul>
            </div>
        );
    
}


const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        resultStored : state.res.result
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch(actionCreators.increment(10)),
        onDecrementCounter: () => dispatch(actionCreators.decrement(10)),
        onAddCounter: () => dispatch(actionCreators.add()),
        onSubtractCounter: () => dispatch(actionCreators.subtract()),
        store: (result) => dispatch(actionCreators.storeResult(result)),
        remove: (id) => dispatch(actionCreators.removeResult(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(counter);