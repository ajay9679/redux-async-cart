import React from 'react';
import classes from './CartButton.module.css';
import {uiActions} from '../../store/ui-slice.js';
import {useDispatch, useSelector, connect} from 'react-redux';
/*
const CartButton = props => {
	const dispatch = useDispatch();
	const cartQuantity = useSelector(state => state.cart.totalQuantity);

	const toggleCartHandler = () => dispatch(uiActions.toggle());

	return <button className={classes.button} onClick={toggleCartHandler} >
		<span>My Cart</span>
		<span className={classes.badge}>{cartQuantity}</span>
	</button>
};

export default CartButton;
*/

class CartButton extends React.Component{
	constructor(){
		super();

		this.toggleCartHandler = this.toggleCartHandler.bind(this);
	}

	toggleCartHandler(){
		this.props.uiDispatch();
	}

	render(){
		return <button className={classes.button} onClick={this.toggleCartHandler} >
			<span>My Cart</span>
			<span className={classes.badge}>{this.props.cartQuantity}</span>
		</button>
	}
}

const mapStateToProps = state => ({cartQuantity: state.cart.totalQuantity});

const mapDispatchToProps = dispatch => ({
	uiDispatch: () => dispatch(uiActions.toggle())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartButton);
