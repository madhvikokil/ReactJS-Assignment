import React,{ Component } from 'react';
import Order from '../../components/Order/Order';
import Axios from '../../axios-orders';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state ={
        orders:[],
        loading:true
    }

    componentDidMount(){
        Axios.get('./order.json')
            .then(response =>{
               const fetchedOrders=[];
               for(let key in response.data) {
                   fetchedOrders.push({
                       ...response.data[key],
                       id:key
                   });
               }
                this.setState({loading:false,orders:fetchedOrders})
            })
            .catch(err => {
                this.setState({loading:false})
            });
            
    }
    render(){
        return(
            <div>
               {this.state.orders.map(order => (      //array to array of JSX
                   <Order key={order.id} 
                    ingredients={order.ingredients}
                    price={order.price}/>
               ))}
            </div>
        );
    }
}

//export default withErrorHandler(Orders,Axios);
export default Orders;