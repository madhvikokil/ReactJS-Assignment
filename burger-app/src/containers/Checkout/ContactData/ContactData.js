import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state={
        name:"",
        email:"",
        address :{
            street: "",
            postalcode: ""
        },
        loading:false
    }

    orderHandler =(event) => {
        event.preventDefault();
        console.log("ingredients");
        console.log(this.props.ingredients);

            console.log("hey");
            //alert("You Continue!!!")
            // Sending a post Request by Axios
            // order want to store in backened
            this.setState({loading : true})
            const order = { 
                ingredients : this.props.ingredients,
                price : this.props.price,
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
                this.setState({loading : false})
                this.props.history.push("/");
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
                this.setState({loading : false})
               console.log(error);
        });
    }

    render(){
        let form =(
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input}type="email" name="email" placeholder="Your Email" />
                <input className={classes.Input}type="text" name="street" placeholder="Street" />
                <input className={classes.Input}type="text" name="postal" placeholder="Postal Code" />
                <Button className={classes.Button}
                    btnType="Success"
                    clicked ={this.orderHandler}>
                    ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form =<Spinner />;
        }
        return(
            <div className={classes.ContactData}>
                <h2>Enter the user Details</h2>
                {form}
            </div>
        )
    }
}

export default ContactData;