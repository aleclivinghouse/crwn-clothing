import {useContext} from 'react';
import {CartContext} from '../../contexts/cart.context';
import './checkout.styles.scss';

const Checkout = () => {
    const {cartItems, addItemToCart, deleteItemFromCart } = useContext(CartContext);
    return(
        <div>
            <h1>I am the checkout page</h1>
            <div>
                {cartItems.map((cartItem) => {
                    const { id, name, quantity } = cartItem;
                    return(
                        <div key={id}>
                            <h2>{name}</h2>
                            <span>{quantity}</span>
                            <p onClick={() => deleteItemFromCart(cartItem)}>decrement</p>
                            <p onClick={() => addItemToCart(cartItem)}>increment</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Checkout;