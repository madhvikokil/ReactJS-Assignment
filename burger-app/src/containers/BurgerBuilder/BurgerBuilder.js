import React ,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component {
    state ={
        ingredients : {
            salad :0,
            bacon :0,
            cheese :0,
            meat :0
        },
        totalPrice : 4,
        purchaseable : false,
        purchasing:false
    }

    updatePurchaseState(ingredients) {
        console.log("update");
        console.log(ingredients);
        const additionOfKeys = Object.keys(ingredients).map(igKey => {
            console.log(ingredients[igKey]);

            //console.log(sum);
            return ingredients[igKey]
           
         
           
       })

        .reduce((additionOfKeys ,newArray) => {
            return additionOfKeys + newArray;

        },0);
        console.log("purchase")
       console.log("Addition"+additionOfKeys);
        this.setState({purchaseable:additionOfKeys >0});
        console.log("purchaseable "+this.state.purchaseable);
        

     //   const newIngredients= Object.keys(this.props.ingredients)
    //   .map(isKey => {

    //   })
    //   console.log("keys");
    //   console.log(newIngredients);
   



    }

        addIngredientHandler = (type) => {
            console.log("add");
            const oldCount = this.state.ingredients[type];
            // console.log("count "+this.state.ingredients[type]);
            // console.log("type of ingredient "+type);
            // console.log("old Count "+oldCount);
            const updatedCount = oldCount + 1;
            const updatedIngredients = {
            ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceAddition = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice + priceAddition;
            this.setState({totalPrice: newPrice,ingredients:updatedIngredients});
            this.updatePurchaseState(updatedIngredients);
        }

        removeIngredientHandler = (type) => {
            const oldCount = this.state.ingredients[type];
            if(oldCount <= 0) {
                return;
            }
            // console.log("count "+this.state.ingredients[type]);
            // console.log("type of ingredient "+type);
            // console.log("old Count "+oldCount);
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
               ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState({totalPrice: newPrice,ingredients:updatedIngredients});
            this.updatePurchaseState(updatedIngredients);

        }

        purchaseHandler
     render(){
         const disabledInfo = {
             ...this.state.ingredients
         };
         for(let key in disabledInfo){
             disabledInfo[key] = disabledInfo[key] <=0
         } 

         return(
             <div className="abcd">
                 {/* <Modal> 
                     <OrderSummary ingredients={this.state.ingredients}/>
                 </Modal> */}
                 <Burger ingredients={this.state.ingredients}/>
                 <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice}/>
             </div>
         );
     }
}

export default BurgerBuilder;