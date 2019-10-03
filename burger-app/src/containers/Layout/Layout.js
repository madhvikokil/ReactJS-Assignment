import React from 'react';
import { connect } from 'react-redux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
// another option is to use <div>
// return array instead of JSX
class Layout extends React.Component {
    state ={
        showSideDrawer :false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false})
    }

  

    sideDrawerToggleHandler =() => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
    });
}
    render(){
        return(
    <>   
        <Toolbar
        isAuth={this.isAuthenticate} drawerToggleClicked={this.sideDrawerToggleHandler}/> 
        <SideDrawer 
        isAuth={this.isAuthenticate}
        open={this.state.showSideDrawer} 
        closed={this.sideDrawerClosedHandler}/>            
      <main className={classes.Content}>
            {this.props.children}
           
        </main>
   </>
        );  
    }
}

const mapStateToProps =(state) => {
    return{
        isAuthenticate : state.auth.token !==null
    }
}

export default connect(mapStateToProps)(Layout);