import {combineReducer} from 'redux'
import userReducer from "./user/user.reducer";
import cartReducer from './cart/cart.reducer';
export default combineReducer({
    user:userReducer,
    cart:cartReducer
})