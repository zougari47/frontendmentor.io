import { useState } from "preact/hooks"

import "./app.css"

import { addDiskToBoard, createBoard } from "@/core/game"
import type { Player } from "@/core/types"

const gameBoard = createBoard()
export function App() {
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1)

  return (
    <div>
      <h1>Current palyer {currentPlayer}</h1>
      <div class="board">
        {gameBoard.map((col, x) => (
          <div
            class="column"
            key={x}
            onClick={() => {
              const hasSpace = addDiskToBoard(x, currentPlayer, gameBoard)
              hasSpace && setCurrentPlayer((prev) => (prev === 1 ? 2 : 1))
            }}
          >
            {col
              .slice()
              .reverse()
              .map((cell, y) => (
                <div class="cell" key={y}>
                  {cell === null ? "" : cell}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}
