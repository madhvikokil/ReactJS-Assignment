import * as actionTypes from './actionTypes';
import Axios from '../../axios-orders';


export const addIngredients = (name) => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName : name
    }
}

export const removeIngredients = (name) => {
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName : name
    }
}

export const setIngredients =(ingredients) => {
    return {
    
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
export const initIngredients = () => {
    return dispatch => {
         Axios.get('https://react-my-burger-1d23a.firebaseio.com/ingredients.json')
            .then(response => {
               dispatch(setIngredients(response.data));
               // console.timeLog(response);
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            })

     }
}