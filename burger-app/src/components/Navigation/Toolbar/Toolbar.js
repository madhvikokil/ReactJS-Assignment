import  React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) =>(
    <header className={classes.Toolbar}> 
      <DrawerToggle clicked={props.drawerToggleClicked}/>
        <Logo />

        <nav className={classes.DesktopOnly}>
             <NavigationItems isAuthenticate={props.isAuth}/>
        </nav>
    </header>
)

export default toolbar;
