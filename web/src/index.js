import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Axios from 'axios';

//Axios.defaults.baseURL ='https://jsonplaceholder.typicode.com';
Axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
Axios.defaults.headers.post['Content-Type'] = 'application/json';


Axios.interceptors.request.use(request => {
    console.log(request);
    // Edit the request before returm
    return request; // if not then u ar eblocking the request
},error => {
    console.log(error);
    return Promise.reject(error);
})

Axios.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
})

// for removing the interceptors
//  var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
// axios.interceptors.request.eject(myInterceptor);
ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
