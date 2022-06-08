import { createSlice } from "@reduxjs/toolkit";

export const addToDoSlice = createSlice({
    name: "AddToDo",
    initialState: {
        value: "asd"
    },
    reducers: {
        setItem: (state, action) => {
            state.value = action.payload;
        }

    }
})

export const { setItem } = addToDoSlice.actions

export default addToDoSlice.reducer;