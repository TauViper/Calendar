import '../toDo/ToDos.css'

// import { nanoid } from 'nanoid';
// import { Tasks } from '../../App'
// import { useSelector } from 'react-redux';
import { FC, useState } from 'react'
import { useAppDispatch } from '../../store/store'
import { useAppSelector } from '../../store/store'
import {
    addTask,
    editTask,
    removeTask,
    toggleTask,
} from '../../store/toDoSlice'

export const Todos: FC<{
    date: string
    // exercise: Tasks;
    // setExercise: any
}> = ({
    date,
    // exercise,
    // setExercise,
}) => {
    const [todo, setTodo] = useState('')
    const [saveEdit, setSaveEdit] = useState('')

    const dispatch = useAppDispatch()
    const todoList = useAppSelector((state) => state.list)

    const addExercise = () => {
        // if (todo && exercise[date]) {
        //   exercise[date].push({ id: nanoid(), value: todo, completed: false });
        // } else if (todo) {
        //   setExercise({
        //     ...exercise,
        //     [date]: [{ id: nanoid(), value: todo, completed: false }],
        //   });
        // }
        if (todo) {
            dispatch(addTask({ date, todo }))
        }
        setTodo('')
    }
    const pressEnter = (e: { keyCode: number }) => {
        if (e.keyCode === 13) {
            saveEdit
                ? handleEditTodo({ value: todo, id: saveEdit })
                : addExercise()
        }
    }
    const toggle = (id: string) => {
        // const newExercise = exercise[date].map((el) =>
        //     el.id === id ? { ...el, completed: !el.completed } : { ...el }
        // )
        // setExercise({ ...exercise, [date]: newExercise })
        dispatch(toggleTask({ date, id }))
    }
    const removeItem = (id: string) => {
        // const del = exercise[date].filter((el) => el.id !== id)
        // setExercise({ ...exercise, [date]: del })
        dispatch(removeTask({ date, id }))
    }
    const editTodo = (item: { value: string; id: string }) => {
        setTodo(item.value)
        setSaveEdit(item.id)
    }

    const handleEditTodo = (item: { value: string; id: string }) => {
        if (saveEdit) {
            // const saveExercise = exercise[date].map((item) =>
            //     item.id === saveEdit
            //         ? { ...item, value: todo, completed: false }
            //         : item
            // )
            // setExercise({ ...exercise, [date]: saveExercise })
            dispatch(editTask({ date, id: item.id, value: item.value }))

            setTodo('')
            setSaveEdit('')
        }
    }

    return (
        <div className="todo__Box">
            <h1>Список задач {todoList[date] ? todoList[date].length : 0}</h1>
            <div className="todo__input">
                <input
                    type="text"
                    value={todo}
                    onChange={(e) => {
                        setTodo(e.target.value)
                    }}
                    onKeyDown={pressEnter}
                />

                {saveEdit ? (
                    <button
                        onClick={() =>
                            handleEditTodo({ value: todo, id: saveEdit })
                        }
                    >
                        Save
                    </button>
                ) : (
                    <button onClick={() => addExercise()}>Add exercise</button>
                )}
            </div>
            <div>
                <ul>
                    {todoList[date] &&
                        todoList[date].map((item) => (
                            <li className="Item__Todo" key={item.id}>
                                <div
                                    role="presentation"
                                    onClick={() => toggle(item.id)}
                                    className={
                                        item.completed
                                            ? 'Item__Li_done'
                                            : 'Item__Li'
                                    }
                                    key={item.id}
                                >
                                    {item.value}
                                </div>
                                <button onClick={() => editTodo(item)}>
                                    Edit
                                </button>
                                <button onClick={() => removeItem(item.id)}>
                                    X
                                </button>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}
