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
            state[index].value = value;
        },

        setToggle: (state, action) => {
            const index = state.todos.findIndex(item => item.id === action.payload)
            state.todos[index].tic ?
                state.todos[index].type = state.todos[index].previousType :
                state.todos[index].type = "Done"

            state.todos[index].tic = !state.todos[index].tic
        }

    }

})


export const { setArray, setData, setToggle } = listSlice.actions

export default listSlice.reducer;