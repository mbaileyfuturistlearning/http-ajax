import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'

//This base url will be used throughout the application.
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

//We can also set a common header for all of our requests.
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN'


axios.defaults.headers.post['Content-Type'] = 'application/json'

//Interceptors are used to handle request and reponses globally
const requestInterceptor = axios.interceptors.request.use(request => {
    console.log(request)
    return request
}, error => {
    console.log(error);
    return Promise.reject(error) //This will reject the error and forward it locally to our components
});                              //Since we already hanlded them using the catch promise.

const responseInterceptor = axios.interceptors.response.use(response =>{
    console.log(response)
    return response
}, error => {
    console.log(error)
    return Promise.reject(error)
});

//We can also remove interceptors by using the eject method.
axios.interceptors.request.eject(responseInterceptor)
axios.interceptors.request.eject(requestInterceptor)


ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
