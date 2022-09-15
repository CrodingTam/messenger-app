import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import { RootState } from "./store";

interface IRealtimeUsersSlice {
    GET_REALTIME_USERS: string;
    users:DocumentData[];
   
}

const initialState: IRealtimeUsersSlice = {
    GET_REALTIME_USERS: "GET_REALTIME_USERS",
    users: []
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
        }        
    }
})

export const {setRealtimeUsers, setUsers} = realtimeUsersSlice.actions;
export default realtimeUsersSlice.reducer;