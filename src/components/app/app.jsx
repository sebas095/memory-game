import { useState } from 'react'
import RainbowText from 'react-rainbow-text'
import Menu from '../menu/menu'
import Board from '../board/board'
import './app.css'

const App = () => {
  const [startGame, setStartGame] = useState(false)

  return (
    <> 
      <h1>
        <RainbowText lightness={0.4} saturation={1}>Juego de Memoria</RainbowText>
      </h1>
      {!startGame ? <Menu setStartGame={setStartGame}/> : <Board setStartGame={setStartGame}/>}
    </>
  )
}

export default App
