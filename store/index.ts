import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { showApi } from './show/showApi';

export const store = configureStore({
    reducer: {
        [showApi.reducerPath]: showApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            showApi.middleware,
        ),
});

setupListeners(store.dispatch);
