import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setItem } from "../stores/addToDoSlice";



export default function AddToDo() {

    const {value} = useSelector(state => state.addToDo)
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        if (value !== "") {
            //send the item data to db
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="+New"
                    value={value}
                    onChange={e => dispatch(setItem(e.target.value))}
                    onFocus={e => e.target.placeholder = ""}
                    onBlur={e => e.target.placeholder = "+New"}
                />
                <button>Add</button>
            </form>
        </div>
    )
}
