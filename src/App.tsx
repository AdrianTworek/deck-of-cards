import { Routes, Route } from 'react-router-dom'

import { Container } from '@mui/material'

import { Welcome, GameBoard } from './pages'

function App() {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 5,
      }}
    >
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/board" element={<GameBoard />} />
      </Routes>
    </Container>
  )
}

export default App
