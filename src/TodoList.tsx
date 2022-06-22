import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import './App.css';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todolistID: string) => void
    filter: FilterValuesType
    changeTodoListFilter: (filter: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const tasksJSX = props.tasks.length ? props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id, props.id)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
            const taskClasses = []
            if (t.isDone) taskClasses.push('isDone')

            return (
                <li key={t.id}><input
                    onChange={changeTaskStatus}
                    type="checkbox"
                    checked={t.isDone}
                />
                    <span className={taskClasses.join(' ')}>{t.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>

            )
        })
        : <span>Create your first task!</span>

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.id)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const getOnClickHandler = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter, props.id)
    }


    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addTask()
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError(false)
    }
    const removeTodoList = () => {
      props.removeTodolist(props.id)
    }
    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodoList}>Del</button>
            </h3>
            <div>
                <input value={title}
                       onChange={onChangeSetTitle}
                       onKeyDown={onKeyDownAddTask}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div style={{color: "red"}}>Title is required!</div>}
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? 'active' : ''}
                    onClick={getOnClickHandler('all')}>All
                </button>
                <button
                    className={props.filter === "active" ? 'active' : ''}
                    onClick={getOnClickHandler('active')}>Active
                </button>
                <button
                    className={props.filter === "completed" ? 'active' : ''}
                    onClick={getOnClickHandler('completed')}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;