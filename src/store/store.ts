import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import subscriptionReducer from "./slices/subscriptionSlice";
import deviceReducer from "./slices/deviceSlice";

const subscriptionPersistConfig = {
  key: "subscription",
  version: 1,
  storage,
};

// Transform to exclude File objects from persistence (they can't be serialized)
const deviceTransform = createTransform(
  // transform state on its way to being serialized and persisted
  (inboundState: any) => {
    if (inboundState?.devices) {
      return {
        ...inboundState,
        devices: inboundState.devices.map((device: any) => ({
          ...device,
          image: null, // Exclude File object (can't be serialized)
        })),
      };
    }
    return inboundState;
  },
  // transform state being rehydrated
  (outboundState: any) => {
    if (outboundState?.devices) {
      return {
        ...outboundState,
        devices: outboundState.devices.map((device: any) => ({
          ...device,
          image: null, // File objects are lost on rehydration (expected)
        })),
      };
    }
    return outboundState;
  }
);

const devicePersistConfig = {
  key: "device",
  version: 1,
  storage,
  transforms: [deviceTransform],
};

const persistedSubscriptionReducer = persistReducer(
  subscriptionPersistConfig,
  subscriptionReducer
);

const persistedDeviceReducer = persistReducer(
  devicePersistConfig,
  deviceReducer
);

export const store = configureStore({
  reducer: {
    subscription: persistedSubscriptionReducer,
    device: persistedDeviceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
