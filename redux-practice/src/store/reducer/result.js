import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';
const initialState = {
    result:[]
}

const deleteResult = (state , action) => {
    const updatedArray = state.result.filter(result => result.id !== action.resultElId)
    return updatedObject(state,{result :updatedArray} )
}

const resultReducer = (state = initialState, action) => {
    switch(action.type){

    case actionTypes.STORE_RESULT : 
        return updatedObject (state,{result:state.result.concat({id:new Date(),value : action.result * 2})})
        

    case actionTypes.REMOVE_RESULT:
       return deleteResult(state,action)
    
    default:
         return state;
};
}
    


export default resultReducer;