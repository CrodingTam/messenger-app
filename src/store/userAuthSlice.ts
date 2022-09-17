import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

/**
 * Create interface for better structure
 */
interface IUserAuthState {
    USER_LOGIN: string;
    USER_LOGOUT: string;
    userInfo: {
        displayName: string,
        email: string,
        uid: string,
        authenticating: boolean,
        authenticated: boolean,
        error: null
    }
   
}

/**
 * set initial state with default values
 */
const initialState: IUserAuthState = {
    USER_LOGIN: 'USER_LOGIN',
    userInfo: {
        displayName: "",
        email: "",
        uid: "",
        authenticating: false,
        authenticated: false,
        error: null
    },
    USER_LOGOUT: "USER_LOGOUT"
}

/**
 * Create slice, which is a function that accepts an initial state, an object full of reducer functions, 
 * and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
 */
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
        },
        userLogout: (state, action) => {
            state.USER_LOGOUT = action.payload.type;

            switch (state.USER_LOGOUT) {
                case "USER_LOGOUT_REQUEST":
                    break;
                case "USER_LOGOUT_SUCCES":
                    state.userInfo = {
                        ...initialState.userInfo
                    }
                    break;
                case "USER_LOGOUT_FAILURE":
                    state.userInfo = {
                        ...state.userInfo,
                        error: action.payload.error
                    }
                    break;
                
            }
        }
    }
})

export const {userLogin, userLogout} = userAuthSlice.actions;
export default userAuthSlice.reducer;