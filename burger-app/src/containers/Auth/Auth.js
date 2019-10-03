import React ,{ Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Auth extends Component { 
    state ={ 
        controls: {
            email : {    
                elementType :'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email'
                },
                value:'',
                validation:{
                    required:true
                },
                vaild:false,
                touched:false
             },
             password : {    
                elementType :'input',
                elementConfig:{
                    type:'password',
                    placeholder:'password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:7
                },
                vaild:false,
                touched:false
             }
        },
        isSignup:true
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.onSetAuthRedirectPath();
        }
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
     
        if(rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        
       
        return isValid;
    }

    inputChangedHandler = (event,controlName) =>{
        const updatedControls = { 
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched : true
            }
        };
        this.setState({controls:updatedControls})
    }

    submitHandler =( event ) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)
    }

    switchAuthModeHandler =() => {
        this.setState(prevState => {
            return{isSignup: !prevState.isSignup}
        })

    }

    render() {
        const formElementArray =[];
        for(let key in this.state.controls){
            formElementArray.push({
                id:key,
                config:this.state.controls[key]


            })
        } 

        const form = formElementArray.map(formElement => (
            <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            invalid = {!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched} 
            changed={(event) => {this.inputChangedHandler(event,formElement.id)}}/>
        ))

        let authRedirect = null;
        if(this.props.isAuthenticate) {
            authRedirect = <Redirect to ={this.props.authRedirectPath} />

        }
        return(
            <div className={classes.Auth}>
                {authRedirect}
                <form onSubmit={this.submitHandler}>  
                    {form}
                <Button btnType="Success"> SUBMIT </Button>
                </form>
               
                <Button clicked={this.switchAuthModeHandler}
                btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN': 'SIGNUP'}</Button>
            </div>
            )
    }
}

const mapStateToProps =(state) => {
    return{
    isAuthenticate : state.auth.token !== null,
    loading:state.auth.loading,
    error:state.auth.error,
    buildingBurger : state.burgerBuilder.building,
    authRedirectPath : state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onAuth:(email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);