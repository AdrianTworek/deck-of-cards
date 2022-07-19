import { memo, useCallback, useState } from 'react'
import Moment from 'react-moment'
import { History as HistoryType, HistoryRecord } from '../types/history'

import { Box, Button, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

type HistoryProps = {
  history: HistoryType
  setHistory: (value: HistoryType | ((val: HistoryType) => HistoryType)) => void
}

export default memo(function History({ history, setHistory }: HistoryProps) {
  const [showHistory, setShowHistory] = useState(false)

  const handleClearHistory = useCallback(() => {
    setHistory([])
    setShowHistory(false)
  }, [setHistory])

  const handleDeleteItem = (item: HistoryRecord) => {
    setHistory(history.filter((el) => el.moveId !== item.moveId))
  }

  return (
    <Box
      p={4}
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        overflowY: 'scroll',

        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Button
        variant="contained"
        size="large"
        onClick={() => setShowHistory(!showHistory)}
      >
        History
      </Button>

      {showHistory && (
        <>
          {history.length > 0 && (
            <Button
              variant="contained"
              size="large"
              color="error"
              sx={{ marginLeft: 1 }}
              onClick={() => handleClearHistory()}
            >
              Clear
            </Button>
          )}

          {history
            ?.sort((a, b) => b.date - a.date)
            ?.map((item, idx) => (
              <Stack key={idx} mb={3} mt={3}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography variant="h6">Game ID: {item.deckId}</Typography>
                    <Typography variant="body1" sx={{ color: 'gray' }}>
                      <Moment fromNow>{item.date}</Moment>
                    </Typography>
                  </Box>

                  <DeleteIcon
                    sx={{ cursor: 'pointer' }}
                    color="error"
                    onClick={() => handleDeleteItem(item)}
                  />
                </Box>

                <Stack direction="row" alignItems="center" gap={2} mt={3}>
                  <Typography variant="body1">
                    Player: {item.playerScore}
                  </Typography>
                  <img
                    style={{ width: 57, height: 79 }}
                    src={item.playerCard?.image}
                    alt="Player card"
                  />

                  <img
                    style={{ width: 57, height: 79 }}
                    src={item.computerCard?.image}
                    alt="Computer card"
                  />
                  <Typography variant="body1">
                    Computer: {item.computerScore}
                  </Typography>
                </Stack>
              </Stack>
            ))}
        </>
      )}
    </Box>
  )
})
