import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";

const initialState = {
  items: [],
};

const ADD_TO_BASKET = "ADD_TO_BASKET";

const basketReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      const existingItemIndex = state.items.findIndex(
        (item) => item.bookTitle === action.payload.bookTitle
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;

        return {
          ...state,
          items: updatedItems,
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }

    default:
      return state;
  }
};

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(basketReducer, initialState);
  const addToBasket = useCallback((item) => {
    dispatch({ type: ADD_TO_BASKET, payload: item });
  }, []);

  return (
    <BasketContext.Provider value={{ state, addToBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};

export const calculateBasketCount = (items) => {
  let basketCount = 0;
  for (const item of items) {
    basketCount += item.quantity;
  }
  return basketCount;
};
