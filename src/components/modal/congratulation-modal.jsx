import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'

const CongratulationModal = ({ show, onHide, username }) => {
  return (
    <Modal
      size="md"
      aria-labelledby="congratulation-modal"
      centered
      show={show}
    >
      <Modal.Body>
        <p className="text-center pt-3 fs-5">Felicitaciones {username} has terminado el juego!</p>
        <div className="d-flex justify-content-center pt-4">
          <Button variant="primary" onClick={onHide} size="lg" aria-label="Ir al inicio" role="button">Ir al inicio</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

CongratulationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
}

export default CongratulationModal