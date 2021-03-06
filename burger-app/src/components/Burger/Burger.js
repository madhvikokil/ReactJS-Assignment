import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

let burger =props => {
    let transformedIngredients = Object.keys(props.ingredients)       // array of Strings by keys()
       
    .map(igKey => {                                                 // make the array of each 
            return [...Array(props.ingredients[igKey])].map((_,i) => {
                console.log("isKey "+props.ingredients[igKey]+" i="+i);
               return <BurgerIngredient key ={igKey + i} type={igKey} />;
           });
        })
       
        .reduce((arr, el) =>{       // transform an array to omething else takes 2 argu.(prevValue,currrentValue)
            console.log(arr);
            return arr.concat(el);
            
        },[]);
         console.log(transformedIngredients);
        if(transformedIngredients.length === 0){
            transformedIngredients = <p>Please start adding the ingredients</p>
        }

         console.log(transformedIngredients); 
    return(
        <div  className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
            

        </div>
    );
}

export default burger;