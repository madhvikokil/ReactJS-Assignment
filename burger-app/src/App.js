import React ,{Component}from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter,Route,Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
      <div>
        <Layout>
        
          <Route exact path="/" component={BurgerBuilder} />
          <Route  path="/checkout" component={Checkout} />
          <Route  path="/orders" component={Orders} />
          <Route  path="/auth" component={Auth} />

          <Redirect to="/" />
        
        </Layout>
          
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
