import React ,{Component} from  'react';
import Axios from 'axios';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler =(WrappedComponent,Axios) =>{
    return class extends Component {
        state ={
            error :null

        }
        componentWillMount (){
            Axios.interceptors.request.use(req => {
                this.setState({error : null});
                return req;
            })
            Axios.interceptors.response.use(null,error => {
               this.setState({error : error});
                
            });
    }

    errorConfirmedHandler =() => {
        this.setState({error:null})
    }
        render() {
            return (
                    <>
                <Modal show={this.state.error}
                modalClosed={this.errorConfirmedHandler}>
                {this.state.error? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
                </>
            )
        }
    } 
} 

export default withErrorHandler;