import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { Link, useHistory } from 'react-router-dom'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from './reducer'
import axios from './axios'
import { db } from './firebase'
 
function Payment() {
  const [{ basket, user }, dispatch] = useStateValue()

  const history = useHistory()

  const stripe = useStripe()
  const elements = useElements()

  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState("")
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState(true)

  // this is really important snipets of code here
  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        // Stripe expects the total in a currencies subunits (if you're using dollars, it changes to cents)
        url: `payments/create?total=${getBasketTotal(basket) * 100}`,
      })
      setClientSecret(response.data.clientSecret)
    }
    getClientSecret()
  }, [basket])

  console.log('CLIENT SECRET >> ', clientSecret);
  // console.log('👱', user) // the symbol is, hahaha to debug out in console


  // it takes an event and does some stuff
  const handleSubmit = async (event) => {
    // do all the  fancy stripe stufff . .

    event.preventDefault()
    setProcessing(true)

    
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({paymentIntent}) => {
      console.log('payment > ', paymentIntent)
      // paymentIntent = payment confirmation

      // firestore stuff, to push orders into firestore db
      // its a nosql - document collections based
      db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created
        })


        setSucceeded(true)
        setError(null)
        setProcessing(false)

        dispatch({
          type: "EMPTY_BASKET",
        })

        history.replace('/orders') // through them over to others page, or it'll fall into loop 
        // not using push as we dont wanna come back again to payment page afterorders
    })


  } 


  const handleChange = event => {
    // Listen for changes in the CardElement
    // and display any erros as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }
  
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        
        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{ user?.email }</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Payment section - review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map(item => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Mathod</h3>
          </div>
          <div className="payment__details">
            {/* stripe magic will go */}

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange}/>

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <h3>Order Total: {value}</h3>
                  )}
                decimalScale={2}
                value={getBasketTotal(basket)} // Part of the homework
                displayType={"text"}
                thousandSeperator={true}
                prefix={'$'}
                />

                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}

            </form>

          </div>
        </div>
      </div>
    </div>
  )
  
}

export default Payment 