import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import cardBackground from '../../assets/card-background.png'
import './item.css'

const Item = ({ name, url, hidden = true, onClick }) => {
  return (
    <Card className={`mb-4 p-0 border-0 item__container ${!hidden ? "item__container--flipped" : ""}`} onClick={onClick}>
      {hidden ? (
        <div className="item__face">
          <Card.Img className="item__img" alt="card-background" src={cardBackground}/>
        </div>
      ) : (
        <div className="item__face item__face--back">
          <Card.Img className="item__img" alt={name} src={url}/>
        </div>
      )}
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
