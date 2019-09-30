import * as actionTypes from './actionTypes';

export const increment =(value) => {
    return{
    type: actionTypes.INCREMENT,
    val:value
    }
}

export const decrement =(value) => {
    return{
    type: actionTypes.DECREMENT,
    val:value

    }
}

export const add =() => {
    return{
    type:actionTypes.ADD,
    }
}

export const subtract =(val) => {
    return{
    type:actionTypes.SUBTRACT,
    value:val
    }
}
