import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const authStart =() => {
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess =(authData) => {
    return{
        type:actionTypes.AUTH_SUCCESS,
        authData:authData
    }
}

export const authFail =(error) => {
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const auth = (email,password) => {
    return dispatch => {
        dispatch(authStart());
        Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=')
    }
}