import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FiPlus, FiCheckCircle, FiCircle } from "react-icons/fi"
import { useParams } from "react-router-dom"
import styles from "./styles.module.scss"
import TodoItemModule from "../../config/api/todoItemModule"
import { TodoItemResponseDto, CreateTodoItemDto } from "../../types/todoItem"

const TodoList: React.FC = () => {
  const { listId } = useParams<{ listId: string }>()
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState<TodoItemResponseDto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!listId) return
    const fetchTasks = async () => {
      try {
        const items = await TodoItemModule.getTodoItems(listId)
        setTasks(items)
      } catch (err) {
        console.error("Failed to fetch tasks", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [listId])

  const addTask = async () => {
    const trimmed = task.trim()
    if (!trimmed || !listId) return
    try {
      const newTask = await TodoItemModule.createTodoItem(listId, {
        name: trimmed,
        checked: false,
      } as CreateTodoItemDto)
      setTasks((prev) => [...prev, newTask])
      setTask("")
    } catch (err) {
      console.error("Failed to create task", err)
    }
  }

  const toggleTask = async (index: number) => {
    const taskToUpdate = tasks[index]
    try {
      const updated = await TodoItemModule.updateTodoItem(taskToUpdate.id, {
        checked: !taskToUpdate.checked,
        name: taskToUpdate.name,
      })
      const updatedTasks = tasks.map((t, i) => (i === index ? updated : t))
      setTasks(updatedTasks)
    } catch (err) {
      console.error("Failed to update task", err)
    }
  }

  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        tabIndex={-1}
      >
        Your To-Do List
      </motion.h1>

      <div className={styles.inputContainer}>
        <label htmlFor="new-task" className={styles.visuallyHidden}>
          Add a new task
        </label>
        <input
          id="new-task"
          type="text"
          className={styles.input}
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          aria-label="Task input"
        />
        <button
          type="button"
          className={styles.addButton}
          onClick={addTask}
          aria-label="Add task"
        >
          <FiPlus size={24} />
        </button>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul className={styles.taskList} aria-label="Task list">
          {tasks.map(({ checked, name }, index) => (
            <motion.li
              key={index}
              className={styles.taskItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <span
                className={checked ? styles.completed : ""}
                aria-label={`Task: ${name}${checked ? ", completed" : ""}`}
              >
                {name}
              </span>
              <button
                type="button"
                className={styles.checkbox}
                onClick={() => toggleTask(index)}
                aria-label={`Mark task "${name}" as ${checked ? "incomplete" : "complete"}`}
                aria-pressed={checked}
              >
                {checked ? (
                  <FiCheckCircle size={20} color="#2563eb" />
                ) : (
                  <FiCircle size={20} color="#ffffff" />
                )}
              </button>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TodoList
