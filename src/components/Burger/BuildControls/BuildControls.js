import React from 'react';
import PropTypes from 'prop-types';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' },
];

const BuildControls = ({
	ingredientAdded,
	ingredientRemove,
	disabled,
	price,
	purchasable,
}) => (
	<div className={classes.BuildControls}>
		<p>
			Current Price: <strong>{price.toFixed(2)}</strong>
		</p>
		{controls.map(ctrl => (
			<BuildControl
				key={ctrl.label}
				label={ctrl.label}
				added={() => ingredientAdded(ctrl.type)}
				removed={() => ingredientRemove(ctrl.type)}
				disabled={disabled[ctrl.type]}
			/>
		))}
		<button
			type="button"
			className={classes.OrderButton}
			disabled={!purchasable}
		>
			Order Now
		</button>
	</div>
);

BuildControls.propTypes = {
	ingredientAdded: PropTypes.func.isRequired,
	ingredientRemove: PropTypes.func.isRequired,
	disabled: PropTypes.objectOf(PropTypes.bool).isRequired,
};

export default BuildControls;
