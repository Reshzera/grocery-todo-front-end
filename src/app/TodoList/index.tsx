import React, { useState } from "react"
import { motion } from "framer-motion"
import { FiPlus, FiCheckCircle, FiCircle } from "react-icons/fi"
import styles from "./styles.module.scss"

const mockItems = [
  { text: "Buy groceries", completed: false },
  { text: "Walk the dog", completed: true },
  { text: "Do laundry", completed: false },
  { text: "Water the plants", completed: true },
]

const TodoList: React.FC = () => {
  const [tasks, setTasks] =
    useState<{ text: string; completed: boolean }[]>(mockItems)
  const [task, setTask] = useState("")

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }])
      setTask("")
    }
  }

  const toggleTask = (index: number) => {
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t,
      ),
    )
  }

  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        tabIndex={-1}
      >
        Modern To-Do List
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
          <FiPlus size={24} aria-hidden="true" focusable="false" />
        </button>
      </div>

      <ul className={styles.taskList} aria-label="Task list">
        {tasks.map(({ completed, text }, index) => (
          <motion.li
            key={index}
            className={styles.taskItem}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <span
              className={completed ? styles.completed : ""}
              aria-label={`Task: ${text}${completed ? ", completed" : ""}`}
            >
              {text}
            </span>
            <button
              type="button"
              className={styles.checkbox}
              onClick={() => toggleTask(index)}
              aria-label={`Mark task "${text}" as ${completed ? "incomplete" : "complete"}`}
              aria-pressed={completed}
            >
              {completed ? (
                <FiCheckCircle
                  size={20}
                  color="#2563eb"
                  aria-hidden="true"
                  focusable="false"
                />
              ) : (
                <FiCircle
                  size={20}
                  color="#ffffff"
                  aria-hidden="true"
                  focusable="false"
                />
              )}
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
