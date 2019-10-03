import React ,{Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import Axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

// https://react-my-burger-1d23a.firebaseio.com/

class BurgerBuilder extends Component {
    state ={
        //ingredients : null, // for retriving data from firebase
        
        //     salad :0,
        //     bacon :0,
        //     cheese :0,
        //     meat :0
        // },
       
        // purchaseable : false,
        purchasing:false
    //     loading:false
    }

    componentDidMount (){
        this.props.onInitIngredients();
        // Axios.get('https://react-my-burger-1d23a.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //         console.timeLog(response);
        //     });
    }

    // the coun of the ingredients is calculated here
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
       return additionOfKeys > 0;
        console.log("purchaseable "+this.state.purchaseable);
        

     //   const newIngredients= Object.keys(this.props.ingredients)
    //   .map(isKey => {

    //   })
    //   console.log("keys");
    //   console.log(newIngredients);
   
    }

        // addIngredientHandler = (type) => {
        //     console.log("add");
        //     const oldCount = this.state.ingredients[type];
        //     // console.log("count "+this.state.ingredients[type]);
        //     // console.log("type of ingredient "+type);
        //     // console.log("old Count "+oldCount);
        //     const updatedCount = oldCount + 1;
        //     const updatedIngredients = {
        //     ...this.state.ingredients
        //     };
        //     updatedIngredients[type] = updatedCount;
        //     const priceAddition = INGREDIENT_PRICES[type];
        //     const oldPrice = this.state.totalPrice;
        //     const newPrice = oldPrice + priceAddition;
        //     this.setState({totalPrice: newPrice,ingredients:updatedIngredients});
        //     this.updatePurchaseState(updatedIngredients);

        // }

        // removeIngredientHandler = (type) => {
        //     const oldCount = this.state.ingredients[type];
        //     if(oldCount <= 0) {
        //         return;
        //     }
        //     // console.log("count "+this.state.ingredients[type]);
        //     // console.log("type of ingredient "+type);
        //     // console.log("old Count "+oldCount);
        //     const updatedCount = oldCount - 1;
        //     const updatedIngredients = {
        //        ...this.state.ingredients
        //     };
        //     updatedIngredients[type] = updatedCount;
        //     const priceDeduction = INGREDIENT_PRICES[type];
        //     const oldPrice = this.state.totalPrice;
        //     const newPrice = oldPrice - priceDeduction;
        //     this.setState({totalPrice: newPrice,ingredients:updatedIngredients});
        //     this.updatePurchaseState(updatedIngredients);

        // }

        purchaseHandler = () =>  {
            if(this.props.isAuthenticate) {
                this.setState({purchasing : true})
            }
            else{
                this.props.onSetAuthRedirectPath('/checkout')
                this.props.history.push('/auth');
            }
        }

        purchaseCancelHandler = () => {
            console.log("cancel");
            this.setState({purchasing:false})
        }

        purchaseContinueHandler =() => {
            this.props.onInitPurchased();
            console.log(this.props);
            console.log("here!!!")
        
        // let queryParams = [];
        // console.log("ingredients = "+this.props.price);
        // console.log(this.state.ingredients);
        // for(let i in this.state.ingredients){
        //     console.log("encode ingredients");
        //     console.log(encodeURIComponent(i));
        //     console.log(encodeURIComponent(this.state.ingredients[i]));
        //     queryParams.push(encodeURIComponent(i) + '='+encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price='+ this.state.totalPrice);
        // const queryString = queryParams.join('&');
        this.props.history.push('/checkout');
        //     pathname : '/checkout',
        //     search:'?' +queryString
        // });
        // console.log("queryString = ");
        // console.log(queryString);
        // // this.props.history.push('/checkout')
    }
     
        render(){
         const disabledInfo = {
             ...this.props.ings
         };
         for(let key in disabledInfo){
             disabledInfo[key] = disabledInfo[key] <=0
         } 
        
        

         let orderSummary = null;
         let burger = <Spinner />;
         if(this.props.ings){
            burger = (
                <>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.isAuthenticate}
                        price={this.props.price}/>
                  </>
                 );
                 orderSummary = <OrderSummary ingredients={this.props.ings}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                price={this.props.price}/>
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

const mapStateToProps =state => {
    return{
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuthenticate  :state.auth.token !== null

    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded : (ingName) => dispatch(actions.addIngredients(ingName)),
        onIngredientRemoved : (ingName) => dispatch(actions.removeIngredients(ingName)),
        onInitIngredients :() => dispatch(actions.initIngredients()),
        onInitPurchased:() => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath:(path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,Axios));