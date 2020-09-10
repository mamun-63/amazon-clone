export const initialState = {
  basket: [], // initially its empty
}

// now gonna create reducer

const reducer = (state, action) => {
  console.log(action)   // thats really important to figure what we are getting from reducer / what reducer listening
  switch (action.type){
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item]
      }

      default:
        return state
  }
}

export default reducer