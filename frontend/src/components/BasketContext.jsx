import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import toast from "react-hot-toast";

const initialState = {
  items: [],
};

const ADD_TO_BASKET = "ADD_TO_BASKET";
const DELETE_ITEM = "DELETE_ITEM";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const CLEAR_BASKET = "CLEAR_BASKET";
const SET_BASKET_FROM_STORAGE = "SET_BASKET_FROM_STORAGE";

const saveBasket = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

const basketReducer = (state, action) => {
  switch (action.type) {
    case SET_BASKET_FROM_STORAGE:
      return {
        ...state,
        items: action.payload,
      };

    case ADD_TO_BASKET:
      const existingItemIndex = state.items.findIndex(
        (item) => item.bookTitle === action.payload.bookTitle
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        const updatedQuantity =
          updatedItems[existingItemIndex].quantity + action.payload.quantity;

        if (updatedQuantity > 100) {
          return state;
        }

        updatedItems[existingItemIndex].quantity = updatedQuantity;

        saveBasket(updatedItems);

        setTimeout(() => {
          toast("Added to basket", { icon: "📚" });
        }, 0);

        return {
          ...state,
          items: updatedItems,
        };
      } else {
        saveBasket([...state.items, action.payload]);

        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }

    case DELETE_ITEM:
      saveBasket(action.payload);

      return {
        ...state,
        items: action.payload,
      };

    case UPDATE_QUANTITY:
      saveBasket(action.payload);

      return {
        ...state,
        items: action.payload,
      };

    case CLEAR_BASKET:
      saveBasket([]);

      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(basketReducer, initialState);

  useEffect(() => {
    const savedBasket = localStorage.getItem("basket");
    if (savedBasket) {
      dispatch({
        type: SET_BASKET_FROM_STORAGE,
        payload: JSON.parse(savedBasket),
      });
    }
  }, []);

  const addToBasket = useCallback((item) => {
    dispatch({ type: ADD_TO_BASKET, payload: item });
  }, []);

  const deleteItem = useCallback(
    (bookTitle) => {
      const updatedItems = state.items.filter(
        (item) => item.bookTitle !== bookTitle
      );

      dispatch({
        type: DELETE_ITEM,
        payload: updatedItems,
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
      type: UPDATE_QUANTITY,
      payload: updatedItems,
    });
  }, []);

  const clearBasket = useCallback(() => {
    dispatch({ type: CLEAR_BASKET });
  }, []);

  return (
    <BasketContext.Provider
      value={{ state, addToBasket, deleteItem, updateQuantity, clearBasket }}
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
