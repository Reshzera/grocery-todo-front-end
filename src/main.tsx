// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import React from "react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./global.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
