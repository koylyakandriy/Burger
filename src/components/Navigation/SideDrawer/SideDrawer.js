import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './SideDrawer.css';

const SideDrawer = ({ open, closed }) => {
	let attachedClasses = [classes.SideDrawer, classes.Close];
	if (open) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}

	return (
		<>
			<Backdrop show={open} clicked={closed} />
			<div className={attachedClasses.join(' ')}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</>
	);
};

SideDrawer.propTypes = {
	closed: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};

export default SideDrawer;
