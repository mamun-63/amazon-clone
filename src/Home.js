import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img 
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" 
          alt="" 
        />

        <div className="home__row">
          <Product 
            id="49538094"
            title="The Lean Startup: How Constant innovation Creates Rapidically Successful Business Paperback" 
            price={29.99} 
            image="https://Images-na.SSL-Images-Amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            rating={5}
            />
          <Product 
            id="12321341"
            title="Kenwood kmix Stand Mixer for baking, Stylish kitchen Mixer with k-beater, Dough Hook and whisk, 5 Litre Glass Bow" 
            price={260.0} 
            image="https://Images-na.SSL-Images-Amazon.com/images/I/71Swqqe7XAL._AC_SX466.jpg"
            rating={4}
          />
        </div>
        
        <div className="home__row">
          <Product 
            id="12321342"
            title="Kenwood kmix Stand Mixer for baking, Stylish kitchen Mixer with k-beater, Dough Hook and whisk, 5 Litre Glass Bow" 
            price={29.3} 
            image="https://Images-na.SSL-Images-Amazon.com/images/I/816ctt5WV5L._AC_SX385.jpg"
            rating={2}
          />
          <Product 
            id="12321331"
            title="Kenwood kmix Stand Mixer for baking, Stylish kitchen Mixer with k-beater, Dough Hook and whisk, 5 Litre Glass Bow" 
            price={249.0} 
            image="https://Images-na.SSL-Images-Amazon.com/images/I/816ctt5WV5L._AC_SX385.jpg"
            rating={3}
          />
          <Product 
            id="12321351"
            title="Kenwood kmix Stand Mixer for baking, Stylish kitchen Mixer with k-beater, Dough Hook and whisk, 5 Litre Glass Bow" 
            price={589.0} 
            image="https://Images-na.SSL-Images-Amazon.com/images/I/71Swqqe7XAL._AC_SX466.jpg"
            rating={4}
          />
        </div>

        <div className="home__row">
          <Product 
            id="12321361"
            title="Kenwood kmix Stand Mixer for baking, Stylish kitchen Mixer with k-beater, Dough Hook and whisk, 5 Litre Glass Bow" 
            price={249.0} 
            image="https://Images-na.SSL-Images-Amazon.com/images/I/6125mFrzr6L._AC_SX355.jpg"
            rating={5}
          />
        </div>

      </div>
    </div>
  )
}

export default Home


