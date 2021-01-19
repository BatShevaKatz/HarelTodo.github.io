import { ITodo, TodoActionTypes, SET_TODOS, } from "./types"

export function setTodos(newTodos: ITodo[]): TodoActionTypes {
  return{
    type: SET_TODOS,
    todos: newTodos
  }
}