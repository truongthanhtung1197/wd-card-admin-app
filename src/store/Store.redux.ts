import { configureStore } from "@reduxjs/toolkit";

import { adminSlice } from "./Apis/Admin.api";
import { apiSlice } from "./Apis/Auth.api";
import { commentSlice } from "./Apis/Comment.api";
import { dashboardApiSlice } from "./Apis/dashboard.api";
import { domainsSlice } from "./Apis/Domain.api";
import { groupSlice } from "./Apis/Group.api";
import { notificationSlice } from "./Apis/Notification.api";
import { ordersSlice } from "./Apis/Order.api";
import { partnerSlice } from "./Apis/Partner.api";
import { seoerSlice } from "./Apis/Seoer.api";
import { serviceSlice } from "./Apis/Service.api";
import { statisticsSlice } from "./Apis/Statistics.api";
import { teamSlice } from "./Apis/Team.api";
import { userSlice } from "./Apis/User.api";
import { userDomainSlice } from "./Apis/UserDomain.api";
import { userReviewSlice } from "./Apis/UserReview.api";
import { AuthReducer } from "./Auth/Auth.redux";
import { CommonReducer } from "./common/common.redux";
import { persistConfig } from "./Store.persist";

import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const rootReducer = combineReducers({
  auth: AuthReducer,
  common: CommonReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [dashboardApiSlice.reducerPath]: dashboardApiSlice.reducer,
  [adminSlice.reducerPath]: adminSlice.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [groupSlice.reducerPath]: groupSlice.reducer,
  [serviceSlice.reducerPath]: serviceSlice.reducer,
  [ordersSlice.reducerPath]: ordersSlice.reducer,
  [domainsSlice.reducerPath]: domainsSlice.reducer,
  [seoerSlice.reducerPath]: seoerSlice.reducer,
  [partnerSlice.reducerPath]: partnerSlice.reducer,
  [userReviewSlice.reducerPath]: userReviewSlice.reducer,
  [commentSlice.reducerPath]: commentSlice.reducer,
  [statisticsSlice.reducerPath]: statisticsSlice.reducer,
  [teamSlice.reducerPath]: teamSlice.reducer,
  [userDomainSlice.reducerPath]: userDomainSlice.reducer,
  [notificationSlice.reducerPath]: notificationSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      ...[
        apiSlice.middleware,
        dashboardApiSlice.middleware,
        adminSlice.middleware,
        userSlice.middleware,
        groupSlice.middleware,
        serviceSlice.middleware,
        ordersSlice.middleware,
        domainsSlice.middleware,
        seoerSlice.middleware,
        partnerSlice.middleware,
        userReviewSlice.middleware,
        commentSlice.middleware,
        statisticsSlice.middleware,
        teamSlice.middleware,
        userDomainSlice.middleware,
        notificationSlice.middleware,
      ],
    ),
});

const persistor = persistStore(store);

export { persistor, store };
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
