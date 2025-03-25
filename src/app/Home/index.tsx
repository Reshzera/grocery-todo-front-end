import { useDebounce } from "@uidotdev/usehooks"
import { motion } from "framer-motion"
import React, { useEffect, useMemo, useState } from "react"
import { FiArrowRight, FiPlus } from "react-icons/fi"
import { TodoListResponseDto } from "../../types/todoList"
import styles from "./styles.module.scss"
import TodoListModule from "../../config/api/todoListModule"
import { useNavigate } from "react-router-dom"

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const [selectedList, setSelectedList] = useState<string>("")
  const [todoLists, setTodoLists] = useState<TodoListResponseDto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const lists = await TodoListModule.getTodoLists()
        setTodoLists(lists)
      } finally {
        setLoading(false)
      }
    }

    fetchLists()
  }, [])

  const filteredLists = useMemo(() => {
    return todoLists?.filter((list) =>
      list.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    )
  }, [debouncedSearchTerm, todoLists])

  const createList = async () => {
    const name = searchTerm.trim()
    if (!name) return
    const newList = await TodoListModule.createTodoList({ name })
    navigate(`/${newList.id}`)
  }

  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        tabIndex={-1}
      >
        Select Your To-Do List
      </motion.h1>

      <div className={styles.inputContainer}>
        <input
          id="searchInput"
          type="text"
          className={styles.searchInput}
          placeholder="Search lists or create a new one"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search lists or create a new one"
        />
        <button
          type="button"
          className={styles.addButton}
          onClick={createList}
          aria-label="Add new list"
        >
          <FiPlus size={24} />
        </button>
      </div>

      {loading ? (
        <p>Loading lists...</p>
      ) : (
        <div
          className={styles.listContainer}
          role="radiogroup"
          aria-label="Available to-do lists"
        >
          {filteredLists.map((list) => (
            <motion.button
              key={list.id}
              type="button"
              role="radio"
              className={`${styles.listButton} ${selectedList === list.id ? styles.selected : ""}`}
              onClick={() => setSelectedList(list.id)}
              aria-checked={selectedList === list.id}
              tabIndex={selectedList === list.id ? 0 : -1}
              aria-label={`Select ${list.id} list`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {list.name}
            </motion.button>
          ))}
        </div>
      )}

      <motion.button
        type="button"
        className={styles.confirmButton}
        disabled={!selectedList}
        aria-label={
          selectedList
            ? `Continue with ${selectedList} list`
            : "Continue button disabled"
        }
        onClick={() => navigate(`/${selectedList}`)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continue <FiArrowRight size={20} />
      </motion.button>
    </div>
  )
}

export default Home
