import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({
    name: "List",

    initialState: [],

    reducers: {

        addData: (state, action) => {

            state.push(action.payload);

        },

        setData: (state, action) => {
            const { id, value } = action.payload;
            const index = state.findIndex(item => item.id === id);
            state[index].value = value;
        },

        setToggle: (state, action) => {
            const index = state.findIndex(item => item.id === action.payload)
            state[index].tic ?
                state[index].type = state[index].previousType :
                state[index].type = "Done"

            state[index].tic = !state[index].tic
        }
    }

})


export const { addData, setData, setToggle } = listSlice.actions

export default listSlice.reducer;