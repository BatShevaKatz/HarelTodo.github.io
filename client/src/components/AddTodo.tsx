import React, { useState } from 'react'

type Props = { 
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void 
}

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo | any>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const handleAddTodo = (e: React.FormEvent, formData: ITodo): void => {
    saveTodo(e, formData)
    setFormData({
      ...formData,
      title: "",
    })
  }

  const undefinedFormData = (formData === undefined|| formData.title === "")
  return (
    <form className='Form' onSubmit={(e) => handleAddTodo(e, formData)}>
      <div>
        <label>Title:</label>
        <input onChange={handleForm} type='text' id='title' value={undefinedFormData? "": formData.title}/>
      </div>
      <button  disabled={undefinedFormData? true : false} className="btn btn-success">Add Todo</button>
    </form>
  )
}

export default AddTodo