import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 1,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState (ingredients){


      const sum = Object.keys(ingredients)
                  .map(igKey => {
                    return ingredients[igKey];
                  })
                  .reduce((sum, el) => {
                    return sum + el;
                  },0);
      this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = ( type) => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;

      /*
        ES6 spread operators are used with three dots
        and distribute the state of the old object to new object
      */
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;

      //Now update the total price by mapping
      // each of the ingredients cost


      const currentPrice = this.state.totalPrice;
      const extraPrice = INGREDIENT_PRICES[type];
      const newPrice = currentPrice + extraPrice;

      this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
      this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = ( type) => {
      const oldCount = this.state.ingredients[type];

      if(oldCount <= 0){
        return;
      }
      const updatedCount = oldCount - 1;

      /*
        ES6 spread operators are used with three dots
        and distribute the state of the old object to new object
      */
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;

      //Now update the total price by mapping
      // each of the ingredients cost


      const currentPrice = this.state.totalPrice;
      const deductedPrice = INGREDIENT_PRICES[type];
      const newPrice = currentPrice - deductedPrice;

      this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
      this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler(){
      this.setState({purchasing: true});
    }

    render () {
      const disabledInfo = {
        ...this.state.ingredients
      };

      for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                  <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                  ingredientAdded={this.addIngredientHandler}
                  ingredientRemoved={this.removeIngredientHandler}
                  disabled={disabledInfo}
                  purchasable={this.state.purchasable}
                  ordered={this.purchaseHandler}
                  price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
