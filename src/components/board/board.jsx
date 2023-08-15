import { useEffect, useState, useRef } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Confetti from 'react-confetti';
import PropTypes from 'prop-types'

import Item from '../item/item'
import Score from '../score/score'
import CongratulationModal from '../modal/congratulation-modal'
import useFetch from '../../hooks/useFetch'
import { getRandomItems, initializeArrayWithValues } from '../../utils/array-utils'
import { ANIMALS_API_URL } from '../../utils/constants'

const Board = ({ setStartGame }) => {
  const { data, isLoading } = useFetch(ANIMALS_API_URL)
  const [items, setItems] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [username, setUsername] = useState('')
  const [visibility, setVisibility] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [failurePoints, setFailurePoints] = useState(0)
  const timeout = useRef(null)

  const checkMatch = () => {
    const [firstIndex, secondIndex] = flippedCards
      
    if (items[firstIndex].meta.uuid === items[secondIndex].meta.uuid) {
      setMatchedPairs(matchedPairs + 1)
      setFlippedCards([])
      return
    }

    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setFlippedCards([])
      setFailurePoints(failurePoints + 1)
      const visibilityCopy = [...visibility]
      visibilityCopy[firstIndex] = false
      visibilityCopy[secondIndex] = false
      setVisibility(visibilityCopy)
    }, 500);
  };

  const handleCardClick = (index) => {
    if (visibility[index]) return

    if (flippedCards.length <= 1) {
      const visibilityCopy = [...visibility]
      visibilityCopy[index] = true
      setVisibility(visibilityCopy)
    }

    if (flippedCards.length === 1) {
      setFlippedCards([...flippedCards, index])
    } else if (!flippedCards.length) {
      clearTimeout(timeout.current)
      setFlippedCards([index])
    }
  }

  const handleModalClick = () => {
    setModalShow(false)
    setStartGame(false)
  }

  useEffect(() => {
    if (data) {
      const entries = getRandomItems(data.entries, 9)
      const animalList = [...entries, ...entries]
      setItems(getRandomItems(animalList, animalList.length))
      setVisibility(initializeArrayWithValues(animalList.length, false))
    }
  }, [data])

  useEffect(() => {
    let timeout = null
    if (flippedCards.length === 2) {
      timeout = setTimeout(checkMatch, 300)
    }

    return () => clearTimeout(timeout)
  }, [flippedCards])

  useEffect(() => {
    if (matchedPairs > 0 && matchedPairs * 2 === items.length) {
      setUsername(window.sessionStorage.getItem('username'))
      setModalShow(true)
    }
  }, [matchedPairs])

  if (isLoading) {
    return (
      <div>
        <Spinner animation="border" variant="primary"/>
      </div>
    )
  }

  return (
    <Container fluid>
      <Score matchedPairs={matchedPairs} failurePoints={failurePoints}/>
      <Row>
        {items.map((item, i) => (
          <Col xs={6} md={4} lg={2} key={`${item.meta.uuid}-${i}`}>
            <Item 
              name={item.fields.image.title}
              url={item.fields.image.url}
              hidden={!visibility[i]}
              onClick={() => handleCardClick(i)}
            />
          </Col>
        ))}
      </Row>
      <CongratulationModal show={modalShow} onHide={handleModalClick} username={username}/>
      {modalShow && <Confetti/>}
    </Container>
  )
}

Board.propTypes = {
  setStartGame: PropTypes.func.isRequired,
}

export default Board
