import React,{ useState } from 'react';
import IngredientList from './IngredientList';

import IngredientForm from './IngredientForm';
import Search from './Search';

const Ingredients = () => {
  const [userIngredient, setUserIngredient ] = useState([]);

  const addIngredientsHandler = ingredients => {
    setUserIngredient(prevIngredients => 
      [...prevIngredients,
         {id : Math.random().toString(),
          ...ingredients}])
  } 
  return (
    <div className="App">
      <IngredientForm onAddIngredients={addIngredientsHandler}/>

      <section>
        <Search />
        <IngredientList ingredients={userIngredient} onRemoveItem={() => {}} />
      </section>
    </div>
  );
}

export default Ingredients;
