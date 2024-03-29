import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userDataReducer from "../Features/quizDataSlice";

const rootReducers = combineReducers({
  userData: userDataReducer,
});

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
