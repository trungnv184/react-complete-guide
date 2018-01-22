import React from 'react';
import classes from './Order.css';

const order = props => {
    return (
    <div className = { classes.Order }>
        <p>To: <strong>{ props.customer }</strong></p>
        <p>Ingredients:</p>
        <ul>
            {  }
        </ul>
        <p>Price: <strong>${ props.price.toFixed(2) }</strong></p>
        <p>Delivery address: <strong>{ props.address.street }, { props.address.postalCode }</strong></p>
        <p>Delivery method: <u><strong>{ props.delivery }</strong></u></p>
    </div>
    )
};

export default order;