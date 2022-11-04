import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist/es/constants";
import { authSlice } from "./auth/auth-slice";
import { actionLog } from "./middlewares/actionLog";
import { menuSlice } from "./menu/slice";
import { projectSlice } from "./project/project-slice";
import { appInfoSlice } from "./appInfo/app-info-slice";

const rootReducer = {
  auth: authSlice.reducer,
  menu: menuSlice.reducer,
  project: projectSlice.reducer,
  appInfo: appInfoSlice.reducer,
};

const combinedReducer = combineReducers<typeof rootReducer>(rootReducer);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    "auth"
  ]
}

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }).concat([
    actionLog
  ]),
  devTools: true
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const rootStore = {store: store, persistor}

export default rootStore;
