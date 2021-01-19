interface ITodo {
  _id: string
  title: string
  done: boolean
  createdAt?: string|any
  updatedAt?: string|any
  __v?: number
}

interface TodoProps {
  todo: ITodo
}

interface TodosProps {
  todos: ITodo[]
}

type ApiDataType = {
  message: string
  status: string
  todos: ITodo[]
  todo?: ITodo
}