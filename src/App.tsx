import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks]  = useState <Array<TaskType>>( [ //state, setState
        {id: 1, title: "HTML/CSS", isDone: true},
        {id: 2, title: "JS/TS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ])




    const removeTask = (taskID: number) => {
      const filteredTasks= tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)
    }

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
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
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
            />

        </div>
    );
}

export default App;
