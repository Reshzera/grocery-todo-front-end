export interface CreateTodoItemDto {
  name: string
  checked: boolean
}

export interface UpdateTodoItemDto {
  name: string
  checked: boolean
}

export interface TodoItemResponseDto {
  id: string
  name: string
  checked: boolean
  todoListId: string
}
