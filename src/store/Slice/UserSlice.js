import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
         setUser: (state, action) => {
             state.user = action.payload;
         },
    }
})

export const { setToken, setUser } = UserSlice.actions
export default UserSlice