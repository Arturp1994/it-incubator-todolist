import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValuesType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function Todolist(props: PropsType) {

    const taskJSX = props.tasks.map((t) => <li key={t.id}><input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={() => {props.removeTask(t.id)}}>x</button>
        </li>)


    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) =>{
        if (e.charCode === 13){
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const addTask = ()=>{
        {props.addTask(newTaskTitle)}
            setNewTaskTitle('')
    }
    const onAllClickHandler = (filter: FilterValuesType) =>{
    return ()=>{props.changeFilter(filter)}
    }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={newTaskTitle}
                           onChange={onNewTitleChangeHandler}
                           onKeyPress={onKeyPressHandler}/>
                    <button onClick={addTask}>+</button>
                </div>
                <ul>
                    {taskJSX}
                </ul>
                <div>
                    <button onClick={onAllClickHandler('all')}>All</button>
                    <button onClick={onAllClickHandler('active')}>Active</button>
                    <button onClick={onAllClickHandler('completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default Todolist;
