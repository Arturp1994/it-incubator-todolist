import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";


export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {


    let [tasks, setTasks]=useState<Array<TaskType>>([
        {id:1, title: 'CSS', isDone: true},
        {id:2, title: 'JS', isDone: false},
        {id:3, title: 'HTML', isDone: true}
    ])

    let [filter, setFilter]=useState<FilterValuesType>('all')

    function removeTask(id: number){
        let filterTasks = tasks.filter( t => t.id !==id);
        setTasks(filterTasks)
    }

    function changeFilter (value:FilterValuesType ) {
        setFilter(value)
    }

    let taskForTodolist = tasks;
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(t=>t.isDone === true);
    }
    if (filter === 'active') {
        taskForTodolist = tasks.filter(t=>t.isDone === false);
    }

    return (
        <div className="App">
        <Todolist title={'What to learn'}
                  tasks={taskForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
