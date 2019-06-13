import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.css';

const Button = ({ children, clicked, btnType }) => (
	<button
		className={[classes.Button, classes[btnType]].join(' ')}
		onClick={clicked}
		type="button"
	>
		{children}
	</button>
);

Button.propTypes = {
	children: PropTypes.string.isRequired,
	clicked: PropTypes.func.isRequired,
	btnType: PropTypes.string.isRequired,
};

export default Button;
