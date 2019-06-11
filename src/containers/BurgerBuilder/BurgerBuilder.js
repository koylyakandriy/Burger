import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
	};

	addIngredientHandler = type => {
		const { ingredients, totalPrice } = this.state;
		const oldCount = ingredients[type];
		const updatedCount = oldCount + 1;

		const updatedIngredients = {
			...ingredients,
		};
		updatedIngredients[type] = updatedCount;

		const priceAddition = INGREDIENT_PRICES[type];
		const newPrice = totalPrice + priceAddition;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = type => {
		const { ingredients, totalPrice } = this.state;
		const oldCount = ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;

		const updatedIngredients = {
			...ingredients,
		};
		updatedIngredients[type] = updatedCount;

		const priceDeduction = INGREDIENT_PRICES[type];
		const newPrice = totalPrice - priceDeduction;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			// eslint-disable-next-line no-shadow
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({ purchasable: sum > 0 });
	}

	render() {
		const { ingredients, totalPrice, purchasable, purchasing } = this.state;

		const disabledInfo = {
			...ingredients,
		};
		// eslint-disable-next-line guard-for-in,no-restricted-syntax
		for (const key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return (
			<>
				<Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
					<OrderSummary ingredients={ingredients} />
				</Modal>
				<Burger ingredients={ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemove={this.removeIngredientHandler}
					disabled={disabledInfo}
					purchasable={purchasable}
					ordered={this.purchaseHandler}
					price={totalPrice}
				/>
			</>
		);
	}
}

export default BurgerBuilder;
