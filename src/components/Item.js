import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setValue } from "../stores/listSlice";
import {
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";



export default function Item(props) {

    const dispatch = useDispatch()

    const index = useSelector(state => state.list).todos.findIndex(item => item.id === props.id);
    const list = useSelector(state => state.list).todos;
    const { id, value, tic, previousType } = list[index];


    const saveHandler = async e => {
        //saves the item value to the db
        await updateDoc(doc(db, "user", id), { value: value })
    }

    const deleteHandler = async e => {
        //deletes the item from the db
        await deleteDoc(doc(db, "user", id));
    }

    const setToggle = async e => {
        await updateDoc(doc(db, "user", id), tic ? { tic: false, type: previousType } : { tic: true, type: "Done" })
    }

    return (
        <div>
            <input
                value={value}
                onChange={e => dispatch(setValue({ id: id, value: e.target.value }))}
            />
            <input checked={tic} type="checkbox" onChange={setToggle} />
            <button onClick={saveHandler}>
                Save
            </button>
            <button onClick={deleteHandler}>
                Delete
            </button>
        </div>
    )
}
