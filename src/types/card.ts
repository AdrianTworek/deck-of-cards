export type CardValue =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'JACK'
  | 'QUEEN'
  | 'KING'
  | 'ACE'

export type Card = {
  value: CardValue
  image: string
  suit: string
}
