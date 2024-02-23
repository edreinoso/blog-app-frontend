import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { STORE_VERSION } from "./config";
import rootReducer from "./reducers";

const persistConfig = {
  key: `root_${STORE_VERSION}`,
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore<any, any, any, any>(
  persistedReducer,
  applyMiddleware()
);

const persistor = persistStore(store);

export { store, persistor };
