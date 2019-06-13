import React from 'react';
// import PropTypes from 'prop-types';

import Navigation from './NavigationItem/NavigationItem';

import classes from './NavigationItems.css';

const NavigationItems = () => (
	<ul className={classes.NavigationItems}>
		<Navigation active link="/">
			Burger Builder
		</Navigation>
		<Navigation active={false} link="/">
			Checkout
		</Navigation>
	</ul>
);

// NavigationItems.propTypes = {
// 	active: PropTypes.bool.isRequired,
// };

export default NavigationItems;
