import { collection, addDoc } from "firebase/firestore";
import { useState } from "react"
import { db } from "../firebase";


export default function AddToDo() {

    const [value, setValue] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        if (value !== "") {
            //send the item data to db

            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
            const d = new Date();
            const today = d.getDate().toString() + " " + monthNames[d.getMonth()] + " " + d.getFullYear().toString();

            await addDoc(collection(db, "user"), {
                value: value,
                tic: false,
                type: "To Do",
                previousType: "To Do",
                date: today
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
