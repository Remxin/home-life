import { Family, User } from "@/types/db.t";
import { createSlice } from "@reduxjs/toolkit";

type FamilySlice = {
    family: Family
    members: User[]
}

const initialState = {} as FamilySlice

const familySlice = createSlice({
    name: "family",
    initialState,
    reducers: {
        setFamily: (state, action) => {
            state.family = action.payload
        },
        setMembers: (state, action) => {
            state.members = action.payload
        }
    }
})

export const { setFamily, setMembers } = familySlice.actions;
export default familySlice.reducer;