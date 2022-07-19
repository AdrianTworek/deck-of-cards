import Confetti from 'react-confetti'

import { Button, Stack, Typography } from '@mui/material'

type FinalResultProps = {
  playerScore: number
  computerScore: number
  restartGame: () => void
}

export default function FinalResult({
  playerScore,
  computerScore,
  restartGame,
}: FinalResultProps) {
  let text

  if (playerScore === computerScore) {
    text = 'Draw! Neck and neck 😱'
  } else if (playerScore > computerScore) {
    text = 'Congratulations! You won 😊'
  } else {
    text = 'Sorry! You lost 😔'
  }

  return (
    <Stack gap={2}>
      <Typography variant="h3" gutterBottom>
        {text}
      </Typography>

      {playerScore > computerScore && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={300}
          recycle={false}
        />
      )}

      <Button
        variant="contained"
        color="error"
        size="large"
        sx={{ width: 250, margin: 'auto' }}
        onClick={restartGame}
      >
        Play Again
      </Button>
    </Stack>
  )
}
