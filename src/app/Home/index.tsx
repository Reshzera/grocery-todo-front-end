import { useDebounce } from "@uidotdev/usehooks"
import { motion } from "framer-motion"
import React, { useMemo, useState } from "react"
import { FiArrowRight } from "react-icons/fi"
import styles from "./styles.module.scss"

const Home: React.FC = () => {
  const [selectedList, setSelectedList] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const allLists = [
    "Work",
    "Personal",
    "Shopping",
    "Fitness",
    "Others",
    "Study",
    "Finance",
    "Travel",
    "Projects",
    "Family",
  ]

  const filteredLists = useMemo(() => {
    return allLists.filter((list) =>
      list.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    )
  }, [debouncedSearchTerm])

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

      <label htmlFor="searchInput" className={styles.visuallyHidden}>
        Search to-do lists
      </label>
      <input
        id="searchInput"
        type="text"
        className={styles.searchInput}
        placeholder="Search lists..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search lists"
      />

      <div
        className={styles.listContainer}
        role="radiogroup"
        aria-label="Available to-do lists"
      >
        {filteredLists.map((list) => (
          <motion.button
            key={list}
            type="button"
            role="radio"
            className={`${styles.listButton} ${selectedList === list ? styles.selected : ""}`}
            onClick={() => setSelectedList(list)}
            aria-checked={selectedList === list}
            tabIndex={selectedList === list ? 0 : -1}
            aria-label={`Select ${list} list`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {list}
          </motion.button>
        ))}
      </div>

      <motion.button
        type="button"
        className={styles.confirmButton}
        disabled={!selectedList}
        aria-disabled={!selectedList}
        aria-label={
          selectedList
            ? `Continue with ${selectedList} list`
            : "Continue button disabled"
        }
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continue <FiArrowRight size={20} aria-hidden="true" focusable="false" />
      </motion.button>
    </div>
  )
}

export default Home
