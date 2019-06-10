import React from 'react';
import PropTypes from 'prop-types';

import classes from './Layout.css';

const Layout = ({ children }) => (
	<>
		<div>Toolbar, SideDrawer, Backdrop</div>
		<main className={classes.Content}>{children}</main>
	</>
);

Layout.propTypes = {
	children: PropTypes.oneOfType([PropTypes.object, PropTypes.symbol])
		.isRequired,
};

export default Layout;
