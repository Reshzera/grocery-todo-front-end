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
      list.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [debouncedSearchTerm])

  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Select Your To-Do List
      </motion.h1>

      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search lists..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className={styles.listContainer}>
        {filteredLists.map((list) => (
          <motion.button
            key={list}
            className={`${styles.listButton} ${selectedList === list ? styles.selected : ""}`}
            onClick={() => setSelectedList(list)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {list}
          </motion.button>
        ))}
      </div>

      <motion.button
        className={styles.confirmButton}
        disabled={!selectedList}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continue <FiArrowRight size={20} />
      </motion.button>
    </div>
  )
}

export default Home
