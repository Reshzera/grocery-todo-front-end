import React, { useState } from "react"
import { motion } from "framer-motion"
import { FiPlus, FiCheckCircle, FiCircle } from "react-icons/fi"
import styles from "./styles.module.scss"

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([])
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
      >
        Modern To-Do List
      </motion.h1>

      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.input}
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className={styles.addButton} onClick={addTask}>
          <FiPlus size={24} />
        </button>
      </div>

      <ul className={styles.taskList}>
        {tasks.map((t, index) => (
          <motion.li
            key={index}
            className={styles.taskItem}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {" "}
            <span className={t.completed ? styles.completed : ""}>
              {t.text}
            </span>
            <button
              className={styles.checkbox}
              onClick={() => toggleTask(index)}
            >
              {t.completed ? (
                <FiCheckCircle size={20} color="#2563eb" />
              ) : (
                <FiCircle size={20} color="#ffffff" />
              )}
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
