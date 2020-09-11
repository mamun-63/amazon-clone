import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'

function Checkout() {
  const [{ basket}, dispatch] = useStateValue()

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img 
          className="checkout__ad" 
          src="https://Images-na.SSL-Images-Amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB23492668_.jpg" 
          alt="" 
          />

          <div>
            <h2 className="checkout__title">Your shopping Basket</h2>
            {basket.map(({item: id, title, image, price, rating }) => (
              <CheckoutProduct 
                id={id}
                title={title}
                price={price}
                image={image}
                rating={rating}
              />
            ))}


            {/* checkoutProduc */}
            {/* checkoutProduc */}
            {/* checkoutProduc */}
            {/* checkoutProduc */}
          </div>

      </div>

      <div className="checkout__right">
         <Subtotal />
      </div>
    </div>
  )
}

export default Checkout
