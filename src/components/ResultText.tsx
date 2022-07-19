import { memo } from 'react'

import { Box, Typography } from '@mui/material'

type ResultProps = {
  result: string
}

export default memo(function ResultText({ result }: ResultProps) {
  return (
    <Box mb={-5}>
      {result ? (
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          mt={5}
          sx={{ color: result === 'You lost!' ? 'red' : 'green' }}
        >
          {result}
        </Typography>
      ) : (
        <Typography variant="h3" fontWeight="bold" textAlign="center" mt={5}>
          You chose
        </Typography>
      )}
    </Box>
  )
})
