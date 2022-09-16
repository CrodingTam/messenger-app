import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import { RootState } from "./store";

interface IRealtimeUsersSlice {
    GET_REALTIME_USERS: string;
    GET_REALTIME_MESSAGES: string;
    users: DocumentData[];
    conversations: DocumentData[]
   
}

const initialState: IRealtimeUsersSlice = {
    GET_REALTIME_USERS: "GET_REALTIME_USERS",
    GET_REALTIME_MESSAGES: "GET_REALTIME_MESSAGES",
    users: [],
    conversations: [],
    
}

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
        setConversations: (state, action:PayloadAction<DocumentData[]>) => {
            switch (state.GET_REALTIME_MESSAGES) {
                case "GET_REALTIME_MESSAGES":
                    state.conversations = action.payload
                    break;
                case "GET_REALTIME_MESSAGES_FAILURE":
                    break;
            }
        }
    }
})

export const {setRealtimeUsers, setUsers, setRealtimeConversation, setConversations} = realtimeUsersSlice.actions;
export default realtimeUsersSlice.reducer;