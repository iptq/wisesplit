import { receiptItemSlice } from "./receiptItem";
import { totalSlice } from "./total";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

export const reducers = combineReducers({
  receiptItem: receiptItemSlice.reducer,
  total: totalSlice.reducer,
});

export const defaultStoreOptions = {
  reducer: reducers,
};

const persistConfig = { key: "wisesplit", storage };

const persistedReducer = persistReducer(persistConfig, reducers);

const unpersistedStore = configureStore(defaultStoreOptions);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof unpersistedStore.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
