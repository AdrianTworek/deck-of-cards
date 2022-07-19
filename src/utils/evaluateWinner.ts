import { CardValue } from '../types/card'
import { PlayerMove } from '../types/playerMove'

const cardWeights = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13,
  ACE: 14,
}

export default function evaluateWinner(
  computerCard: CardValue,
  playerCard: CardValue,
  action: PlayerMove
): string {
  const computerValue = cardWeights[computerCard]
  const playerValue = cardWeights[playerCard]

  switch (action) {
    case PlayerMove.worse:
      return playerValue < computerValue ? 'WIN' : 'LOST'
    case PlayerMove.same:
      return playerValue === computerValue ? 'WIN' : 'LOST'
    case PlayerMove.better:
      return playerValue > computerValue ? 'WIN' : 'LOST'
  }
}
