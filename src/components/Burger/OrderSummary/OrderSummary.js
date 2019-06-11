import React from 'react';

const OrderSummary = ({ ingredients }) => {
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
			<p>Continue to Checkout?</p>
		</>
	);
};

export default OrderSummary;
