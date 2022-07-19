import { memo } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

type GameDialogProps = {
  open: boolean
  setOpen: (value: boolean) => void
  handleRestartGame: () => void
}

export default memo(function GameDialog({
  open,
  setOpen,
  handleRestartGame,
}: GameDialogProps) {
  const handleStartNewGame = () => {
    handleRestartGame()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Unfinished game</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          It looks like you have not finished your last game. Do you want to
          continue?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleStartNewGame}>
          Start new game
        </Button>
        <Button onClick={() => setOpen(false)}>Continue</Button>
      </DialogActions>
    </Dialog>
  )
})
