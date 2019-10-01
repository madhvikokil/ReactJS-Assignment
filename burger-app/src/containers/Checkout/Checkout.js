import React ,{ Component }from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

   

    // state= {
    //     ingredients  : null,
    //     price:0
    // }

    // componentWillMount() {
    //     console.log("this.props.location.search value = ");
    //     console.log(this.props.location.search);
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price =0;
    //     for(let param of query.entries()){

    //         if(param[0] === 'price'){
    //             price = param[1];
    //         }
    //         else{
    //             ingredients[param[0]] = +param[1];
    //         }
          
         
    //         //['salad' , 1]
    //     }
    //     console.log(ingredients);
    //     this.setState({ingredients:ingredients,totalPrice : price});
    //     console.log(ingredients);
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();

    }

    checkoutContinuehandler =() => {
        this.props.history.replace("/checkout/contact-data");

    }


    render() {

        let summary = <Redirect to="/" />
        
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ings} 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuehandler} />
            
                    <Route
                     path={this.props.match.path + '/contact-data'} 
                    component={ContactData}/>
                </div>
             );
        }
       return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        purchases:state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);