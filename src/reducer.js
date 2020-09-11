export const initialState = {
  basket: [], // initially its empty
  user: null,
}

// selector -reduce, they calculate basket total here, I have done it directly in subtotal.js 

// now gonna create reducer

const reducer = (state, action) => {
  console.log(action)   // thats really important to figure what we are getting from reducer / what reducer listening
  
  switch (action.type){
    // listen action
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item]
      }


    case "REMOVE_FROM_BASKET":
        
      console.log("action id ",action.id) // action.id is not getting

      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      )
      let newBasket = [...state.basket]
      
      newBasket.splice(index, 1)

      if (index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.warn(
          `cant remove product (id: ${action.id}) as its not in the basket!`
        )
      }

      return {
        ...state,
        basket: newBasket
      }

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      }


    default:
      return state
  }
}

export default reducer