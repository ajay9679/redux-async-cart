import React from 'react';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import {useDispatch, useSelector, connect} from 'react-redux';
import {cartActions} from '../../store/cart-slice.js';

const ProductItem = props => {
    const { id, title, price, description } = props;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const addToCartHandler = () => dispatch(cartActions.addItemToCart({id, title, price, description}));

    return <li className={classes.item}>
        <Card>
            <header>
                <h3>{title}</h3>
                <div className={classes.price}>${price.toFixed(2)}</div>
            </header>
            <p>{description}</p>
            <div className={classes.actions}>
                <button onClick={addToCartHandler} >Add to Cart</button>
            </div>
        </Card>
    </li>
};

export default ProductItem;

/*
class ProductItem extends React.Component{
    constructor(){
        super()
        this.addToCartHandler = this.addToCartHandler.bind(this);
    }

    addToCartHandler(){
        this.props.addCart();
    }

    render(){
        const {title, price, description} = this.props;

        return <li className={classes.item}>
            <Card>
                <header>
                    <h3>{title}</h3>
                    <div className={classes.price}>${price.toFixed(2)}</div>
                </header>
                <p>{description}</p>
                <div className={classes.actions}>
                    <button onClick={this.addToCartHandler} >Add to Cart</button>
                </div>
            </Card>
        </li>
    }
}

const mapDispatchToProps = dispatch => ({
    addCart: () => dispatch(cartActions.addItemToCart()),
});

export default connect(null, mapDispatchToProps)(ProductItem);
*/