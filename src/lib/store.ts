import { configureStore } from "@reduxjs/toolkit";

import { categoryReducer } from "./features/categorySlice/categorySlice";
import { massReducer } from "./features/massSlice/massSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      category: categoryReducer,
      mass: massReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
