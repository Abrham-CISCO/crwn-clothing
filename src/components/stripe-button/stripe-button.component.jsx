import React from 'react'
import StripeCheckOut from 'react-stripe-checkout'

const onToken = token => {
    console.log(token)
    alert('Payment Successful')
}

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51KBbAiKQ0stHP1h8iYUVBYLMFcLnjiaeEHd3kJVd5CJfFPDmJVlkv7cqYGjMalZT80e6OthyUc5Df3OhMMKn3WUP00xZStyYwa"

    return(
        <StripeCheckOut
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton