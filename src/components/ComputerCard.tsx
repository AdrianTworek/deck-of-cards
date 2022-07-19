import { memo } from 'react'

import { Box, Typography } from '@mui/material'
import { Card } from '../types/card'

import { PlaceholderCard, Skeleton } from '.'

type ComputerCardProps = {
  computerCard: Card | null
  hasChosen: boolean
  loading: boolean
}

export default memo(function ComputerCard({
  computerCard,
  hasChosen,
  loading,
}: ComputerCardProps) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom textAlign="center">
        AI Card
      </Typography>

      {hasChosen && computerCard ? (
        <Box sx={{ width: 226, height: 314 }}>
          {loading ? (
            <Skeleton width={226} height={314} />
          ) : (
            <img
              src={computerCard.image}
              alt={`${computerCard.suit}-${computerCard.value}`}
            />
          )}
        </Box>
      ) : (
        <PlaceholderCard />
      )}
    </Box>
  )
})
