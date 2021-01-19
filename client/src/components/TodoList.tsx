import React from 'react'
import TodoItem from './TodoItem'
import Table from 'react-bootstrap/Table'


type Props = TodosProps & {
  handleUpdateTodo: (todo: ITodo) => void
  handleDeleteTodo: (_id: string) => void
  handleFilterTodoList: (todos: ITodo[]) => void
}

const TodoList: React.FC<Props> = ({todos, handleUpdateTodo, handleDeleteTodo, handleFilterTodoList}) => {

  const sortTableByCreateDate = ():void => {
    todos.sort((a, b): number => 
      +new Date(a.createdAt).getTime() - +new Date(b.createdAt).getTime()
    )
    handleFilterTodoList(todos)
  }

  const sortTableByModifyDate = ():void => {
    todos.sort((a, b): number => 
      +new Date(a.updatedAt).getTime() - +new Date(b.updatedAt).getTime()
    )
    handleFilterTodoList(todos)
  }

  return (
    <div>
      <Table>
        <thead>
          <th>Title</th>
          <th onClick={() => sortTableByCreateDate()}>Date Created</th>
          <th onClick={() => sortTableByModifyDate()}>Date Uptaded</th>
          <th id="todoActions"></th>
        </thead>
        <tbody>
          {todos && todos.map((todo: ITodo) =>(
            <TodoItem
              key={todo._id}
              updateTodo={handleUpdateTodo}
              deleteTodo={handleDeleteTodo}
              todo={todo}
            />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default TodoList