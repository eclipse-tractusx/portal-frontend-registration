import { Row } from 'react-bootstrap'
import { BsCheckCircle, BsCircle } from 'react-icons/bs'

const BulletList = ({ text, icon = 'checkCircle' }) => (
  <div className="content-items">
    <Row>
      <div className="col-1">
        {icon === 'checkCircle' ? (
          <BsCheckCircle color="#0F71CB" className="check-circle" />
        ) : (
          <BsCircle color="#0F71CB" className="check-circle" />
        )}
      </div>
      <div className="col-11 bullet-points">{text}</div>
    </Row>
  </div>
)

export default BulletList
