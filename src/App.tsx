import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";


type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [todolistID: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistID_1, title: 'What to learn', filter: 'all'},
        {id: todolistID_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML/CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Meat", isDone: false},
        ]
    })


    const removeTask = (taskID: string, todolistID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todolistID] = tasks[todolistID].filter(t=> t.id !==taskID)
        setTasks(copyTasks)
    }
    const addTask = (title: string, todolistID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const copyTasks = {...tasks}
        copyTasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks(copyTasks)
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks(copyTasks)
    }
    const changeTodoListFilter = (filter: FilterValuesType, todolistID: string) => {
        setTodolists(todolists.map(tl=>tl.id === todolistID ? {...tl, filter: filter}: tl))
    }
    const removeTodolist = (todolistID: string) =>{
        setTodolists(todolists.filter(tl=>tl.id !== todolistID))
        delete tasks[todolistID]
    }

    //UI
    const todolistsComponents = todolists.map(tl=> {
        let tasksForRender;
        switch (tl.filter) {
            case "active":
                tasksForRender = tasks[tl.id].filter(t=>!t.isDone)
                break
            case "completed":
                tasksForRender = tasks[tl.id].filter(t=>!t.isDone)
                break
            default:
                tasksForRender = tasks[tl.id]
        }

        return(
            <TodoList
                key={tl.id}
                id={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForRender}
                addTask={addTask}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}
            />)
    })


    return (
        <div className="App">
            {todolistsComponents}
        </div>
    );
}

export default App;
