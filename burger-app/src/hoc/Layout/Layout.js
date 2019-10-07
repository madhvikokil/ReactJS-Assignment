import React ,{useState} from 'react';
import Aux from '../Aux/Aux';
import { connect } from 'react-redux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
// another option is to use <div>
// return array instead of JSX
const Layout= props => {
    const [sideDrawerVisible,setSideDrawerVisible] = useState(false)
    
    const sideDrawerClosedHandler = () => {
        setSideDrawerVisible(false);
    }

  

   const  sideDrawerToggleHandler =() => {
       setSideDrawerVisible(!sideDrawerVisible);
}

        return(
    <Aux>    
        <Toolbar 
        isAuth={props.isAuthenticate}
        drawerToggleClicked={sideDrawerToggleHandler}/> 
        
        <SideDrawer 
      isAuth={props.isAuthenticate}
        open={sideDrawerVisible} 
        closed={sideDrawerClosedHandler}/>            
      <main className={classes.Content}>
            {props.children}
           
        </main>
    </Aux>
        );  
    
}

const mapStateToProps =(state) => {
    return{
    isAuthenticate : state.auth.token !==null
    }
}

export default connect(mapStateToProps)(Layout);