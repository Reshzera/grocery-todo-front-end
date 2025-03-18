export interface CreateTodoListDto {
  name: string
}

export interface UpdateTodoListDto {
  name: string
}
export interface TodoItem {
  id: string
  name: string
  completed: boolean
}

export interface TodoListResponseDto {
  id: string
  name: string
  items: TodoItem[]
}
