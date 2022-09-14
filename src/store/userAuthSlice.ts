import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface IUserAuthState {
    USER_LOGIN: string;
    userInfo: {
        displayName: string,
        email: string,
        uid: string,
        authenticating: boolean,
        authenticated: boolean,
        error: null
    }
   
}

const initialState: IUserAuthState = {
    USER_LOGIN: 'USER_LOGIN',
    userInfo: {
        displayName: "",
        email: "",
        uid:"",
        authenticating: false,
        authenticated: false,
        error: null
    }
}

export const userAuthSlice = createSlice({
    name:"userauth",
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.USER_LOGIN = action.payload.type;

            switch (state.USER_LOGIN) {
                case "USER_LOGIN_REQUEST":
                    state.userInfo = {
                        ...state.userInfo,
                        authenticating: true
                    }
                    break;
                case "USER_LOGIN_SUCCES":
                    state.userInfo = {
                        displayName:action.payload.user.displayName,
                        email: action.payload.user.email,
                        uid: action.payload.user.uid,
                        authenticating: false,
                        authenticated: true,
                        error: null
                    }
                    break;
                case "USER_LOGIN_FAILURE":
                    state.userInfo = {
                        ...state.userInfo,
                        error: action.payload.error
                    }
                    break;
            }
        }
    }
})

export const {userLogin} = userAuthSlice.actions;
export default userAuthSlice.reducer;