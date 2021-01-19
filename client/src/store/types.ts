import {type} from "os"

export const SET_TODOS = 'SET_TODOS'

export interface ITodo {
  _id: string
  title: string
  done: boolean
  createdAt?: string
  updatedAt?: string
  __v?: number
}

export interface SystemState {
  todos: ITodo[]
}

export type SystemAction = {
  type: string
  todo?: ITodo
}

export type DispatchType = (args: SystemAction) => SystemAction

interface SetTodoAction{
  type: typeof SET_TODOS,
  todos: ITodo[]
}

export type TodoActionTypes = SetTodoAction