import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import classes from './Toolbar.css';

const Toolbar = ({ drawerToggleClicked }) => (
	<header className={classes.Toolbar}>
		<DrawerToggle clicked={drawerToggleClicked} />
		<div className={classes.Logo}>
			<Logo />
		</div>
		<nav className={classes.DesktopOnly}>
			<NavigationItems />
		</nav>
	</header>
);

Toolbar.propTypes = {
	drawerToggleClicked: PropTypes.func.isRequired,
};

export default Toolbar;
