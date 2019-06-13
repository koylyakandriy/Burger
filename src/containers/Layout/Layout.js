import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

class Layout extends Component {
	state = {
		showsSideDrawer: false,
	};

	sideDrawerClosedHandler = () => {
		this.setState(state => ({ showsSideDrawer: !state.showsSideDrawer }));
	};

	sideDrawerToggleHandler = () => {
		this.setState(prevState => {
			return { showsSideDrawer: !prevState.showsSideDrawer };
		});
	};

	render() {
		const { children } = this.props;
		const { showsSideDrawer } = this.state;
		return (
			<>
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer
					open={showsSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>
				<main className={classes.Content}>{children}</main>
			</>
		);
	}
}

Layout.propTypes = {
	children: PropTypes.oneOfType([PropTypes.object, PropTypes.symbol])
		.isRequired,
};

export default Layout;
