import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	state = {};

	componentWillUpdate() {
		console.log('OrderSummary - Will update');
	}

	render() {
		const {
			ingredients,
			purchaseContinued,
			purchaseCancelled,
			price,
		} = this.props;
		const ingredientSummary = Object.keys(ingredients).map(igKey => {
			return (
				<li key={igKey}>
					<span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
					{ingredients[igKey]}
				</li>
			);
		});
		return (
			<>
				<h3>Your order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>{ingredientSummary}</ul>
				<p>
					<strong>Total Price: {price.toFixed(2)}</strong>
				</p>
				<p>Continue to Checkout?</p>

				<Button btnType="Danger" clicked={purchaseCancelled}>
					Cancel
				</Button>

				<Button btnType="Success" clicked={purchaseContinued}>
					Continue
				</Button>
			</>
		);
	}
}

OrderSummary.propTypes = {
	ingredients: PropTypes.object.isRequired,
	purchaseContinued: PropTypes.func.isRequired,
	purchaseCancelled: PropTypes.func.isRequired,
	price: PropTypes.number.isRequired,
};

export default OrderSummary;
