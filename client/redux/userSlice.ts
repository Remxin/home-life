import { User } from "@/types/db.t";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    full_name: "",
    email: "",
    is_verified: false,
    password_changed_at: "",
    created_at: ""
} as User

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state = action.payload
        }
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;