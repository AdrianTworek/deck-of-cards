import { Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <Stack gap={5}>
      <Typography variant="h2" textAlign="center">
        Deck of Cards
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/board')}
      >
        Start Game
      </Button>
    </Stack>
  )
}
