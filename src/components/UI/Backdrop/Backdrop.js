import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.css';

const Backdrop = ({ show, clicked }) =>
	show ? <div className={classes.Backdrop} onClick={clicked} /> : null;

Backdrop.propTypes = {
	show: PropTypes.bool,
	clicked: PropTypes.func.isRequired,
};

Backdrop.defaultProps = {
	show: '',
};

export default Backdrop;
