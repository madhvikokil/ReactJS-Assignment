import React ,{Component}from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Switch,BrowserRouter,Route,Redirect ,withRouter} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup()
;  }
  render(){
    let routes = (
      <Switch>
          <Route  path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to ="/" />
        </Switch>
    );

    if(this.props.isAuthenticate){
      routes =(
        <Switch>
          <Route exact path="/" component={BurgerBuilder} />
          <Route  path="/checkout" component={Checkout} />
          <Route  path="/orders" component={Orders} />
         <Route  path="/logout" component={Logout} />
          <Redirect to ="/" />

        </Switch>
      );
    }
    return (
      <BrowserRouter>
        <div>
            <Layout>
          {routes}
            </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticate :state.auth.token !==null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup : () =>dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
