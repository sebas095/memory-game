import PropTypes from 'prop-types'

const Score = ({ matchedPairs, failurePoints }) => {
  return (
    <div>Aciertos: {matchedPairs} - Errores: {failurePoints}</div>
  )
}

Score.propTypes = {
  matchedPairs: PropTypes.number.isRequired,
  failurePoints: PropTypes.number.isRequired,
}

export default Score