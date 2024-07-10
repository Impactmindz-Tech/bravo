import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slice/UserSlice";
import GroupSlice from "./Slice/GroupSlice";

export const store = configureStore({
    reducer: {
         [UserSlice.name]: UserSlice.reducer,
         [GroupSlice.name]: GroupSlice.reducer,
    },
});