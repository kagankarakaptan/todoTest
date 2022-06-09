import { configureStore } from "@reduxjs/toolkit";
import datePickerSlice from "./datePickerSlice";
import listSlice from "./listSlice";

export default configureStore({
    reducer: {
        list: listSlice,
        datePicker: datePickerSlice
    }
})