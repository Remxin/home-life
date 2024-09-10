import { configureStore } from "@reduxjs/toolkit";
import UserReducers from "@/redux/userSlice"

const store = configureStore({
    reducer: {
        user: UserReducers
    }
})


export default store