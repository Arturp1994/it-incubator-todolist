import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducer() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolist] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ],)

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    function removeTask(id: string, todolistId: string) {
        let action = removeTaskAC(id, todolistId)
        dispatchTasks(action)
    }

    function addTask(title: string, todolistId: string) {
        let action = addTaskAC(title, todolistId)
        dispatchTasks(action)
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let action = changeTaskStatusAC(id, isDone, todolistId)
        dispatchTasks(action)
    }


    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatchTasks(action)
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        let action = ChangeTodolistFilterAC(todolistId, value)
        dispatchTodolist(action)
    }

    function removeTodolist(id: string) {
        let action = RemoveTodolistAC(id)
        dispatchTodolist(action)
        dispatchTasks(action)
    }

    function changeTodolistTitle(id: string, title: string) {
        let action = ChangeTodolistTitleAC(id, title)
        dispatchTodolist(action)
    }

    function addTodolist(title: string) {
        let action = AddTodolistAC(title)
        dispatchTodolist(action)
        dispatchTasks(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;
