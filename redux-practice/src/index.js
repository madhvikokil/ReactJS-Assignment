import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,combineReducers,applyMiddleware,compose} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from '../src/store/reducer/counter';
import resultReducer from '../src/store/reducer/result';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer =combineReducers({
    ctr :counterReducer,
    res:resultReducer
})

const logger = (store) => {
    return next=> {
        return action => {
            console.log("[Middleware] Dispatching",action);
            const result = next(action);
            //console.log(next);
            console.log("[Middleware] next State",store.getState())
            return result;
        }
    }
}
const store = createStore(rootReducer,composeEnhancer(applyMiddleware(logger,thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
