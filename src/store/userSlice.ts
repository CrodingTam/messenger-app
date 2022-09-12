import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface IUserState {
  user: null,
  displayName: string | null | undefined,
}

const initialState :IUserState = {
  user: null,
  displayName: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      login: (state, action) => {
        state.user = action.payload;
      },
      logout: (state) => {
        state.user = null;
      },
      setDisplayName: (state, action:PayloadAction<string|null|undefined>) => {
        state.displayName = action.payload;
      }
    },
  });
  
  export const { login, logout, setDisplayName } = userSlice.actions;
  
  // selectors
  export const selectUser = (state:RootState) => state.user.user;
  
  export default userSlice.reducer;