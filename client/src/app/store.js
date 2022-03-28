import { configureStore } from "@reduxjs/toolkit";

import { cryptoApi } from "../services/crypto-api";
import { cryptoNewsApi } from "../services/crypto-news-api";

import profileReducer from "./profileReducer";

const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    profile: profileReducer,
  },
});

export default store;
