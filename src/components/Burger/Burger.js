import React from 'react';
import PropTypes from 'prop-types';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';

const Burger = ({ ingredients }) => {
	const transformIngredients = Object.keys(ingredients)
		.map(igKey => {
			return [...Array(ingredients[igKey])].map((_, i) => {
				// eslint-disable-next-line react/no-array-index-key
				return <BurgerIngredient key={`${igKey}-${i}`} type={igKey} />;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);

	const chosenIngredients =
		transformIngredients.length > 0 ? (
			transformIngredients
		) : (
			<p>Add ingredients</p>
		);

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{chosenIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

Burger.propTypes = {
	ingredients: PropTypes.objectOf(PropTypes.number),
};

Burger.defaultProps = {
	ingredients: {},
};

export default Burger;
