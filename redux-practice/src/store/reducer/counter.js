import * as actionTypes from '../actions/actionTypes';
import {updatedObject} from '../utility';
const initialState = {
    counter: 0
}

const counterReducer = (state = initialState, action) => {
    switch(action.type){
    case actionTypes.INCREMENT :
        return updatedObject (state, { counter: state.counter + action.val})
            
    
    case actionTypes.DECREMENT:
        return updatedObject (state, {counter:state.counter - action.val});
          
    
    case actionTypes.ADD:
        return updatedObject (state, {counter:state.counter + 5});
          

    case actionTypes.SUBTRACT:  
          return updatedObject (state , { counter: state.counter - 5 })

    default:
         return state;
};
}
    


export default counterReducer;