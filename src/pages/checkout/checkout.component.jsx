import React from 'react'
import './checkout.styles.scss'
import {connect} from 'react-redux'
import {createStructuredSlector, selectCartTotal} from 'reselect'
import CheckOutItem from '../../components/check-out-item/checkout-item.component'
import {selectCartItems} from '../../redux/cart/cart.selectors'
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'
const CheckoutPage = ({cartItems, total}) => (
    <div className='chceckout-page'>
        <div className="checkout-header">
            <div className="header-block">
                <span>
                    Product
                </span>
            </div>
            <div className="header-block">
                <span>
                    Description
                </span>
            </div>
            <div className="header-block">
                <span>
                    Quantity
                </span>
            </div>
            <div className="header-block">
                <span>
                    Price
                </span>
            </div>
            <div className="header-block">
                <span>
                    Remove
                </span>
            </div>
        </div>
        {
            cartItems.map(cartItem=>
                <CheckOutItem key={cartItem.id} cartItem={cartItem}/>
            )
        }
        <div className="total">
            <span>TOTAL: ${total}</span>
            <div className='test-warning'>
                *Please use the following test credit card for
                payment<br/>

                4242 4242 4242 4242 - Exp: 01/29 - CVV: 123
            </div>
            <StripeCheckoutButton price={total}/>
        </div>
    </div>
)
const mapStateToProps = createStructuredSlector({
    cartItems:selectCartItems,
    total:selectCartTotal
})
export default connect(mapStateToProps)(CheckoutPage)