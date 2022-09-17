import { createSlice, PayloadAction } from "@reduxjs/toolkit"

/**
 * Create interface for better structure
 */
export interface ILoginState {
    email: string,
    password: string,
}

/**
 * set initial state with default values
 */
const initialState:ILoginState = {
    email: "",
    password: ""
}

/**
 * Create slice, which is a function that accepts an initial state, an object full of reducer functions, 
 * and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
 */
export const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        }
    }
})

export const {setEmail, setPassword} = loginSlice.actions;
export default loginSlice.reducer;