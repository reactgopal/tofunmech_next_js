import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "product",
  initialState: {
    add_product: [],
    add_Details: "",
    category_list: [],
    single_category: [],
    add_wish: [],
    addto_cart: [],
    order_list: [],
    filter_multi: "",
    coupon_code: "",
    login_cart: [],
    cart_count: 0, // for header count
    add_ship: [],
    selected_value_address: [],
    coupon_value: "",
    serach_bar: [],
    insurance_name: [],
    estimate_list: [],
    delivery: [],
    selectedOption: null,
    fastestDeliveryCost: 0,
    customer_review: [],
  },

  reducers: {
    emptyProducts: (state) => {
      state.add_product = []
    },
    addProducts: (state, { payload }) => {
      state.add_product = payload
    },

    addProductDetails: (state, { payload }) => {
      state.add_Details = payload
    },

    addCategory: (state, { payload }) => {
      state.category_list = payload;
    },

    addSingleCategory: (state, { payload }) => {
      state.single_category = payload;
    },
    selectedValueAddress: (state, { payload }) => {
      state.selected_value_address = payload;
    },

    //========================================================== WISHLIST ==========================================================
    // =============================================================================================================================
    addToWishlist: (state, { payload }) => {
      if (Array.isArray(payload)) {
        // If it's an array, spread the contents into the target array
        state.add_wish = [...state.add_wish, ...payload];
      } else {
        // If it's a single object, add it to the target array
        state.add_wish = [...state.add_wish, payload];
      }
    },

    removeProductWishlist: (state, { payload }) => {
      state.add_wish = state.add_wish?.filter((e) => e.product_id !== payload)
    },

    removeAllItemWishlist: (state) => {
      state.add_wish = [];
    },

    // =============================================================== ADD_TO_CART==========================================================
    // =====================================================================================================================================
    // addToCart: (state, { payload }) => {
    //   // Check if the product with the same proId already exists in the cart
    //   const productExists = state.addto_cart.some(
    //     (item) => item.proId === payload.proId
    //   );

    //   if (!productExists) {
    //     state.addto_cart = [...state.addto_cart, payload];
    //   }
    // },
    addToCart: (state, { payload }) => {
      const productExists = state.addto_cart.some(
        (item) => item.proId === payload.proId
      );
      if (!productExists) {
        state.addto_cart = [...state.addto_cart, payload];
      }
    },

    removeProductAddtocart: (state, { payload }) => {
      state.addto_cart = state.addto_cart.filter((e) => e.proId !== payload)
    },

    removeAllAddtocart: (state) => {
      state.addto_cart = []
    },

    qtyIncrementDecrement: (state, { payload }) => {
      state.addto_cart = state.addto_cart.map((obj) => {
        if (obj.proId === parseInt(payload.id)) {
          return { ...obj, qty: (obj.qty + payload.plusMinus) }
        }
        return obj
      })
    },

    // ====================================================== LOGIN_ADD_CART=========================================================
    // // ==============================================================================================================================
    // addLoginCart: (state, { payload }) => {
    //   // state.login_cart.push(action.payload);
    //   state.login_cart = payload;

    // },
    // addLoginCart: (state, { payload }) => {
    //   state.login_cart = [...state.login_cart, ...payload];
    // },
    addLoginCart: (state, { payload }) => {
      state.login_cart = Array.isArray(state.login_cart)
        ? [...new Map([...state.login_cart, ...payload].map(item => [item.id, item])).values()]
        : [...payload];

      state.cart_count = state.login_cart.reduce((total, item) => total + item.qty, 0);

    },
    // 👉 ONLY this updates header cart count
    // updateCartCount: (state) => {
    //   state.cart_count = state.login_cart.reduce((total, item) => total + item.qty, 0);
    // },

    // removeLoginAddtocart: (state, { payload }) => {
    //   state.login_cart = state.login_cart.filter((e) => e.id !== payload)

    //   state.cart_count = state.login_cart.reduce((total, item) => total + item.qty, 0);

    // },
    removeLoginAddtocart: (state, action) => {
      const id = action.payload;
      state.login_cart = state.login_cart.filter((item) => item.id !== id);

      state.cart_count = state.login_cart.reduce((total, item) => total + item.qty, 0);

    },

    removeAllLoginCart: (state) => {
      state.login_cart = [];
      state.cart_count = 0;

    },

    login_qtyIncrement_Decrement: (state, { payload }) => {
      state.login_cart = state.login_cart.map((obj) => {
        if (obj.product_id === parseInt(payload.id)) {
          return { ...obj, qty: (obj.qty + payload.plusMinus) }
        }
        return obj
      })
    },


    // ============================================= ORDER_DETAILS ======================================================================
    // ===================================================================================================================================
    addOrderDetails: (state, { payload }) => {
      state.order_list = payload
    },

    addFilterDetail: (state, { payload }) => {
      state.filter_multi = payload
    },

    removeFilter: (state) => {
      state.filter_multi = ""
    },

    add_coupon_code: (state, { payload }) => {
      state.coupon_code = payload;

    },

    remove_coupon_code: (state) => {
      state.coupon_code = ""
    },

    coupon_Pricevalue: (state, { payload }) => {
      state.coupon_value = payload
    },

    // ========================================= Ship Details =======================================================================
    // ==============================================================================================================================
    add_ship_details: (state, { payload }) => {
      state.add_ship = payload
    },

    removeAddress: (state, { payload }) => {
      state.add_ship = state.add_ship.filter((e) => e.id !== payload)
    },

    add_search: (state, { payload }) => {
      state.serach_bar = payload
    },

    // ============================================== Insurance ======================================================================
    // ================================================================================================================================
    add_insurance_companyname: (state, { payload }) => {
      state.insurance_name = payload
    },

    // ==============================================My estimate ======================================================================
    // ================================================================================================================================

    addEstimate: (state, { payload }) => {
      state.estimate_list = payload;
    },

    // removeLoginAddtocart: (state, { payload }) => {
    //   state.login_cart = state.login_cart.filter((e) => e.id !== payload)
    // },

    removeAllEastimate: (state) => {
      state.estimate_list = []
    },
    // ==============================================fastest delivery ======================================================================
    // ================================================================================================================================
    addFastestDeliveryOption: (state, { payload }) => {
      state.delivery = payload;

    },
    setSelectedOption: (state, { payload }) => {
      state.selectedOption = payload;
    },
    setFastestDeliveryCost: (state, { payload }) => {
      state.fastestDeliveryCost = payload;
    },
    // ==============================================Customer Review ======================================================================
    // ================================================================================================================================
    addReview: (state, { payload }) => {
      state.customer_review = payload;
    }
  }
})

export const {
  emptyProducts,
  addProducts,
  addProductDetails,
  addCategory,
  addSingleCategory,
  removeAllItemWishlist,
  addToWishlist,
  removeProductWishlist,
  addToCart,
  removeProductAddtocart,
  removeAllAddtocart,
  qtyIncrementDecrement,
  addOrderDetails,
  addFilterDetail,
  removeFilter,
  add_coupon_code,
  remove_coupon_code,
  addLoginCart,
  updateCartCount,
  removeLoginAddtocart,
  login_qtyIncrement_Decrement,
  removeAllLoginCart,
  add_ship_details,
  removeAddress,
  selectedValueAddress,
  coupon_Pricevalue,
  add_search,
  add_insurance_companyname,
  addEstimate,
  removeAllEastimate,
  addFastestDeliveryOption,
  setSelectedOption,
  setFastestDeliveryCost,
  addReview
} = productsSlice.actions;

export default productsSlice.reducer;
