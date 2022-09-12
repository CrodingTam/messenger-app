import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ILoginState {
    email: string,
    password: string,
}

const initialState:ILoginState = {
    email: "",
    password: ""
}

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