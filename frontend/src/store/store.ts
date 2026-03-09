import { configureStore } from '@reduxjs/toolkit';
import proveedorReducer from './slices/proveedorSlice';
import welcomeReducer from './slices/welcomeSlice';

export const store = configureStore({
  reducer: {
    proveedores: proveedorReducer,
    welcome: welcomeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
