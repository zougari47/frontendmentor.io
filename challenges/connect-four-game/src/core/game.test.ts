import { addDiskToBoard, checkWin, createBoard } from "@/core/game"
import type { Board, Player } from "@/core/types"
import { beforeEach, describe, expect, it } from "vitest"

let board: Board

beforeEach(() => {
  board = createBoard()
})

describe("addDiskToBoard", () => {
  const X = Math.floor(Math.random() * 7)
  it("places disk at bottom and returns true", () => {
    const success = addDiskToBoard(X, 1, board)
    expect(success).toBe(true)
    expect(board[X][0]).toBe(1)
  })

  it("returns false when column is full", () => {
    for (let i = 0; i < 6; i++) expect(addDiskToBoard(X, 1, board)).toBe(true)
    expect(addDiskToBoard(X, 2, board)).toBe(false)
  })

  it("throws error if column index is invalid", () => {
    expect(() => addDiskToBoard(-1, 1, board)).toThrow()
    expect(() => addDiskToBoard(7, 1, board)).toThrow()
  })
})

// check win
describe("checkWin", () => {
  // Helper to place disks on the existing board
  const placeDisk = (x: number, y: number, player: Player) => {
    board[x][y] = player
  }

  // Helper to get random position within bounds
  const randomCol = () => Math.floor(Math.random() * 7)
  const randomRow = () => Math.floor(Math.random() * 6)

  describe("Horizontal wins", () => {
    it("detects 4 in a row horizontally at random position", () => {
      // Ensure we have space for 4 consecutive columns
      const startCol = Math.floor(Math.random() * 4) // 0-3 so we can fit 4 disks
      const row = randomRow()

      placeDisk(startCol, row, 1)
      placeDisk(startCol + 1, row, 1)
      placeDisk(startCol + 2, row, 1)
      placeDisk(startCol + 3, row, 1)

      // Test from each position in the winning sequence
      expect(checkWin(startCol, row, 1, board)).toBe(true)
      expect(checkWin(startCol + 1, row, 1, board)).toBe(true)
      expect(checkWin(startCol + 2, row, 1, board)).toBe(true)
      expect(checkWin(startCol + 3, row, 1, board)).toBe(true)
    })

    it("detects horizontal win for player 2", () => {
      const startCol = Math.floor(Math.random() * 4)
      const row = randomRow()

      placeDisk(startCol, row, 2)
      placeDisk(startCol + 1, row, 2)
      placeDisk(startCol + 2, row, 2)
      placeDisk(startCol + 3, row, 2)

      expect(checkWin(startCol + 2, row, 2, board)).toBe(true)
    })

    it("does not detect win with only 3 in a row horizontally", () => {
      const startCol = Math.floor(Math.random() * 5)
      const row = randomRow()

      placeDisk(startCol, row, 1)
      placeDisk(startCol + 1, row, 1)
      placeDisk(startCol + 2, row, 1)

      expect(checkWin(startCol + 1, row, 1, board)).toBe(false)
    })

    it("does not detect win when sequence is broken by opponent", () => {
      const startCol = Math.floor(Math.random() * 4)
      const row = randomRow()

      placeDisk(startCol, row, 1)
      placeDisk(startCol + 1, row, 1)
      placeDisk(startCol + 2, row, 2) // Opponent breaks sequence
      placeDisk(startCol + 3, row, 1)

      expect(checkWin(startCol + 1, row, 1, board)).toBe(false)
    })
  })

  describe("Vertical wins", () => {
    it("detects 4 in a row vertically at random position", () => {
      const col = randomCol()
      // Ensure we have space for 4 consecutive rows
      const startRow = Math.floor(Math.random() * 3) // 0-2 so we can fit 4 disks

      placeDisk(col, startRow, 1)
      placeDisk(col, startRow + 1, 1)
      placeDisk(col, startRow + 2, 1)
      placeDisk(col, startRow + 3, 1)

      expect(checkWin(col, startRow + 2, 1, board)).toBe(true)
    })

    it("detects vertical win for player 2", () => {
      const col = randomCol()
      const startRow = Math.floor(Math.random() * 3)

      placeDisk(col, startRow, 2)
      placeDisk(col, startRow + 1, 2)
      placeDisk(col, startRow + 2, 2)
      placeDisk(col, startRow + 3, 2)

      expect(checkWin(col, startRow, 2, board)).toBe(true)
    })

    it("does not detect win with only 3 in a row vertically", () => {
      const col = randomCol()
      const startRow = Math.floor(Math.random() * 4)

      placeDisk(col, startRow, 1)
      placeDisk(col, startRow + 1, 1)
      placeDisk(col, startRow + 2, 1)

      expect(checkWin(col, startRow + 1, 1, board)).toBe(false)
    })
  })

  describe("Diagonal wins (bottom-left to top-right)", () => {
    it("detects 4 in a row diagonally (↗) at random position", () => {
      // Ensure diagonal fits on board
      const startCol = Math.floor(Math.random() * 4) // 0-3
      const startRow = Math.floor(Math.random() * 3) // 0-2

      placeDisk(startCol, startRow, 1)
      placeDisk(startCol + 1, startRow + 1, 1)
      placeDisk(startCol + 2, startRow + 2, 1)
      placeDisk(startCol + 3, startRow + 3, 1)

      expect(checkWin(startCol + 1, startRow + 1, 1, board)).toBe(true)
    })

    it("detects diagonal (↗) win for player 2", () => {
      const startCol = Math.floor(Math.random() * 4)
      const startRow = Math.floor(Math.random() * 3)

      placeDisk(startCol, startRow, 2)
      placeDisk(startCol + 1, startRow + 1, 2)
      placeDisk(startCol + 2, startRow + 2, 2)
      placeDisk(startCol + 3, startRow + 3, 2)

      expect(checkWin(startCol + 3, startRow + 3, 2, board)).toBe(true)
    })

    it("does not detect win with only 3 in diagonal (↗)", () => {
      const startCol = Math.floor(Math.random() * 5)
      const startRow = Math.floor(Math.random() * 4)

      placeDisk(startCol, startRow, 1)
      placeDisk(startCol + 1, startRow + 1, 1)
      placeDisk(startCol + 2, startRow + 2, 1)

      expect(checkWin(startCol + 1, startRow + 1, 1, board)).toBe(false)
    })
  })

  describe("Diagonal wins (top-left to bottom-right)", () => {
    it("detects 4 in a row diagonally (↘) at random position", () => {
      // Ensure diagonal fits on board
      const startCol = Math.floor(Math.random() * 4) // 0-3
      const startRow = 3 + Math.floor(Math.random() * 3) // 3-5

      placeDisk(startCol, startRow, 1)
      placeDisk(startCol + 1, startRow - 1, 1)
      placeDisk(startCol + 2, startRow - 2, 1)
      placeDisk(startCol + 3, startRow - 3, 1)

      expect(checkWin(startCol + 2, startRow - 2, 1, board)).toBe(true)
    })

    it("detects diagonal (↘) win for player 2", () => {
      const startCol = Math.floor(Math.random() * 4)
      const startRow = 3 + Math.floor(Math.random() * 3)

      placeDisk(startCol, startRow, 2)
      placeDisk(startCol + 1, startRow - 1, 2)
      placeDisk(startCol + 2, startRow - 2, 2)
      placeDisk(startCol + 3, startRow - 3, 2)

      expect(checkWin(startCol, startRow, 2, board)).toBe(true)
    })

    it("does not detect win with only 3 in diagonal (↘)", () => {
      const startCol = Math.floor(Math.random() * 5)
      const startRow = 2 + Math.floor(Math.random() * 4)

      placeDisk(startCol, startRow, 1)
      placeDisk(startCol + 1, startRow - 1, 1)
      placeDisk(startCol + 2, startRow - 2, 1)

      expect(checkWin(startCol + 1, startRow - 1, 1, board)).toBe(false)
    })
  })

  describe("Edge cases", () => {
    it("returns false for empty board", () => {
      expect(checkWin(3, 3, 1, board)).toBe(false)
    })

    it("returns false when checking wrong player's position", () => {
      placeDisk(0, 0, 1)
      placeDisk(1, 0, 1)
      placeDisk(2, 0, 1)
      placeDisk(3, 0, 1)

      // Player 2 checks position with player 1's disk
      expect(checkWin(1, 0, 2, board)).toBe(false)
    })

    it("detects win at board corners", () => {
      // Bottom-left corner horizontal
      placeDisk(0, 0, 1)
      placeDisk(1, 0, 1)
      placeDisk(2, 0, 1)
      placeDisk(3, 0, 1)
      expect(checkWin(0, 0, 1, board)).toBe(true)
    })

    it("detects win at top-right corner horizontal", () => {
      placeDisk(3, 5, 2)
      placeDisk(4, 5, 2)
      placeDisk(5, 5, 2)
      placeDisk(6, 5, 2)
      expect(checkWin(6, 5, 2, board)).toBe(true)
    })

    it("detects win when more than 4 in a row exists", () => {
      const row = randomRow()

      placeDisk(0, row, 1)
      placeDisk(1, row, 1)
      placeDisk(2, row, 1)
      placeDisk(3, row, 1)
      placeDisk(4, row, 1) // 5 in a row

      expect(checkWin(2, row, 1, board)).toBe(true)
      expect(checkWin(4, row, 1, board)).toBe(true)
    })

    it("handles full board without win", () => {
      // Fill board in a pattern that prevents any wins
      for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 6; row++) {
          // Alternate players in a checkerboard pattern
          board[col][row] = (((col + row) % 2) + 1) as Player
        }
      }

      expect(checkWin(3, 3, 1, board)).toBe(false)
      expect(checkWin(3, 3, 2, board)).toBe(false)
    })

    it("returns false when single disk on board", () => {
      placeDisk(3, 2, 1)
      expect(checkWin(3, 2, 1, board)).toBe(false)
    })

    it("detects multiple possible wins through same position", () => {
      // Create a cross pattern where checking center wins both horizontally and vertically
      placeDisk(2, 2, 1)
      placeDisk(3, 2, 1)
      placeDisk(4, 2, 1)
      placeDisk(5, 2, 1) // Horizontal win
      placeDisk(3, 0, 1)
      placeDisk(3, 1, 1)
      placeDisk(3, 3, 1) // Vertical win through (3,2)

      expect(checkWin(3, 2, 1, board)).toBe(true)
    })
  })
})
