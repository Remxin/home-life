import { configureStore } from "@reduxjs/toolkit";
// types
import { FamilySliceT } from "./familySlice";
import { User } from "@/types/db.t";

// reducers
import UserReducers from "@/redux/userSlice"
import FamilyReducers from "@/redux/familySlice"

import { useSelector, TypedUseSelectorHook } from 'react-redux';

export type StoreRootT = {
    user: User,
    family: FamilySliceT
}

export const useStoreSelector: TypedUseSelectorHook<StoreRootT> =  useSelector

const store = configureStore({
    reducer: {
        user: UserReducers,
        family: FamilyReducers
    }
})




export default store