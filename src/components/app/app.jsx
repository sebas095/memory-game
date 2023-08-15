import { useState } from 'react'
import Menu from '../menu/menu'
import Board from '../board/board'
import './app.css'

const App = () => {
  const [startGame, setStartGame] = useState(false)

  return (
    <> 
      <h1>Juego de Memoria</h1>
      {!startGame ? <Menu setStartGame={setStartGame}/> : <Board setStartGame={setStartGame}/>}
    </>
  )
}

export default App
