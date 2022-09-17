import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

/**
 * Create interface for better structure
 */
export interface IUserState {
  user: null,
  displayName: string | null | undefined,
  photoURL: string | null | undefined,
}

/**
 * set initial state with default values
 */
const initialState :IUserState = {
  user: null,
  displayName: "",
  photoURL: ""
}

/**
 * Create slice, which is a function that accepts an initial state, an object full of reducer functions, 
 * and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
 */
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