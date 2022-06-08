import Header from "./Header";
import Item from "./Item"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addData } from "../stores/listSlice";


export default function List() {

    const dispatch = useDispatch();
    const data = useSelector(state => state.list)

    const sampleData = [{ value: "1", type: "To Do", date: "" },
    { value: "2", type: "To Do", date: "" },
    { value: "3", type: "To Do", date: "" },
    { value: "4", type: "To Do", date: "" },
    { value: "5", type: "To Do", date: "" },
    { value: "6", type: "To Do", date: "" },
    { value: "7", type: "Done", date: "" },
    { value: "8", type: "Done", date: "" },
    { value: "9", type: "Done", date: "" },
    { value: "10", type: "Done", date: "" },
    { value: "11", type: "Done", date: "" },
    { value: "12", type: "Done", date: "" },
    { value: "13", type: "Done", date: "" },
    { value: "14", type: "In Progress", date: "" },
    { value: "15", type: "In Progress", date: "" },
    { value: "16", type: "In Progress", date: "" },
    { value: "17", type: "In Progress", date: "" },
    { value: "18", type: "In Progress", date: "" },
    { value: "19", type: "In Progress", date: "" },
    { value: "20", type: "In Progress", date: "" }]

    useEffect(() => {
        //this will run 1 time at the app begins
        //get all items as data from db according to the date value

        /* sampleData.map((obj, i) => {
            dispatch(addData({ id: i, ...obj, tic: false, previousType: obj.type }))
        }) */

        /*  const q = query(collection(db, "todos"));
         const unsub = onSnapshot(q, (querySnapshot) => {
             let data = [];
             querySnapshot.forEach((doc) => {
                 data.push({ ...doc.data(), id: doc.id });
             });
             setTodos(data);
         });
         return () => unsub();
  */

    }, [])



    const dataParser = (type) => data.map(element => {
        if (type !== element.type) return null;
        return (
            <Item
                key={element.id}
                id={element.id}
            />
        )


    });

    if (data.length === 0) return null;
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
