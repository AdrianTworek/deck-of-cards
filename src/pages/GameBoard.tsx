import { useCallback, useEffect, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Card as CardType } from '../types/card'
import { PlayerMove } from '../types/playerMove'
import { GameStateType } from '../types/gameState'
import { History as HistoryType } from '../types/history'
import { getShuffledCards, shuffleCards } from '../api'
import evaluateWinner from '../utils/evaluateWinner'
import useLocalStorage from '../hooks/useLocalStorage'

import { Button, Stack } from '@mui/material'

import {
  PlayerCard,
  Score,
  ComputerCard,
  ResultText,
  GameButtons,
  FinalResult,
  GameDialog,
  History,
} from '../components'

const ATTEMPTS_NUMBER = 10

export default function GameBoard() {
  // Get data from local storage in order to determine if player's game was ended
  const [gameState, setGameState] = useLocalStorage<GameStateType>('gameState')

  // History
  const [history, setHistory] = useLocalStorage<HistoryType>('history', [])

  // Set initial game states
  const [deckId, setDeckId] = useState(gameState?.deckId || '')
  const [playerCard, setPlayerCard] = useState<CardType | null>(
    gameState?.playerCard
  )
  const [computerCard, setComputerCard] = useState<CardType | null>(
    gameState?.computerCard || null
  )
  const [playerScore, setPlayerScore] = useState(gameState?.playerScore || 0)
  const [computerScore, setComputerScore] = useState(
    gameState?.computerScore || 0
  )
  const [attempts, setAttempts] = useState(
    gameState?.attempts || ATTEMPTS_NUMBER
  )

  // UI related states
  const [loading, setLoading] = useState(false)
  const [resultLoading, setResultLoading] = useState(false)
  const [result, setResult] = useState('')
  const [hasChosen, setHasChosen] = useState(false)
  const [showPlayAgainButton, setShowPlayAgainButton] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  // Helper functions
  const shuffle = useCallback(async () => {
    const { data } = await shuffleCards()
    setDeckId(data.deck_id)
  }, [])

  const getCards = useCallback(async () => {
    try {
      setLoading(true)

      const { data } = await getShuffledCards(deckId)
      const [computerCard, playerCard] = data.cards

      if (data.remaining === 0) {
        shuffle()
      }

      setPlayerCard(playerCard)
      setComputerCard(computerCard)
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => setLoading(false), 1000)
    }
  }, [shuffle, deckId])

  const handlePlayerMove = useCallback(
    (action: PlayerMove) => {
      if (computerCard && playerCard) {
        const result = evaluateWinner(
          computerCard.value,
          playerCard.value,
          action
        )

        setResultLoading(true)
        setHasChosen(true)

        setTimeout(() => {
          setResultLoading(false)

          if (result === 'WIN') {
            setPlayerScore((prev) => prev + 1)
            setResult('You won!')
            setHistory([
              ...history,
              {
                deckId,
                moveId: deckId + uuid(),
                playerCard,
                computerCard,
                playerScore: playerScore + 1,
                computerScore,
                date: Date.now(),
              },
            ])
          } else {
            setComputerScore((prev) => prev + 1)
            setResult('You lost!')
            setHistory([
              ...history,
              {
                deckId,
                moveId: deckId + uuid(),
                playerCard,
                computerCard,
                playerScore,
                computerScore: computerScore + 1,
                date: Date.now(),
              },
            ])
          }

          setAttempts((prev) => prev - 1)
          setShowPlayAgainButton(true)
        }, 1000)
      }
    },
    [playerCard, computerCard]
  )

  const handlePlayAgain = useCallback(() => {
    setHasChosen(false)
    setResult('')
    setShowPlayAgainButton(false)

    getCards()
  }, [getCards])

  const handleRestartGame = useCallback(() => {
    setPlayerScore(0)
    setComputerScore(0)
    setDeckId('')
    setPlayerCard(null)
    setComputerCard(null)
    setHasChosen(false)
    setShowPlayAgainButton(false)
    setResult('')
    setAttempts(ATTEMPTS_NUMBER)

    getCards()
  }, [getCards])

  // Display modal if a player has not ended the game
  useEffect(() => {
    if (gameState?.deckId && gameState?.attempts < ATTEMPTS_NUMBER) {
      setOpenDialog(true)
    }
  }, [])

  // Shuffle cards if there is no deckId
  useEffect(() => {
    if (!gameState?.deckId) {
      shuffle()
    }
  }, [gameState?.deckId, shuffle])

  // Get cards
  useEffect(() => {
    if (deckId) {
      getCards()
    }
  }, [deckId, getCards, handleRestartGame])

  // Update localStorage after each player move
  useEffect(() => {
    setGameState({
      playerCard,
      computerCard,
      playerScore,
      computerScore,
      deckId,
      attempts,
      hasPendingGame: true,
    })
  }, [playerCard, computerCard, playerScore, computerScore, deckId, attempts])

  return (
    <Stack gap={6}>
      <Score
        attempts={attempts}
        playerScore={playerScore}
        computerScore={computerScore}
      />

      {attempts < 0 ? (
        <FinalResult
          playerScore={playerScore}
          computerScore={computerScore}
          restartGame={handleRestartGame}
        />
      ) : (
        <>
          <ComputerCard
            computerCard={computerCard}
            hasChosen={hasChosen}
            loading={resultLoading}
          />

          <ResultText result={result} />

          <GameButtons
            showPlayAgainButton={showPlayAgainButton}
            handlePlayAgain={handlePlayAgain}
            handlePlayerMove={handlePlayerMove}
            loading={loading}
            resultLoading={resultLoading}
            playerCard={playerCard}
            attempts={attempts}
            setAttempts={setAttempts}
          />

          <PlayerCard playerCard={playerCard} loading={loading} />

          <Button variant="outlined" size="medium" onClick={handleRestartGame}>
            Restart Game
          </Button>
        </>
      )}

      <History history={history} setHistory={setHistory} />

      {openDialog && (
        <GameDialog
          open={openDialog}
          setOpen={setOpenDialog}
          handleRestartGame={handleRestartGame}
        />
      )}
    </Stack>
  )
}
