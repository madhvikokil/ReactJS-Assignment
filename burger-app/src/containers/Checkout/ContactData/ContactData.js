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
            value:'',
            validation:{
                required:true
            },
            vaild:false,
            touched:false
         },

        street : {
                elementType :'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your street'
                },
            value:'',
            validation:{
                required:true
            },
            vaild:false,
            touched:false

            },

            zipCode : {
                elementType :'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your zip code'
                },
            value:'',
            validation:{
                required:true
            },
            vaild:false,
            minLength:5,
            maxLength:5,
            touched:false

            },

            country : {
                elementType :'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your country'
                },
            value:'',
            validation:{
                required:true
            },
            vaild:false,
            touched:false

            },
            
            email : {
                elementType :'input',
                elementConfig:{
                    type:'email',
                    placeholder:'your email'
                },
            value:'',
            validation:{
                required:true
            },
            vaild:false,
            touched:false
            },

            deliveryMethod : {
                elementType :'select',
                elementConfig:{
                    options:[{value:'fastest',displayValue:'Fastest'},
                            {value:'cheapest',displayValue:'Cheapest'}]
                },
            value:'',
            validation:{},
            valid:true
            }
            },
            
            formIsValid:false,
            loading:false
    }

    orderHandler =(event) => {
        event.preventDefault();
        console.log("ingredients");
        console.log(this.props.ingredients);

            this.setState({loading : true})
            const formData = {};
            
          console.log("this.state.orderForm");
          console.log(this.state.orderForm);
            for(let formElemenIdentifier in this.state.orderForm){
                console.log("this.state.orderForm[formElemenIdentifier].value :");
                console.log(this.state.orderForm[formElemenIdentifier].value)
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

    checkValidity =(value,rules) => {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid
        
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength  && isValid
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength  && isValid
        }
       
        return isValid;
    }

    inputChangedHandler = (event ,inputIdentifier) => {
       const updatedOrderForm = {
           ...this.state.orderForm 
       }
      const updatedFormElement = {
       ... updatedOrderForm[inputIdentifier]
      } ;
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
      updatedFormElement.touched = true;
   
      updatedOrderForm[inputIdentifier] = updatedFormElement;
      
      let formIsVaild = true;
      for(let inputIdentifier in updatedOrderForm){
          formIsVaild=updatedOrderForm[inputIdentifier].valid && formIsVaild;
      }
      console.log(formIsVaild);
      this.setState({orderForm:updatedOrderForm,formIsVaild:formIsVaild})
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
                    // value={formElement.config.value}
                    invalid = {!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched} 
                    changed={(event) => {this.inputChangedHandler(event,formElement.id)}}/>
                ))}
               
                
                <Button className={classes.Button}
                    btnType="Success" disabled={!this.state.formIsVaild}>
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