import React,{ useReducer ,useEffect,useCallback,useMemo } from 'react';
import IngredientList from './IngredientList';
//import Axios from 'axios';
import IngredientForm from './IngredientForm';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
   
      case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};

const httpReducer = (currentHttp, action) => {
  switch(action.type) {
    case 'SEND':
      return {loading:true,error:null}
    case 'RESPONSE':
      return{...currentHttp,loading:false}
      case 'CLEAR' :
          return {...currentHttp,error:null}
    case 'ERROR':
      return {loading:false,error:action.errorMessage}
      default:
        throw new Error("should not reach here !");
  }
}

const Ingredients = () => {
  const [userIngredient, dispatch] = useReducer(ingredientReducer, []);
  const[currentHttp,dispatchHttp] = useReducer(httpReducer, {loading:false,error:null})
  // const [userIngredients, setUserIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();


  useEffect(() => {
    fetch('https://project-hook-c8dc1.firebaseio.com/ingredients.json')
    .then(response => response.json())
    .then(responseData => {
      const loadedIngredients = [];
      for(const key in responseData) {
        loadedIngredients.push({
          id:key,
          title:responseData[key].title,
          amount:responseData[key].amount
        });
      }
      //setUserIngredient(loadedIngredients);
    })
  },[]);
 
  useEffect(() => {
     
      console.log('RE-RENDER INGREDIENTS',userIngredient);    // will run for every re-render cycle
  },[userIngredient])

  const filteredIngredientsHandler = useCallback(filteredIngredients =>{
   dispatch({type:'SET',
   ingredients:filteredIngredients})
  },[])

  const addIngredientsHandler = useCallback(ingredients => {
    dispatchHttp({type:'SEND'});
    fetch('https://project-hook-c8dc1.firebaseio.com/ingredients.json',{
    method:'POST',
    body:JSON.stringify(ingredients),
    headers:{'Content-Type' : 'application/json'}
  })
    .then(response => {
      dispatchHttp({type:'RESPONSE'})
      return response.json();
    }).then(responseData => {
      // setUserIngredient(prevIngredients => 
      //   [...prevIngredients,
      //      {id :responseData.name,
      //       ...ingredients}
      //     ]);
      dispatch({type:'ADD',
      ingredients: {...ingredients,id :responseData.name, ...ingredients}
      })
     });
   },[]);

  const removeIngredientHandler = useCallback(ingredientId => {
    dispatchHttp({type:'SEND'})
    fetch(`https://project-hook-c8dc1.firebaseio.com/ingredients/${ingredientId}.json`,{
        method: 'delete'
      }
    ).then(response => {
      dispatchHttp({type:'RESPONSE'})
      // setUserIngredient(prevIngredients =>
      //   prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      // )},
      dispatch({type:'DELETE', id:ingredientId})
    }).catch(error => {
      dispatchHttp({type:'ERROR',errorMessage:'SOMETHING WENT WRONG'})
    })
  },[])

    const clearError =useCallback(() => {
   dispatchHttp({type:'CLEAR'})
    
    },[])

    const ingredientList =useMemo(() => {
      return(
        <IngredientList ingredients={userIngredient} onRemoveItem={removeIngredientHandler} />
      )
    },[userIngredient,removeIngredientHandler])
  return (
    <div className="App">
      {currentHttp.error && <ErrorModal onClose={clearError}>{currentHttp.error} </ErrorModal>}
      <IngredientForm 
      onAddIngredients={addIngredientsHandler} 
      loading={currentHttp.loading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {ingredientList}
      </section>
    </div>
  );
  }

export default Ingredients;
