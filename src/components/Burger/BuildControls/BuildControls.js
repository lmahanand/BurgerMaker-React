import React from 'react';


import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

//Array of controls
const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
];

// Its a functional component that receives props and it will return
// JSX in the end
// map each array of control into
/* map each element of array control into BuildControl component */
const buildControls = (props) => (
    <div className={classes.BuildControls}>
      <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>

      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button className={classes.OrderButton}
              disabled={!props.purchasable}
      >Order Now</button>
    </div>
);

export default buildControls;
