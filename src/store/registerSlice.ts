import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IRegisterState {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

const initialState:IRegisterState = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
}

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