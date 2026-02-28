import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./style.css"

import { App } from "./app.tsx"
import { GameProvider } from "./GameContext.tsx"

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </StrictMode>
)
