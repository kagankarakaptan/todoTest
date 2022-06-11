import Header from "./Header";
import Item from "./Item"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setArray, setObject, setType } from "../stores/listSlice";
import { db } from "../firebase";
import {
    collection,
    query,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useState } from "react";

export default function List() {

    const dispatch = useDispatch();
    const { todos } = useSelector(state => state.list)
    const [groupTypes, setGroupTypes] = useState(["To Do", "In Progress", "Done"])


    useEffect(() => {
        //this will run 1 time at the app begins
        //get all items as data from db according to the date value

        const q = query(collection(db, "user"));
        onSnapshot(q, (querySnapshot) => {
            let newArr = [];
            querySnapshot.forEach((doc) => {
                const newData = { ...doc.data(), id: doc.id };
                newArr.push(newData);
            });

            let tmp = []
            let todoArr = newArr.forEach(e => { if (e.type === "To Do") tmp = [...tmp, e] })
            todoArr = tmp
            tmp = []
            let inProgressArr = newArr.forEach(e => { if (e.type === "In Progress") tmp = [...tmp, e] })
            inProgressArr = tmp;
            tmp = []
            let doneArr = newArr.forEach(e => { if (e.type === "Done") tmp = [...tmp, e] })
            doneArr = tmp
            newArr = [...todoArr, ...inProgressArr, ...doneArr]

            dispatch(setArray(newArr))

        });

    }, [])

    // const draggingId = useRef();
    // const draggingDiv = useRef();
    // const [dragging, setDragging] = useState(false);

    // const handleDragStart = (e, itemId) => {
    //     draggingId.current = itemId;
    //     draggingDiv.current = e.target;
    //     draggingDiv.current.addEventListener("dragend", handleDragEnd)
    //     setDragging(true);

    //     /* console.log("start",draggingId.current) */
    // }

    // const handleDragEnter = (e, item) => {
    //     if (e.target.id !== item.id || item.id === draggingId.current) return null;

    //     const srcI = todos.findIndex(obj => obj.id === draggingId.current)
    //     const desI = todos.findIndex(obj => obj.id === item.id)

    //     if (todos[srcI].type === todos[desI].type) {
    //         dispatch(setObject({ index: srcI, object: todos[desI] }))
    //         dispatch(setObject({ index: desI, object: todos[srcI] }))
    //         console.log(todos[srcI].value + "to" + todos[desI].value)
    //     }
    //     else {
    //         const { type: typeOfSrc, tic: ticOfSrc, ...restOfSrc } = todos[srcI];
    //         const { type: typeOfDes, tic: ticOfDes, ...restOfDes } = todos[desI];


    //         dispatch(setObject({ index: srcI, object: { type: typeOfSrc, tic: ticOfSrc, ...restOfDes } }))
    //         dispatch(setObject({ index: desI, object: { type: typeOfDes, tic: ticOfDes, ...restOfSrc } }))

    //         //bu yanlış amq böyle olmacak!

    //     }

    //     /* if (todos[srcI].type !== todos[desI].type) {
    //         dispatch(setType({ index: srcI, type: todos[srcI].type }))
    //         dispatch(setType({ index: desI, type: todos[desI].type }))
    //     } */


    //     /* dispatch(setArray(oldList => {
    //         let newList = JSON.parse(JSON.stringify(oldList));
    //         newList.splice(item.id, 0, newList.splice(item.id, 1)[0])
    //         draggingId.current = item.id
    //     })) */

    //     /* console.log(item.id); */
    // }

    // const handleDragEnd = e => {
    //     draggingDiv.current.removeEventListener("dragend", handleDragEnd)
    //     draggingId.current = null;
    //     draggingDiv.current = null;
    //     setDragging(false);

    //     /* console.log("end") */
    // }



    const handleOnDragEnd = result => {

        const Reorder = (list, startIndex, endIndex) => {
            const result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);

            return result;
        };

        if (!result.destination) return

        if (result.type === "types") {
            const types = Reorder(
                groupTypes,
                result.source.index,
                result.destination.index
            );
            setGroupTypes(types);

        } else {
            const newArr = Reorder(
                todos,
                result.source.index,
                result.destination.index
            );

            dispatch(setArray(newArr))
        }





        // if (!result.destination) return null;
        // const items = Array.from(groupTypes);
        // const [reorderedItem] = items.splice(result.source.index, 1)
        // items.splice(result.destination.index, 0, reorderedItem)

        // setGroupTypes(items)
    }




    if (todos.length === 0) return null;
    return (
        <div className="list">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="types" type="types">
                    {(provided, snapshot) => (
                        <div className="groups" ref={provided.innerRef}>
                            {groupTypes.map((type, index) => {
                                return (
                                    <Draggable key={type} draggableId={type} index={index}>
                                        {(provided, snapshot) => (
                                            <div className="dnd-group" {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                                                <Header type={type} />
                                                <Droppable droppableId={`types${type}`} type={`${index}`}>
                                                    {(provided, snapshot) => (
                                                        <div ref={provided.innerRef}>
                                                            {todos.map((object, index2) => {
                                                                if (type !== object.type) return null;
                                                                return (
                                                                    <Draggable key={object.id} draggableId={object.id} index={index2}>
                                                                        {(provided, snapshot) => (
                                                                            <div className="dnd-item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                                <Item
                                                                                    id={object.id}
                                                                                />
                                                                                {index2}
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                )
                                                            })}
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable>
                                                {index}
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>









            {/* {groupTypes.map(type => {
                return (
                    <div key={type} className="dnd-group">
                        <Header type={type} />
                        {todos.map(object => {
                            if (type !== object.type) return null;
                            return (
                                <div
                                    key={object.id}
                                    draggable
                                    onDragStart={e => handleDragStart(e, object.id)}
                                    onDragEnter={dragging ? e => handleDragEnter(e, { group: type, id: object.id }) : null}
                                    className="dnd-item"
                                >
                                    <Item
                                        key={object.id}
                                        id={object.id}
                                    />
                                </div>
                            )
                        })}
                    </div>
                )
            })} */}

            {/*  <div key={"todoGroup"} className="dnd-group">
                <Header type="To Do" />
                {todos.map(object => {
                    if ("To Do" !== object.type) return null;
                    return (
                        <div
                            key={object.id}
                            draggable
                            onDragStart={e => handleDragStart(e, object.id)}
                            onDragEnter={dragging ? e => handleDragEnter(e, { group: "To Do", item: object.id }) : null}
                            className="dnd-item"
                        >
                            <Item
                                key={object.id}
                                id={object.id}
                            />
                        </div>
                    )
                })}
            </div>
            <div key={"inProgressGroup"} className="dnd-group">
                <Header type="In Progress" />
                {todos.map(object => {
                    if ("In Progress" !== object.type) return null;
                    return (
                        <div
                            key={object.id}
                            draggable
                            onDragStart={e => handleDragStart(e, object.id)}
                            onDragEnter={dragging ? e => handleDragEnter(e, { group: "In Progress", item: object.id }) : null}
                            className="dnd-item"
                        >
                            <Item
                                key={object.id}
                                id={object.id}
                            />
                        </div>
                    )
                })}
            </div>
            <div key={"doneGroup"} className="dnd-group">
                <Header type="Done" />
                {todos.map(object => {
                    if ("Done" !== object.type) return null;
                    return (
                        <div
                            key={object.id}
                            draggable
                            onDragStart={e => handleDragStart(e, object.id)}
                            onDragEnter={dragging ? e => handleDragEnter(e, { group: "Done", item: object.id }) : null}
                            className="dnd-item"
                        >
                            <Item
                                key={object.id}
                                id={object.id}
                            />
                        </div>
                    )
                })}
            </div> */}

        </div>
    )
}

