import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
                              .map(igKey => {
                                return (<li key={igKey}>
                                          <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                                        </li>);
                              });
  return (

    <Aux>
      <h3> Your order </h3>
      <p> Added ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price}</strong></p>
      <p>Wanna checkout?</p>
      <Button btnType="Failure" clicked={props.purchaseCancelled}>Cancel</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
    </Aux>
  );
};

export default orderSummary;
