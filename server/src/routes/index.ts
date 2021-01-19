import {Router} from "express"
import * as actions from "../controllers/todos"

const router : Router = Router()

router.get("/todos", actions.getTodos)

router.post("/add-todo", actions.addTodo)

router.put("/edit-todo/:id", actions.updateTodo)

router.delete("/delete-todo/:id", actions.deleteTodo)

router.delete("/delete-all", actions.clearAllTodos)

export default router
