import {todolistsType} from "../App";
import {v1} from "uuid";
import {RemoveTodoListAC, todolistsReducer} from "./todolists-reducer";

test("correct todolist should be remove", ()=>{
    //тестовые данные
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<todolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    //вызов тестируемой функции:
    const endState = todolistsReducer(startState, RemoveTodoListAC(todolistID2))
    // сверка результата с ожиданием
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID1)
})
