import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setData, setToggle } from "../stores/listSlice";


export default function Item(props) {

    const dispatch = useDispatch()

    const index = useSelector(state => state.list).todos.findIndex(item => item.id === props.id);
    const list = useSelector(state => state.list).todos;
    const { id, value, tic } = list[index];



    const saveHandler = e => {
        //saves the item value to the db
    }

    const deleteHandler = e => {
        //deletes the item from the db
    }

    return (
        <div>
            <input
                value={value}
                onChange={e => dispatch(setData({ id: id, value: e.target.value }))}
            />
            <input checked={tic} type="checkbox" onChange={e => dispatch(setToggle(id))} />

            <button onClick={saveHandler}>
                Save
            </button>
            <button onClick={deleteHandler}>
                Delete
            </button>
        </div>
    )
}
