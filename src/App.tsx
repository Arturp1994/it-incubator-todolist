import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTodolist (todolistID: string){
        let filterTodolist = todolists.filter(tl=>tl.id !== todolistID)
        setTodolists(filterTodolist)
        delete tasks[todolistID]
        setTasks({...tasks})
    }

    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter(t => t.id != id)})
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]:[newTask,...tasks[todolistID]]})

    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]:tasks[todolistID].map(m=>m.id===taskId ? {...m, isDone:isDone}: m)})

    }
    const changeTaskTitle = (taskId:string, title:string, todolistID:string) => {
        setTasks({...tasks, [todolistID]:tasks[todolistID].map(m=>m.id===taskId ? {...m, title:title}: m)})
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(filtered=>filtered.id===todolistID ? {...filtered, filter: value} : filtered))
    }

    function changeTodolistTitle(todolistID: string, title: string) {
        setTodolists(todolists.map(filtered=>filtered.id===todolistID ? {...filtered, title: title} : filtered))
    }

const addTodoList = (title:string) => {
    const newTodoListID = v1()
    const newTodoList: todolistsType = {
        id: newTodoListID,
        title:title,
        filter: "all"
  }
    setTodolists([newTodoList,...todolists])
    setTasks({...tasks, [newTodoListID]:[]})
}
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todolists.map((t) => {
                let tasksForTodolist = tasks[t.id];
                if (t.filter === "active") {
                    tasksForTodolist = tasks[t.id].filter(t => t.isDone === false);
                }
                if (t.filter === "completed") {
                    tasksForTodolist = tasks[t.id].filter(t => t.isDone === true);
                }
                return (

                    <Todolist
                        key={t.id}
                        todolistID={t.id}
                        title={t.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={t.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })}

        </div>
    );
}

export default App;
