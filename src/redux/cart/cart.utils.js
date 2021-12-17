export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem=>
        cartItem.id = cartItemToAdd.id
    );

    if(existingCartItem) {
        return cartItems.map(cartItem=> 
            cartItem.id = cartItemToAdd.id ?
            {...cartItem, quantity:cartItem.quantity + 1} : cartItem
            )
    }

    return [...cartItems, {...cartItemToAdd, quantity:1}]
}


let cache = {};
function memoizedAddTo80(n)
{
    if(n in cache){
        return cache[n]
    } else {
        console.log('long time');
        cache[n] = 5 + 80;
        return cache[n];
    }
}
