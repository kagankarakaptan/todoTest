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

        setObject: (state, action) => {

            state.todos[action.payload.index] = action.payload.object;

        },
        setType: (state, action) => {
            state.todos[action.payload.index].type = action.payload.type;
        }

    }

})


export const { setArray, setData, setObject, setType } = listSlice.actions

export default listSlice.reducer;

//adını todos olarak değiştir