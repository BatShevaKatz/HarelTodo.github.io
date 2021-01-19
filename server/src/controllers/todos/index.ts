import { Response, Request } from "express"
import { ITodo } from "./../../types/todo"
import Todo from "../../models/todo"

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try{
    const todos: ITodo[] = await Todo.find()
    res.status(200).json({todos})
  } catch (error) {
    throw error
  }
}

const addTodo = async (req:Request, res:Response): Promise<void> =>{
  try{
    const body = req.body as Pick<ITodo, "title"| "done">
    const todo: ITodo = new Todo({
      title: body.title,
      done: body.done
    })
    const newTodo : ITodo = await todo.save()
    const allTodos: ITodo[] = await Todo.find()
    res
      .status(201)
      .json({message: "Todo has been added successfully", todo: newTodo, todos: allTodos})
  } catch (error){
    console.log(error)
  }
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try{
    const{
      params: {id},
      body
    } = req
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      {_id: id},
      body
    )
    const allTodos: ITodo[] = await Todo.find()
    res
    .status(200)
    .json({
      message: "Todo updated successfully",
      todo: updateTodo,
      todos: allTodos
    })
  } catch (error) {
    console.log(error)
  }
  }


const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try{
    const deletedTodo: ITodo| null = await Todo.findByIdAndRemove(
      req.params.id
    )
    const allTodos: ITodo[] = await Todo.find()
    res.status(200)
      .json({
        message: "Todo Deleted",
        todo: deletedTodo,
        todos: allTodos
      })
  } catch (error){
    console.log(error)
  }
}

const clearAllTodos = async (req: Request, res: Response): Promise<void> => {
  try{
    await Todo.deleteMany()
    res.status(200).json({
      message: "All Todos Deleted",
      todos: []
    })
  } catch (error){
    throw error
  }
}

export { getTodos, addTodo, updateTodo, deleteTodo, clearAllTodos}
