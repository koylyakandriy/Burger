import React from 'react';
import PropTypes from 'prop-types';

import burgerLogo from '../../assets/images/logo.png';

import classes from './Logo.css';

const Logo = ({ height }) => (
	<div className={classes.Logo} style={{ height }}>
		<img src={burgerLogo} alt="Logo" />
	</div>
);

Logo.propTypes = {
	height: PropTypes.string,
};

Logo.defaultProps = {
	// eslint-disable-next-line no-undef
	height: '',
};

export default Logo;
