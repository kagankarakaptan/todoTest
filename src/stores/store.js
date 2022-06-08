import { configureStore } from "@reduxjs/toolkit";
import addToDoSlice from "./addToDoSlice";
import listSlice from "./listSlice";

export default configureStore({
    reducer: {
        addToDo: addToDoSlice,
        list: listSlice
    }
})