import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productsSlice from './reducers/ProductSlice';
import categorySlice from './reducers/categorySlice';
import selectedCategoriesSlice from './reducers/selectedCategoriesSlice';

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

const rootReducer = combineReducers({
    products: productsSlice,
    categories: categorySlice,
    selectedCategories: selectedCategoriesSlice,
    // 🔥 ADD THIS:
    cart: productsSlice,  // or whatever slice holds login_cart
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
