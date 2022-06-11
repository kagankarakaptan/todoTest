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

        setObject: (state, action) => {

            state.todos[action.payload.index] = action.payload.object;

        },

        setValue: (state, action) => {
            const { id, value } = action.payload;
            const index = state.todos.findIndex(item => item.id === id);
            state.todos[index].value = value;
        },

        setType: (state, action) => {
            state.todos[action.payload.index].type = action.payload.type;
        }

    }

})


export const { setArray, setObject, setValue, setType } = listSlice.actions

export default listSlice.reducer;

//adını todos olarak değiştir