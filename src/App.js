import React from 'react';
import Layout from './components/Layout/Layout.js';
import Cart from './components/Cart/Cart.js';
import Products from './components/Shop/Products.js';
import {useSelector, useDispatch, connect} from 'react-redux';
import {uiActions} from './store/ui-slice.js';
import Notification from './components/UI/Notification.js';
import {sendCartData, fetchCartData} from './store/cart-actions.js';

/*let isInitial = true;
const App = () => {
    const cart = useSelector(state => state.cart);
    const showCart = useSelector(state => state.ui.cartIsVisible);
    const notification = useSelector(state => state.ui.notification);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);

    React.useEffect(() => {
        if(isInitial){
            isInitial = false;
            return;
        }
        if(cart.changed) dispatch(sendCartData(cart));
    }, [cart, dispatch]);

    return <React.Fragment>
        {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
        <Layout>
            {showCart && <Cart />}
            <Products />
        </Layout>
    </React.Fragment>
};

export default App;
*/

class App extends React.Component{

    /*async sendCartData(){
        this.props.pending();
        const res = await fetch(`https://redux-async-practice-default-rtdb.firebaseio.com/cart.json`, {
            method: 'PUT',
            body: JSON.stringify(this.props.cart),
        });
        if(!res.ok) throw new Error(`sending cart data failed!`);
        this.props.success();
    }*/
    
    componentDidMount(){
        this.props.fetchCart();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.cart !== this.props.cart){
            if(this.props.cart.changed) this.props.sendCart(this.props.cart);
        }
    }

    render(){
        return <React.Fragment>
            {this.props.notification && <Notification status={this.props.notification.status} title={this.props.notification.title} message={this.props.notification.message} />}
            <Layout>
                {this.props.showCart && <Cart />}
                <Products />
            </Layout>
        </React.Fragment>
    }
}

const mapStateToProps = state => ({
    showCart: state.ui.cartIsVisible,
    cart: state.cart,
    notification: state.ui.notification,
});

const mapDispatchToProps = dispatch => ({
    fetchCart: () => dispatch(fetchCartData()),
    sendCart: cart => dispatch(sendCartData(cart)),
    pending: () => dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'sending...',
        message: 'send cart data'
    })),
    error: () => dispatch(uiActions.showNotification({
        status: 'error',
        title: 'error',
        message: 'send cart data failed',
    })),
    success: () => dispatch(uiActions.showNotification({
        status: 'success',
        title: 'success!',
        message: 'data send successfully'
    })),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);



/*
React.useEffect(() => {
        const sendCartData = async () => {
            dispatch(uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'sending cart data.',
            }));
            const res = await fetch(`https://redux-async-practice-default-rtdb.firebaseio.com/cart.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cart),
            });
            if(!res.ok) throw new Error('sending failed.....!');
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'send data successfully.',
            }));
        };
        sendCartData().catch(err => {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'An Error occurred!',
            }));
            console.error(err.message);
        })
    }, [cart, dispatch]);
*/
