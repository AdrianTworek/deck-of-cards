import { Card } from './card'

export type GameStateType = {
  playerCard: Card | null
  computerCard: Card | null
  playerScore: number
  computerScore: number
  attempts: number
  deckId: string
  hasPendingGame: boolean
}
