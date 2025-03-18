import { groceryApi } from "."
import {
  CreateTodoItemDto,
  TodoItemResponseDto,
  UpdateTodoItemDto,
} from "../../types/todoItem"

class TodoItemModule {
  public async createTodoItem(
    listId: string,
    data: CreateTodoItemDto,
  ): Promise<TodoItemResponseDto> {
    const response = await groceryApi.post<TodoItemResponseDto>(
      `/todo/${listId}`,
      data,
    )
    return response.data
  }

  public async getTodoItems(listId: string): Promise<TodoItemResponseDto[]> {
    const response = await groceryApi.get<TodoItemResponseDto[]>(
      `/todo/${listId}`,
    )
    return response.data
  }

  public async getTodoItemById(id: string): Promise<TodoItemResponseDto> {
    const response = await groceryApi.get<TodoItemResponseDto>(
      `/todo/item/${id}`,
    )
    return response.data
  }

  public async updateTodoItem(
    id: string,
    data: UpdateTodoItemDto,
  ): Promise<TodoItemResponseDto> {
    const response = await groceryApi.put<TodoItemResponseDto>(
      `/todo/${id}`,
      data,
    )
    return response.data
  }

  public async deleteTodoItem(id: string): Promise<void> {
    await groceryApi.delete(`/todo/${id}`)
  }
}

export default new TodoItemModule()
