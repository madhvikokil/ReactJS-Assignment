import React ,{Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

// https://react-my-burger-1d23a.firebaseio.com/

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component {
    state ={
        ingredients : null, // for retriving data from firebase
        
        //     salad :0,
        //     bacon :0,
        //     cheese :0,
        //     meat :0
        // },
        totalPrice : 4,
        purchaseable : false,
        purchasing:false,
        loading:false
    }

    componentDidMount (){
        Axios.get('https://react-my-burger-1d23a.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
                console.timeLog(response);
            });
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

        purchaseHandler = () =>  {
            this.setState({purchasing : true})

        }

        purchaseCancelHandler = () => {
            console.log("cancel");
            this.setState({purchasing:false})
        }

        purchaseContinueHandler =() => {
            console.log("hey");
            //alert("You Continue!!!")
            // Sending a post Request by Axios
            // order want to store in backened
            this.setState({loading : true})
            const order = { 
                ingredients : this.state.ingredients,
                price : this.state.totalPrice,
                customer : {
                    name : 'madhvi',
                    address : {
                        street: 'TestStreet 1',
                        zipCode : '41351',
                        country : 'Germany'
                    },
                    email : 'test@test.com'
                },
                deliveryMethod : 'fastest'
            }
            console.log("here");
            Axios.post('/order.json',order)
            .then (response => {
                this.setState({loading : false,purchasing:false})
                console.log(response);
                console.log("*********************************************");
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.header);
                console.log(response.config);
                console.log(response.request);
                
            })
               
            .catch ( error => {
                this.setState({loading : false, purchasing:false})
               console.log(error);
        });
    }
     
        render(){
         const disabledInfo = {
             ...this.state.ingredients
         };
         for(let key in disabledInfo){
             disabledInfo[key] = disabledInfo[key] <=0
         } 
        
        

         let orderSummary = null;
         let burger = <Spinner />;
         if(this.state.ingredients){
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}/>
                  </>
                 );
                 orderSummary = <OrderSummary ingredients={this.state.ingredients}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                price={this.state.totalPrice}/>
        }

       if(this.state.loading){
            orderSummary = <Spinner />

        }
       
     return(
            <>
                 <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                 {/* If purchasing is true ordeeSummary is visible */}
                     {orderSummary}
                 </Modal>
                 {burger}
           
            </>
         );
     }
}

export default withErrorHandler(BurgerBuilder,Axios);