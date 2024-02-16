import { createContext, useContext, useReducer, useCallback } from "react";

const initialState = {
  items: [],
};

const ADD_TO_BASKET = "ADD_TO_BASKET";
const DELETE_ITEM = "DELETE_ITEM";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";

const basketReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      const existingItemIndex = state.items.findIndex(
        (item) => item.bookTitle === action.payload.bookTitle
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        if (
          updatedItems[existingItemIndex].quantity + action.payload.quantity >
          100
        ) {
          updatedItems[existingItemIndex].quantity = 100;
          alert("You can't add more than 100 of the same item to your basket");
        } else {
          updatedItems[existingItemIndex].quantity += action.payload.quantity;
        }

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

    case DELETE_ITEM:
      return {
        ...state,
        items: action.payload,
      };

    case UPDATE_QUANTITY:
      return {
        ...state,
        items: action.payload,
      };

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

  const deleteItem = useCallback(
    (bookTitle) => {
      const updatedItems = state.items.filter(
        (item) => item.bookTitle !== bookTitle
      );

      dispatch({
        type: "DELETE_ITEM",
        payload: updatedItems, // Change payload to the updatedItems array directly
      });
    },
    [state.items]
  );

  const updateQuantity = useCallback((bookTitle, quantity) => {
    const updatedItems = state.items.map((item) => {
      if (item.bookTitle === bookTitle) {
        return {
          ...item,
          quantity,
        };
      }
      return item;
    });

    dispatch({
      type: "UPDATE_QUANTITY",
      payload: updatedItems,
    });
  });

  return (
    <BasketContext.Provider
      value={{ state, addToBasket, deleteItem, updateQuantity }}
    >
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
