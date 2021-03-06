import {
  ADD_PRODUCT_BASKET,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CLEAR_PRODUCT,
  RESET_BASKET,
  WRITE_QUANTITY,
} from "../actions/types";

const initialState = {
  basketNumbers: 0,
  cartCost: 0,
  products: [],
};

export default (state = initialState, action) => {
  let productSelected = "";
  let quantity = 0;
  switch (action.type) {
    case ADD_PRODUCT_BASKET:
      productSelected = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (productSelected) {
        productSelected.quantity += 1;
        if (productSelected.priceDiscount) {
          return {
            ...state,
            basketNumbers: state.basketNumbers + 1,
            cartCost: state.cartCost + action.payload.priceDiscount,
            products: [...state.products],
          };
        } else {
          return {
            ...state,
            basketNumbers: state.basketNumbers + 1,
            cartCost: state.cartCost + action.payload.price,
            products: [...state.products],
          };
        }
      } else {
        quantity += 1;
        if (action.payload.priceDiscount) {
          return {
            ...state,
            basketNumbers: state.basketNumbers + 1,
            cartCost: state.cartCost + action.payload.priceDiscount,
            products: [
              ...state.products,
              { ...action.payload, quantity, size: action.size },
            ],
          };
        } else {
          return {
            ...state,
            basketNumbers: state.basketNumbers + 1,
            cartCost: state.cartCost + action.payload.price,
            products: [
              ...state.products,
              { ...action.payload, quantity, size: action.size },
            ],
          };
        }
      }

    case INCREASE_QUANTITY:
      productSelected = state.products.find(
        (product) => product.id === action.payload.id
      );
      productSelected.quantity += 1;
      if (productSelected.priceDiscount) {
        return {
          ...state,
          basketNumbers: state.basketNumbers + 1,
          cartCost: state.cartCost + action.payload.priceDiscount,
          products: [...state.products],
        };
      } else {
        return {
          ...state,
          basketNumbers: state.basketNumbers + 1,
          cartCost: state.cartCost + action.payload.price,
          products: [...state.products],
        };
      }

    case DECREASE_QUANTITY:
      productSelected = state.products.find(
        (product) => product.id === action.payload.id
      );
      let newCartCost = 0;
      let newBasketNumbers = 0;
      if (productSelected.quantity === 0) {
        productSelected.quantity = 0;
        newCartCost = state.cartCost;
        newBasketNumbers = state.basketNumbers;
      } else {
        productSelected.quantity -= 1;
        newBasketNumbers = state.basketNumbers - 1;
        if (productSelected.priceDiscount) {
          newCartCost = state.cartCost - productSelected.priceDiscount;
        } else {
          newCartCost = state.cartCost - productSelected.price;
        }
      }
      return {
        ...state,
        basketNumbers: newBasketNumbers,
        cartCost: newCartCost,
        products: [...state.products],
      };

    case CLEAR_PRODUCT:
      productSelected = state.products.find(
        (product) => product.id === action.payload.id
      );
      let numbersBackup = productSelected.quantity;
      productSelected.quantity = 0;

      let index = state.products.indexOf(productSelected);
      state.products.splice(index, 1);
      if (productSelected.priceDiscount) {
        return {
          ...state,
          basketNumbers: state.basketNumbers - numbersBackup,
          cartCost:
            state.cartCost - numbersBackup * productSelected.priceDiscount,
          products: [...state.products],
        };
      } else {
        return {
          ...state,
          basketNumbers: state.basketNumbers - numbersBackup,
          cartCost: state.cartCost - numbersBackup * productSelected.price,
          products: [...state.products],
        };
      }

    // case WRITE_QUANTITY:
    //   productSelected = state.products.find(
    //     (product) => product.id === action.payload.id
    //   );
    //   console.log(action.quantity);
    //   productSelected.quantity += action.quantity;
    //   if (productSelected.quantity === null) {
    //     return {
    //       ...state,
    //       basketNumbers: state.basketNumbers,
    //       cartCost: state.cartCost,
    //       products: [...state.products],
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       basketNumbers: state.basketNumbers + action.quantity,
    //       cartCost: state.cartCost + action.quantity * productSelected.price,
    //       products: [...state.products],
    //     };
    //   }

    case RESET_BASKET:
      return {
        ...state,
        basketNumbers: 0,
        cartCost: 0,
        products: [],
      };

    default:
      return state;
  }
};
