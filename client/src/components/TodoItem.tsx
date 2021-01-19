import React, {useState} from "react"
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void
  deleteTodo: (_id: string) => void
}

const TodoItem: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const [openPopup, setOpenPopup] = useState<boolean | any>()
  const [formData, setFormData] = useState<ITodo | {}>()

  const handleOpenPopup = (open: boolean): void => {
    setOpenPopup(open)
  }

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
      _id: todo._id
    })
  }

  const handleEditTodo = (e: React.FormEvent, formData: ITodo | any): void => {
    e.preventDefault()
    updateTodo(formData)
    handleOpenPopup(false)
  }

  const {_id, title, done, __v, ...newTodo} = todo;
  const checkTodo = todo.done? 'line-through' : ""
  return (
    <tr>
      <td className={checkTodo}>{todo.title}</td>
      { Object.values(newTodo).map((value, index) => {
        return <td>{value}</td>
      })}
      <td>
        <Popup open={openPopup} closeOnDocumentClick={false} closeOnEscape={false}>          
          <form className='Form' onSubmit={(e) => handleEditTodo(e, formData)}>
            <div>
              <div>
                <label htmlFor='title'>Edit Title:</label>
                <input onChange={handleForm} type='text' id='title' defaultValue={todo.title}/>
              </div>
            </div>
            <button disabled={formData === undefined? true : false} className="btn btn-success">Update Todo</button>
          </form>
          <button className="btn btn-outline-danger" onClick={(e) => handleOpenPopup(false)}>Cancel</button>         
        </Popup>
        <button 
          onClick={() => handleOpenPopup(true)}
          className={todo.done ? 'invisible' : 'btn btn-outline-primary'}>
          Edit
        </button>
        <button
          onClick={(e) => handleEditTodo(e, {...todo, done: true})}
          className={todo.done ? 'invisible' : 'btn btn-outline-success'}
        >
          Done
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className='btn btn-outline-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default TodoItem