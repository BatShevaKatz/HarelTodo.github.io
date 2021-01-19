import { createStore, applyMiddleware, Store } from "redux"
import { todoReducer } from "./reducers"
import thunk from "redux-thunk"
import{ SystemState, SystemAction, DispatchType } from "./types"

export const store: Store<SystemState, SystemAction> & {
  dispatch: DispatchType
} = createStore(todoReducer, applyMiddleware(thunk))