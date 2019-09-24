
const redux = require('redux'); // node js import syntax
const createStore= redux.createStore;

const initialState ={

    counter:0,
    counter2 : 2
}

//Reducer
const rootReducer = (state=initialState, action) => {
    if(action.type === 'INC_COUNTER'){
        return{
            ...state,
            counter:state.counter +10,
            counter2:state.counter2 + 2
        };
    }

    if(action.type === 'ADD_COUNTER'){
        return{
            ...state,
            counter:state.counter + action.value,
            counter2:state.counter2 + action.value
        };
    }

    return state;
}

//Store (create new redux store)
const store = createStore(rootReducer);
console.log("created Store...");
console.log(store);
//console.log(store.getState());

// Subscription
store.subscribe(() => {
    console.log("[Subscribe] ",store.getState());
})

// Dispatching Action
console.log("initial values");
console.log(store.getState());
console.log("First change values");
store.dispatch({type:'INC_COUNTER'});
console.log(store.getState());
store.dispatch({type:'ADD_COUNTER',value:10});
console.log("updated values");
console.log(store.getState());


// const redux = require('redux');
// const createStore = redux.createStore();

// const initialState ={
//     counter :10
// }

// const store = createStore();
// console.log(store.getState());
// console.log(store);
