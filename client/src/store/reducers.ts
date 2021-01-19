import {
  ITodo,
  SystemState,
  SET_TODOS,
  TodoActionTypes} from "./types"

const initialState: SystemState = {
  todos: []
}

export function todoReducer(
  state: SystemState = initialState,
  action: TodoActionTypes
): SystemState {
  switch (action.type){
    case SET_TODOS:
      return{
        ...state,
        todos: action.todos
      }
    default:
      return state
  }
}