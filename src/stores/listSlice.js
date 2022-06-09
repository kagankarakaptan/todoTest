import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({
    name: "List",

    initialState: {
        todos: [],
    },

    reducers: {

        setArray: (state, action) => {
            state.todos = action.payload
        },

        setData: (state, action) => {
            const { id, value } = action.payload;
            const index = state.todos.findIndex(item => item.id === id);
            state.todos[index].value = value;
        },

    }

})


export const { setArray, setData } = listSlice.actions

export default listSlice.reducer;

//adını todos olarak değiştir