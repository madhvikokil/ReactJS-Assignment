import * as actionTypes from './actionTypes';
import react from 'react';

export const saveResult = (res) => {
    return {
        
        type: actionTypes.STORE_RESULT,
        result :res
    };
}


export const storeResult =(res) => {
    return (dispatch,getState) => {
        setTimeout( () => {
            const oldCounter = getState().ctr.counter;
            console.log(oldCounter);
            dispatch(saveResult(res));
        },2000);
   }
}

export const removeResult =(id) => {
    return{
    type: actionTypes.REMOVE_RESULT,
    id:id
    }
}
