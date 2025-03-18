import { groceryApi } from "."
import {
  TodoListResponseDto,
  CreateTodoListDto,
  UpdateTodoListDto,
} from "../../types/todoList"

class TodoListModule {
  public async getTodoLists(): Promise<TodoListResponseDto[]> {
    const response = await groceryApi.get<TodoListResponseDto[]>("/todo-lists")
    return response.data
  }

  public async getTodoListById(id: string): Promise<TodoListResponseDto> {
    const response = await groceryApi.get<TodoListResponseDto>(
      `/todo-lists/${id}`,
    )
    return response.data
  }

  public async createTodoList(
    data: CreateTodoListDto,
  ): Promise<TodoListResponseDto> {
    const response = await groceryApi.post<TodoListResponseDto>(
      "/todo-lists",
      data,
    )
    return response.data
  }

  public async updateTodoList(
    id: string,
    data: UpdateTodoListDto,
  ): Promise<TodoListResponseDto> {
    const response = await groceryApi.put<TodoListResponseDto>(
      `/todo-lists/${id}`,
      data,
    )
    return response.data
  }

  public async deleteTodoList(id: string): Promise<void> {
    await groceryApi.delete(`/todo-lists/${id}`)
  }
}

export default new TodoListModule()
