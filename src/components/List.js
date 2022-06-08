import Header from "./Header";
import Item from "./Item"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setArray } from "../stores/listSlice";
import { db } from "../firebase";
import {
    collection,
    query,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";


export default function List() {

    const dispatch = useDispatch();
    const { todos } = useSelector(state => state.list)

    useEffect(() => {
        //this will run 1 time at the app begins
        //get all items as data from db according to the date value

        const d = new Date();
        const date = d.getDate().toString() + "." + (d.getMonth() + 1).toString() + "." + d.getFullYear().toString();
        //get the selected date from calender instead

        const q = query(collection(db, date));
        onSnapshot(q, (querySnapshot) => {
            let newArr = [];
            querySnapshot.forEach((doc) => {
                const newData = { ...doc.data(), id: doc.id };
                newArr.push(newData);
            });
            dispatch(setArray(newArr))

        });

    }, [])



    const dataParser = (type) => todos.map(element => {
        /* console.log(element) */
        if (type !== element.type) return null;
        return (
            <Item
                key={element.id}
                id={element.id}
            />
        )


    });

    if (todos.length === 0) return null;
    return (
        <div>
            <div>
                <Header type="To Do" />
                {dataParser("To Do")}
            </div>
            <div>
                <Header type="In Progress" />
                {dataParser("In Progress")}
            </div>
            <div>
                <Header type="Done" />
                {dataParser("Done")}
            </div>
        </div>
    )
}
