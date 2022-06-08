import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { useState } from "react"
import { db } from "../firebase";


export default function AddToDo() {

    const [value, setValue] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        if (value !== "") {
            //send the item data to db

            const d = new Date();
            const date = d.getDate().toString() + "." + (d.getMonth() + 1).toString() + "." + d.getFullYear().toString();

            await addDoc(collection(db, date), {
                value: value,
                tic: false,
                type: "To Do",
                previousType: "To Do"
            });
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="+New"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onFocus={e => e.target.placeholder = ""}
                    onBlur={e => e.target.placeholder = "+New"}
                />
                <button>Add</button>
            </form>
        </div>
    )
}
