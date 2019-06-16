import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false,
	};

	componentDidMount() {
		axios
			.get('https://burger-38bde.firebaseio.com/ingredients.json')
			.then(response => {
				this.setState({ ingredients: response.data });
			})
			.catch(error => {
				console.log('error', error);
				this.setState({ error: true });
			});
	}

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

	purchaseContinueHandler = () => {
		const { ingredients, totalPrice } = this.state;
		this.setState({ loading: true });
		const order = {
			ingredients,
			price: totalPrice,
			customer: {
				name: 'Andriy Koylyak',
				address: {
					country: 'Ukraine',
					city: 'Ivano-Frankivsk',
					street: 'Troleibysna',
				},
				email: 'email@gmail.com',
			},
			deliveryMethod: 'fastest',
		};
		axios
			.post('/orders.json', order)
			.then(response => {
				this.setState({ loading: false, purchasing: false });
				console.log('response', response);
			})
			.catch(error => {
				this.setState({ loading: false, purchasing: false });
				console.log('error', error);
			});
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
		const {
			ingredients,
			totalPrice,
			purchasable,
			purchasing,
			loading,
			error,
		} = this.state;

		const disabledInfo = {
			...ingredients,
		};
		// eslint-disable-next-line guard-for-in,no-restricted-syntax
		for (const key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummery = null;

		let burger = error ? <p>Ingredients can not be loaded!</p> : <Spinner />;
		if (ingredients) {
			burger = (
				<>
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
			orderSummery = (
				<OrderSummary
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					ingredients={ingredients}
					price={totalPrice}
				/>
			);
		}
		if (loading) {
			orderSummery = <Spinner />;
		}

		return (
			<>
				<Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummery}
				</Modal>
				{burger}
			</>
		);
	}
}

export default WithErrorHandler(BurgerBuilder, axios);
