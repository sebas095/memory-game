import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Score = ({ matchedPairs, failurePoints }) => {
  return (
    <Row className="pt-2 pb-3">
      <Col className="fs-4">
        <span className="text-primary">Aciertos: {matchedPairs}</span> - <span className="text-danger">Errores: {failurePoints}</span>
      </Col>
    </Row>
  )
}

Score.propTypes = {
  matchedPairs: PropTypes.number.isRequired,
  failurePoints: PropTypes.number.isRequired,
}

export default Score