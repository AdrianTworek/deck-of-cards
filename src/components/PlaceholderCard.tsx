import { memo } from 'react'

import { Box, Typography } from '@mui/material'

export default memo(function PlaceholderCard() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 226,
        height: 314,
        border: '1px solid #000',
        borderRadius: '10px',
      }}
    >
      <Typography sx={{ fontSize: '150px' }} component="p">
        ?
      </Typography>
    </Box>
  )
})
