import React ,{useState,useEffect} from  'react';
import Axios from 'axios';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler =(WrappedComponent,Axios) =>{
    return props=> {
        const[error,setError] = useState(null);
       
      
            const reqInterceptor = Axios.interceptors.request.use(req => {
                setError(null);
                return req;
            })
            const resInterceptor = Axios.interceptors.response.use(res => res,err => {
               setError(err);
                
            });

    useEffect(()=>{
        return () => {
            Axios.interceptors.request.eject(reqInterceptor);
            Axios.interceptors.response.eject(resInterceptor);

        }
    },[reqInterceptor,resInterceptor])

    

    const errorConfirmedHandler =() => {
       setError(null);
    }
       
            return (
                    <>
                <Modal show={props.error}
                modalClosed={errorConfirmedHandler}>
                {error? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
                </>
            )
        
    } 
} 

export default withErrorHandler;