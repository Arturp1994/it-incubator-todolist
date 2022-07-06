import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {HighlightOff} from "@material-ui/icons";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistID: string
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistID: string) => void
    changeTodolistTitle: (todolistID: string, title: string) => void
}

export function Todolist(props: PropsType) {


    const addTask = (title: string) => {
        props.addTask(props.todolistID, title)
    }


    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");
    const removeTodolist = () => props.removeTodolist(props.todolistID)
    const changeTodoListTitle = (todolistTitle: string) => props.changeTodolistTitle(props.todolistID, todolistTitle)


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodolist} size={'small'}>
                    <HighlightOff/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none"}}>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                        }
                        const changeTaskTitle = (taskTitle: string) => {
                            props.changeTaskTitle(t.id, taskTitle, props.todolistID)
                        }
                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox size={'small'} color={'primary'} onChange={onChangeHandler} checked={t.isDone}/>
                            <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                            <IconButton onClick={onClickHandler} size={'small'}>
                                <HighlightOff/>
                            </IconButton>
                            {/*<button onClick={onClickHandler}>x</button>*/}
                        </li>
                    })
                }
            </ul>
            <div>
                <Button size={'small'}
                        variant={'contained'}
                        color={props.filter === 'all' ? "secondary" :'primary'}
                        disableElevation
                        onClick={onAllClickHandler}>All</Button>
                <Button size={'small'}
                        variant={'contained'}
                        color={props.filter === 'active' ? "secondary" : 'primary'}
                        disableElevation
                        onClick={onActiveClickHandler}>Active</Button>
                <Button size={'small'}
                        variant={'contained'}
                        color={props.filter === 'completed' ? "secondary" :'primary'}
                        disableElevation
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}
