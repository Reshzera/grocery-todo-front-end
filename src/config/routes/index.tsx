import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../../app/Home"
import TodoList from "../../app/TodoList"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:listId",
    element: <TodoList />,
  },
])

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />
}

export default AppRoutes
