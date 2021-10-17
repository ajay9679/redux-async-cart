import{uiActions} from './ui-slice.js';
import{cartActions} from './cart-slice.js';

export const fetchCartData = () => {
	return async dispatch => {
		const fetchData = async () => {
			const res = await fetch(`https://redux-async-practice-default-rtdb.firebaseio.com/cart.json`);
			if(!res.ok) throw new Error('could not fetch cart data!');
			const data = await res.json();
			return data;
		}
		try{
			const result = await fetchData();
			console.log(result)
			dispatch(cartActions.replaceCart({
				items: result.items || [],
				totalQuantity: result.totalQuantity,
			}));
		}catch(err){
			dispatch(uiActions.showNotification({
				status: 'error',
				title: 'error',
				message: 'fetching cart data failed',
			}));
			console.error(err.message);
		}
	};
};

export const sendCartData = cart => {
	return async dispatch => {
		dispatch(uiActions.showNotification({
			status: 'pending',
			title: 'Sending...',
			message: 'sending cart data.',
		}));
		const sendRequest = async () => {
			const res = await fetch(`https://redux-async-practice-default-rtdb.firebaseio.com/cart.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}),
            });
            if(!res.ok) throw new Error('sending failed.....!');
		};
		
		try{
			await sendRequest();
			dispatch(uiActions.showNotification({
				status: 'success',
				title: 'Success',
				message: 'send data successfully.',
			}));
		}catch(err){
			dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'An Error occurred!',
            }));
			console.error(err.message);
		}
	};
};
