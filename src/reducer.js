export const initialState = {
  basket: [], // initially its empty
  user: null,
}

// selector
export const getBasketTotal = (basket) => 
  basket.reduce((amount, item) => item.price + amount, 0)

// now gonna create reducer

const reducer = (state, action) => {
  console.log(action)   // thats really important to figure what we are getting from reducer / what reducer listening
  
  switch (action.type){
    // listen action
    case "ADD_TO_BASKET":
      console.log("action item > ", action.item.id)
      return {
        ...state,
        basket: [...state.basket, action.item]
      }


    case "EMPTY_BASKET":
      return {
        ...state,
        basket: []
      }


    case "REMOVE_FROM_BASKET":
      console.log("removing id is ",action.id)

      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);

      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
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