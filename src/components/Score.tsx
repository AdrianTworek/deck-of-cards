import { memo } from 'react'
import { Box, Stack, Typography } from '@mui/material'

type ScoreProps = {
  playerScore: number
  computerScore: number
  attempts: number
}

export default memo(function Score({
  playerScore,
  computerScore,
  attempts,
}: ScoreProps) {
  return (
    <Box>
      <Typography variant="h4" textAlign="center" gutterBottom>
        SCORE
      </Typography>

      <Typography
        variant="body1"
        textAlign="center"
        gutterBottom
        sx={{ color: 'gray' }}
      >
        {attempts > 0 ? `${attempts} attempts left` : ''}
      </Typography>

      <Stack direction="row" justifyContent="space-around" mt={2} gap={5}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="h6">You:</Typography>
          <Typography variant="h4" component="span" sx={{ color: 'gray' }}>
            {playerScore}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="h6">PC:</Typography>
          <Typography variant="h4" component="span" sx={{ color: 'gray' }}>
            {computerScore}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
})
