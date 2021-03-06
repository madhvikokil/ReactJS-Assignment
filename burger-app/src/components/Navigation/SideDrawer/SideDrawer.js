import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';


const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer,classes.Close]
    if(props.open){
        attachedClasses = [classes.SideDrawer,classes.Open];
    }
    return(
        <>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')} onClick={props.closed}>
            
            <div className={classes.Logo}> 
                <Logo /> </div>
           
            <nav>
                <NavigationItems isAuthenticate={props.isAuth} />
            </nav>

        </div>
        </>
    )
}

export default sideDrawer;