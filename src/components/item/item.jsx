import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import cardBackground from '../../assets/card-background.png'
import './item.css'

const Item = ({ name, url, hidden = true, onClick }) => {
  return (
    <Card className="mb-4 p-0 border-0" onClick={onClick}>
      <Card.Img className="item__img" alt={hidden ? 'card-background' : name} src={hidden ? cardBackground : url}/>
    </Card>
  )
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  hidden: PropTypes.bool.isRequired,
}

export default Item
