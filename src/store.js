import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import userReducer from "./slice/userSlice";
import analysisReducer from "./slice/analysisSlice";
import ResumeFormReducer from './slice/resumeformSlice';

const rootReducer = combineReducers({
  user: persistReducer(
    {
      key: "user",
      storage,
    },
    userReducer
  ),
  analysis: persistReducer(
    {
      key: "analysis",
      storage: sessionStorage,
    },
    analysisReducer
  ),
  resumeForm: persistReducer(
    {
      key: 'resumeForm',
      storage: sessionStorage,
    },
    ResumeFormReducer
  ),
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);
