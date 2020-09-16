import React, { useEffect, useState } from 'react'
import { db } from './firebase'
import './Orders.css'
import { useStateValue } from './StateProvider'
import Order from './Order'

function Orders() {
  // pulling the orders from database and show it on orders page
  const [{basket, user}, dispatch] = useStateValue()
  const [orders, setOrders] = useState([])  // declaring as array, so putting []
  
  useEffect(() => {
    if(user) {
      db
      .collection('users')
      .doc(user?.uid)
      .collection('orders')
      .orderBy('created', 'desc')
      .onSnapshot(snapshot => {
        setOrders(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      })
    } else {
      setOrders([])
    }
  }, [user])

  return (
    <div className="orders">
      <h1>Yours Orders</h1>
      <div className="orders__order">
        {orders?.map(order => (
          <Order order={order}/>
        ))}
      </div>
    </div>
)

}

export default Orders 