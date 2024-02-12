import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  items: [],
};

const ADD_TO_BASKET = "ADD_TO_BASKET";

const basketReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    default:
      return state;
  }
};

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(basketReducer, initialState);
  const addToBasket = (item) => {
    dispatch({ type: ADD_TO_BASKET, payload: item });
  };

  return (
    <BasketContext.Provider value={{ state, addToBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

// Custom hook to access the basket context
export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};
