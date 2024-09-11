import { Family, User } from "@/types/db.t";
import { createSlice } from "@reduxjs/toolkit";

export type FamilySliceT = {
    family: Family
    members: User[]
}

const initialState = {
    family: {
        id: "",
        name: "",
        owner_id: "",
        created_at: "",
    },
    members: []
} as FamilySliceT

const familySlice = createSlice({
    name: "family",
    initialState,
    reducers: {
        setFamily: (state, action) => {
            state.family = action.payload
        },
        addMember: (state, action) => {
            state.members.push(action.payload)
        },
        setMembers: (state, action) => {
            state.members = action.payload
        }
    }
})

export const { setFamily, setMembers, addMember } = familySlice.actions;
export default familySlice.reducer;