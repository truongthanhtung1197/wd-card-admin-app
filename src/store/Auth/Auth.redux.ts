import { Admin } from "@/model/Admin.mode";
import { ValidateLoginOTPResponse } from "@/store/Apis/Api.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ADMIN_ROLE } from "@/constant/admin.constant";
import { RootState } from "..";

const initialState = {
  id: "",
  email: "",
  admin: null as null | Admin,
  roles: null as null | ADMIN_ROLE[],
  accessToken: null as null | string,
  refreshToken: null as null | string,
};

export type AuthStateType = typeof initialState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    verifyOTPSuccess: (
      state: AuthStateType,
      action: PayloadAction<ValidateLoginOTPResponse>,
    ) => {
      return {
        ...state,
        ...action.payload.data,
      };
    },
    setTokens: (
      state,
      action: PayloadAction<{
        accessToken: string | null;
        refreshToken: string | null;
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setAdmin: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.email = "";
      state.roles = [];
      state.admin = null;
    },
  },
});

// Selectors
export const AuthSelector = {
  selectAuthState: (state: RootState) => state.auth,
  selectCurrentUserEmail: (state: RootState) => state.auth.email,
};

export const AuthActions = authSlice.actions;
export const AuthReducer = authSlice.reducer;
