import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import registerReducer from "./registerSlice";
import userReducer from "./userSlice";
import userAuthReducer from "./userAuthSlice";
import realtimeUsersReducer from "./realtimeUsersSlice";
import thunk from "redux-thunk";

/**
 * A friendly abstraction over the standard Redux createStore() function.
 * 
    @param config — The store configuration.
    @returns — A configured Redux store.
 */
export const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
        user: userReducer,
        userAuth: userAuthReducer,
        realtimeUsers: realtimeUsersReducer
    },
    middleware:[thunk]
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch