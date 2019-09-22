import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state={
    orderForm :{
        name : {
            elementType :'input',
            elementConfig:{
                type:'text',
                placeholder:'your name'
            },
        value:''
    },

   street : {
        elementType :'input',
        elementConfig:{
            type:'text',
            placeholder:'your street'
        },
    value:''
    },

    zipCode : {
        elementType :'input',
        elementConfig:{
            type:'text',
            placeholder:'your zip code'
        },
    value:''
    },

    country : {
        elementType :'input',
        elementConfig:{
            type:'text',
            placeholder:'your country'
        },
    value:''
    },
            
    email : {
        elementType :'input',
        elementConfig:{
            type:'email',
            placeholder:'your email'
        },
    value:''
    },

    deliveryMethod : {
        elementType :'select',
        elementConfig:{
            options:[{value:'fastest',displayValue:'Fastest'},
                    {value:'cheapest',displayValue:'Cheapest'}]
        },
    value:''
    }
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
            const formData = {};
            for(let formElemenIdentifier in this.state.orderForm){
                formData[formElemenIdentifier] = this.state.orderForm[formElemenIdentifier].value;

            }
            const order = { 
                ingredients : this.props.ingredients,
                price : this.props.price,
                orderData : formData
            }
            Axios.post('/order.json',order)
            .then (response => {
                this.setState({loading : false})
                this.props.history.push("/");
                console.log(response);
               
            })
               
            .catch ( error => {
                this.setState({loading : false})
               console.log(error);
        });
    }

    inputChangedHandler = (event ,inputIdentifier) => {
       const updatedOrderForm = {
           ...this.state.orderForm 
       }
      const updatedFormElement = {
       ... updatedOrderForm[inputIdentifier]
      } ;
      updatedFormElement.value = event.target.value;
      updatedOrderForm[inputIdentifier] = updatedFormElement;
      this.setState({orderForm:updatedOrderForm})
}

    render(){
        const formElementArray =[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]


            })
        }
        let form =(
            <form onSubmit={this.orderHandler}>
               {formElementArray.map(formElement => (
                    <Input 
                    key={formElement.id}
                     elementType={formElement.config.elementType}
                     elementConfig={formElement.config.elementConfig}
                    //  value={formElement.config.value}
                     changed={(event) => {this.inputChangedHandler(event,formElement.id)}}/>
                ))}
               
                
                <Button className={classes.Button}
                    btnType="Success">
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