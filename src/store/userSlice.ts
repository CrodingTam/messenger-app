import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface IUserState {
  user: null,
  displayName: string | null | undefined,
  photoURL: string | null | undefined,
}

const initialState :IUserState = {
  user: null,
  displayName: "",
  photoURL: ""
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
      },
      setphotoURL: (state, action: PayloadAction<string|null|undefined>) => {
        state.photoURL = action.payload;
      }
    },
  });
  
  export const { login, logout, setDisplayName, setphotoURL } = userSlice.actions;
  
  // selectors
  export const selectUser = (state:RootState) => state.user.user;
  
  export default userSlice.reducer;