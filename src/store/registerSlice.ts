import { createSlice, PayloadAction } from "@reduxjs/toolkit"

/**
 * Create interface for better structure
 */
export interface IRegisterState {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

/**
 * set initial state with default values
 */
const initialState: IRegisterState = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
}

/**
 * Create slice, which is a function that accepts an initial state, an object full of reducer functions, 
 * and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
 */
export const registerSlice = createSlice({
    name:"register",
    initialState,
    reducers: {
        addEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        addPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        addFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        addLastName: (state, action: PayloadAction<string>) => {
            state.lastName = action.payload;
        }
    }
})

export const {addEmail, addFirstName, addLastName, addPassword} = registerSlice.actions;
export default registerSlice.reducer;