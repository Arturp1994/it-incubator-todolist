import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValuesType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    filter:FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function Todolist(props: PropsType) {

    const taskJSX = props.tasks.map((t) => <li key={t.id} className={t.isDone ? 'is_Done': ''}>

        <input
            onChange={(e) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked)
            }}
            type="checkbox"
            checked={t.isDone}/>
        <span>{t.title}</span>
        <button onClick={() => {
            props.removeTask(t.id)
        }}>x
        </button>
    </li>)


    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required')
        }
    }

    const onAllClickHandler = (filter: FilterValuesType) => {
        return () => {
            props.changeFilter(filter)
        }
    }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={newTaskTitle}
                           onChange={onNewTitleChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           className={error ? 'error': ''}/>
                    <button onClick={addTask}>+</button>
                    { error && <div className='error-message'>{error}</div>}
                </div>
                <ul>
                    {taskJSX}
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active-filter': ''} onClick={onAllClickHandler('all')}>All</button>
                    <button className={props.filter === 'active' ? 'active-filter': ''} onClick={onAllClickHandler('active')}>Active</button>
                    <button className={props.filter === 'completed' ? 'active-filter': ''} onClick={onAllClickHandler('completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default Todolist;
