import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

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
        size="lg"
        aria-labelledby="user"
        centered
        show={modalShow}
      >
        <Modal.Body>
          <h2 className="text-center">Bienvenido</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Label className="pb-1">Nombre de Usuario</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Por favor ingrese un nombre de usuario"
              value={username}
              onChange={handleUserChange}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingresa un nombre de usuario
            </Form.Control.Feedback>

            <div className="d-flex justify-content-center pt-4">
              <Button variant="primary" type="submit">Comenzar</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <div>
      <Button variant="success" onClick={play}>Jugar</Button>
    </div>
  )
}

Menu.propTypes = {
  setStartGame: PropTypes.func.isRequired,
}

export default Menu
