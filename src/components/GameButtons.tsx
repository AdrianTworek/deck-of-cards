import { memo } from 'react'
import { Card } from '../types/card'
import { PlayerMove } from '../types/playerMove'

import { Button, Stack } from '@mui/material'

type GameButtonsProps = {
  showPlayAgainButton: boolean
  handlePlayAgain: () => void
  handlePlayerMove: (action: PlayerMove) => void
  loading: boolean
  resultLoading: boolean
  playerCard: Card | null
  attempts: number
  setAttempts: (value: number) => void
}

export default memo(function GameButtons({
  showPlayAgainButton,
  handlePlayAgain,
  handlePlayerMove,
  loading,
  resultLoading,
  playerCard,
  attempts,
  setAttempts,
}: GameButtonsProps) {
  const disabled = loading || resultLoading || !playerCard

  return (
    <Stack direction="row" justifyContent="center">
      {showPlayAgainButton && attempts ? (
        <Button variant="contained" onClick={handlePlayAgain}>
          Play Again
        </Button>
      ) : (
        <>
          {attempts ? (
            <>
              <Button
                color="error"
                size="large"
                disabled={disabled}
                onClick={() => handlePlayerMove(PlayerMove.worse)}
              >
                Worse
              </Button>
              <Button
                color="info"
                size="large"
                disabled={disabled}
                onClick={() => handlePlayerMove(PlayerMove.same)}
              >
                Same
              </Button>
              <Button
                color="success"
                size="large"
                disabled={disabled}
                onClick={() => handlePlayerMove(PlayerMove.better)}
              >
                Better
              </Button>
            </>
          ) : (
            // It "redirects" to the Final Result
            <Button size="large" onClick={() => setAttempts(-1)}>
              See final score
            </Button>
          )}
        </>
      )}
    </Stack>
  )
})
