import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './menu.css'

const Menu = ({ setStartGame }) => {
  const [modalShow, setModalShow] = useState(false)
  const [validated, setValidated] = useState(false)
  const [username, setUsername] = useState('')

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)

    if (username) {
      window.sessionStorage.setItem('username', username)
      setStartGame(true)
    }
  }

  const handleUserChange = (event) => {
    setUsername(event.target.value)
  }

  const play = () => {
    if (window.sessionStorage.getItem('username')) {
      setStartGame(true)
    } else {
      setModalShow(true)
    }
  }

  if (modalShow) {
    return (
      <Modal
        size="md"
        aria-labelledby="username-modal"
        centered
        show={modalShow}
      >
        <Modal.Body>
          <h2 className="text-center pb-3">Bienvenido</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit} role="form">
            <Row className="justify-content-center">
              <Col xs={12} md={10}>
                <Form.Control
                  required
                  type="text"
                  placeholder="Por favor ingrese un nombre de usuario"
                  value={username}
                  onChange={handleUserChange}
                  autoFocus
                  data-testid="username"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingresa un nombre de usuario
                </Form.Control.Feedback>              
              </Col>
            </Row>

            <div className="d-flex justify-content-center pt-4">
              <Button variant="primary" type="submit" size="lg" aria-label="Comenzar" role="button">Comenzar</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <div className="pt-5">
      <Button className="menu__button" variant="success" onClick={play} size="lg" aria-label="Jugar" role="button">Jugar</Button>
    </div>
  )
}

Menu.propTypes = {
  setStartGame: PropTypes.func.isRequired,
}

export default Menu
