import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slice/UserSlice";
import GroupSlice from "./Slice/GroupSlice";
import AdminSlice from "./Slice/AdminSlice";
import EventSlice from "./Slice/EventSlice";
import ParticipantsSlice from "./Slice/EventParticipantsSlice";

export const store = configureStore({
    reducer: {
         [UserSlice.name]: UserSlice.reducer,
         [GroupSlice.name]: GroupSlice.reducer,
         [AdminSlice.name]: AdminSlice.reducer, 
         [EventSlice.name]: EventSlice.reducer, 
         [ParticipantsSlice.name]: ParticipantsSlice.reducer, 
    },
});