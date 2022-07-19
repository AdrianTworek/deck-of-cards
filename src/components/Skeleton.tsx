import { Skeleton as SkeletonMUI } from '@mui/material'

type SkeletonProps = {
  width: number
  height: number
}

export default function Skeleton({ width, height }: SkeletonProps) {
  return (
    <SkeletonMUI
      variant="rectangular"
      animation="wave"
      width={width}
      height={height}
      sx={{ borderRadius: '10px' }}
    />
  )
}
