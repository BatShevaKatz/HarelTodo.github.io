import * as React from 'react'

type Props = TodosProps

const TodoTableHeader: React.FC<Props> = ({ todos }) => {
  if( todos && todos.length){
    const {done, __v, ...newTodo} = todos[0];
    const headers = Object.keys(newTodo);
    return(
      <div className="list-group-item list-group-item-secondary" key="todo-header">
        { headers && headers.map((value, index) => {
          return index !==0 ? <span key={index}>{value}</span> : <></>
        })}
        <div key='action'></div>
      </div>
    )
  }
  else return (<></>)
}

export default TodoTableHeader