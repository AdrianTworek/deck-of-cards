import { memo } from 'react'
import { Card as CardType } from '../types/card'

import { Box, Typography } from '@mui/material'

import { Skeleton } from '.'

type CardProps = {
  loading: boolean
  playerCard: CardType | null
}

export default memo(function Card({ loading, playerCard }: CardProps) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom textAlign="center">
        {loading ? 'Drawing...' : 'Your Card'}
      </Typography>

      {playerCard && !loading ? (
        <img
          src={playerCard.image}
          alt={`${playerCard.suit}-${playerCard.value}`}
        />
      ) : (
        <Skeleton width={226} height={314} />
      )}
    </Box>
  )
})
