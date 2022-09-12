import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice"
import registerReducer from "./registerSlice"
import userReducer from "./userSlice"

export const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
        user: userReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch