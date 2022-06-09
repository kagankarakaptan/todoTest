import { createSlice } from "@reduxjs/toolkit";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
const d = new Date();
const date = d.getDate().toString() + " " + monthNames[d.getMonth()] + " " + d.getFullYear().toString();

export const datePicker = createSlice({
    name: "datePicker",

    initialState: {
        choosenDate: date
    },

    reducers: {
        setDatePick: (state, action) => {
            state.choosenDate = action.payload;

        }




    }

})


export const { setDatePick } = datePicker.actions

export default datePicker.reducer;

//adını calender olarak değiştir