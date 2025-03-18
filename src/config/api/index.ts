import axios from "axios"

export const groceryApi = axios.create({
  baseURL: "http://localhost:8080",
})
