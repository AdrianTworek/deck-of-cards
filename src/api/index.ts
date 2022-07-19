import axios from 'axios'

const API = axios.create({
  baseURL: 'https://www.deckofcardsapi.com/api',
})

export const shuffleCards = () => API.get('/deck/new/shuffle/?deck_count=1')

export const getShuffledCards = (deckId: string) =>
  API.get(`/deck/${deckId}/draw/?count=2`)
