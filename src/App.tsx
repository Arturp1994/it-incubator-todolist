import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks]  = useState <Array<TaskType>>( [ //state, setState
        {id: v1(), title: "HTML/CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])

    let stateWillBack = tasks

    const removeTask = (taskID: string) => {
      const filteredTasks= tasks.filter(t => t.id !== taskID)
        stateWillBack = tasks
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id:v1(),
            title: title,
            isDone: false
        }
        stateWillBack = tasks
        setTasks([newTask,...tasks])
}
    const setLastState = () => {
        setTasks(stateWillBack)
    }
    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const changeTaskStatus = (taskID:string, isDone:boolean)=> {
        setTasks(tasks.map(t => t.id ===taskID ? {...t, isDone: isDone} : t))
    }


    const [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForRender = tasks
    if(filter === 'active'){
        tasksForRender = tasks.filter(t => t.isDone === false)
    };
    if(filter === 'completed'){
        tasksForRender = tasks.filter(t => t.isDone === true)
    };

    return (
        <div className="App">
            <TodoList
                title={'What to do'}
                tasks={tasksForRender}
                addTask={addTask}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                setLastState={setLastState}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />

        </div>
    );
}

export default App;
