import React, { useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { SystemState } from './store/types'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import { getTodos, addTodo, updateTodo, deleteTodo, clearAllTodos } from './API/API'
import { Dispatch } from 'redux'
import { setTodos } from './store/actions'

const TodoPage: React.FC = () => {

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = (): void => {
    getTodos()
    .then(({ data: { todos } }: ITodo[] | any) => {
      onSetTodos(todos)
    })
    .catch((err: Error) => console.log(err))
  }

  const dispatch: Dispatch<any> = useDispatch()
  const onSetTodos = React.useCallback(
    (todos: ITodo[]) => dispatch(setTodos(todos)),
    [dispatch]
  )

  const handleFilterTodoList = (todos: ITodo[]): void => {
    const newTodos: ITodo[] = [...todos]
    onSetTodos(newTodos)
  }

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault()
    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Todo not saved")
        }
        onSetTodos(data.todos)
      })
      .catch(err => console.log(err))
  }  

  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated")
        }
        onSetTodos(data.todos)
      })
      .catch(err => console.log(err))
  }
  
  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted")
        }
        onSetTodos(data.todos)
      })
      .catch(err => console.log(err))
  }

  const handleClearAllTodos = (): void =>{
    clearAllTodos()
    .then(({ data: { todos } }: ITodo[] | any) => {
      onSetTodos(todos)
    })
    .catch((err: Error) => console.log(err))
  }

  const todos: ITodo[] = useSelector(
    (state: SystemState) => state.todos
  )

  return (
    <main className='App'>
      <h1>My Todos Tasks</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      <TodoList
        todos={todos}
        handleUpdateTodo={handleUpdateTodo}
        handleDeleteTodo={handleDeleteTodo}
        handleFilterTodoList={handleFilterTodoList}
      />
      <div className="clear-all-btn">
        <button 
        disabled={todos && todos.length? false : true}
        onClick={() => handleClearAllTodos()}
        className="btn btn-outline-danger">Clear All Todos</button>
      </div>
    </main>
  )
}

export default TodoPage
