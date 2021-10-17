import React from 'react';
import classes from './CartItem.module.css';
import {useDispatch, connect} from 'react-redux';
import {cartActions} from '../../store/cart-slice.js';
/*
const CartItem = props => {
    const dispatch = useDispatch();
    const { id, title, quantity, total, price } = props.item;

    const addItemHandler = () => dispatch(cartActions.addItemToCart({id, title, price}));
    const removeItemHandler = () => dispatch(cartActions.removeItemFromCart(id));

    return <li className={classes.item}>
        <header>
            <h3>{title}</h3>
            <div className={classes.price}>
                ${total.toFixed(2)}{' '}
                <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
            </div>
        </header>
        <div className={classes.details}>
            <div className={classes.quantity}>
                x <span>{quantity}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={removeItemHandler} >-</button>
                <button onClick={addItemHandler} >+</button>
            </div>
        </div>
    </li>
};

export default CartItem;
*/

class CartItem extends React.Component{
    constructor(){
        super();

        this.removeItemHandler = this.removeItemHandler.bind(this);
        this.addItemHandler = this.addItemHandler.bind(this);
    }

    addItemHandler(){
        const { id, title, quantity, total, price } = this.props.item;
        this.props.addItem(id, title, price);
    }

    removeItemHandler(){
        this.props.removeItem(this.props.item.id);
    }

    render(){
        const { id, title, quantity, total, price } = this.props.item;
        return <li className={classes.item}>
            <header>
                <h3>{title}</h3>
                <div className={classes.price}>
                    ${total.toFixed(2)}{' '}
                    <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
                </div>
            </header>
            <div className={classes.details}>
                <div className={classes.quantity}>
                    x <span>{quantity}</span>
                </div>
                <div className={classes.actions}>
                    <button onClick={this.removeItemHandler} >-</button>
                    <button onClick={this.addItemHandler} >+</button>
                </div>
            </div>
        </li>
    }
}

const mapDispatchToProps = dispatch => ({
    addItem: (id, title, price) => dispatch(cartActions.addItemToCart({id, title, price})),
    removeItem: id => dispatch(cartActions.removeItemFromCart(id)),
});

export default connect(null, mapDispatchToProps)(CartItem);
