import React from 'react';
import PropTypes from 'prop-types';

import classes from './NavigationItem.css';

const NavigationItem = ({ children, link, active }) => (
	<li className={classes.NavigationItem}>
		<a className={active ? classes.active : null} href={link}>
			{children}
		</a>
	</li>
);

NavigationItem.propTypes = {
	children: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	active: PropTypes.bool.isRequired,
};

export default NavigationItem;
