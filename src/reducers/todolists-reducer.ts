import {FilterValuesType, todolistsType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
type AddTodoListAT={
    type: "ADD-TODOLIST"
    title: string
    id: string
}
type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST_TITLE"
    id: string
    title: string
}
type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST_FILTER"
    id: string
    filter: FilterValuesType
}

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todolistsReducer = (todolists: Array<todolistsType>, action: ActionType): Array<todolistsType>=>{
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoList: todolistsType = {
                id: action.id,
                title: action.title,
                filter: "all"
            }
            return ([newTodoList, ...todolists])
        case "CHANGE-TODOLIST_TITLE":
            return todolists.map(filtered => filtered.id === action.id ? {...filtered, title: action.title} : filtered)
        case "CHANGE-TODOLIST_FILTER":
            return todolists.map(filtered => filtered.id === action.id ? {...filtered, filter: action.filter} : filtered)
        default:
            return todolists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT =>({
    type: "REMOVE-TODOLIST",
    id: id
})
export const AddTodoListAC = (title: string, id:string): AddTodoListAT =>({
    type: "ADD-TODOLIST",
    title: title,
    id: id
})
export const ChangeTodoListTitleAC = (id:string,title: string):ChangeTodoListTitleAT=>({
    type: "CHANGE-TODOLIST_TITLE",
    id: id,
    title: title
})
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType):ChangeTodoListFilterAT=>({
    type: "CHANGE-TODOLIST_FILTER",
    id: id,
    filter: filter
})