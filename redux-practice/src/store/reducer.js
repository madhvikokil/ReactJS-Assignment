// import * as actionTypes from '../store/action';
// const initialState = {
//     counter: 0,
//     result:[]
// }

// const reducer = (state = initialState, action) => {
//     switch(action.type){
//     case actionTypes.INCREMENT :
//         return {
//             ...state,
//             counter: state.counter + action.val
//         }
    
//     case actionTypes.DECREMENT:
//         return {
//             ...state,
//             counter: state.counter - action.val
//         }
    
//     case actionTypes.ADD:
//         return {
//             ...state,
//             counter: state.counter + 5
//         }
    
//     case actionTypes.SUBTRACT:  
//           return {
//               ...state,
//             counter: state.counter - 5
//         }

//     case actionTypes.STORE_RESULT : 
//         return {
//          ...state,
//          result : state.result.concat({id:new Date(),value : state.counter})
         
//       }

//     case actionTypes.REMOVE_RESULT:
//         const updatedArray = state.result.filter(result => result.id  !== action.resultElId);
        
//         console.log(action.resultElId);
//        // console.log(result.id);
//       return {
//         ...state,
//         result :updatedArray

        
       
        
//     }
        
//     default:
//          return state;
// };
// }
    


// export default reducer;