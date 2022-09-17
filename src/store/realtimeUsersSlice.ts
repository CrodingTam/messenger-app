import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import { RootState } from "./store";

/**
 * Create interface for better structure
 */
interface IRealtimeUsersSlice {
    GET_REALTIME_USERS: string;
    GET_REALTIME_MESSAGES: string;
    users: DocumentData[];
    conversations: any[]
   
}

/**
 * set initial state with default values
 */
const initialState: IRealtimeUsersSlice = {
    GET_REALTIME_USERS: "GET_REALTIME_USERS",
    GET_REALTIME_MESSAGES: "GET_REALTIME_MESSAGES",
    users: [],
    conversations: [],
    
}

/**
 * Create slice, which is a function that accepts an initial state, an object full of reducer functions, 
 * and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
 */
export const realtimeUsersSlice = createSlice({
    name:"realtimeUsers",
    initialState,
    reducers: {
        setRealtimeUsers: (state, action:PayloadAction<string>) => {
            state.GET_REALTIME_USERS = action.payload;
        },
        setUsers: (state, action:PayloadAction<DocumentData[]>) => {
            switch (state.GET_REALTIME_USERS) {
                case "GET_REALTIME_USERS_REQUEST":
                    break;
                    
                case "GET_REALTIME_USERS_SUCCES":
                    state.users = action.payload;
                    break;

                case "GET_REALTIME_USERS_REQUEST":
                    break;
            }
        },
        setRealtimeConversation: (state, action:PayloadAction<string>) => {
            state.GET_REALTIME_MESSAGES = action.payload;
        },
        setConversations: (state, action:PayloadAction<any[]>) => {
            switch (state.GET_REALTIME_MESSAGES) {
                case "GET_REALTIME_MESSAGES":
                    state.conversations = action.payload
                    console.log(state.conversations.length);
                    break;
                case "GET_REALTIME_MESSAGES_FAILURE":
                    break;
            }
        }
    }
})

export const {setRealtimeUsers, setUsers, setRealtimeConversation, setConversations} = realtimeUsersSlice.actions;
export default realtimeUsersSlice.reducer;