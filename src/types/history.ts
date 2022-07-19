import { Card } from './card'

export type HistoryRecord = {
  deckId: string
  moveId: string
  playerCard: Card | null
  computerCard: Card | null
  playerScore: number
  computerScore: number
  date: number
}

export type History = HistoryRecord[]
