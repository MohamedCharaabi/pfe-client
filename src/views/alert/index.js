import { Fragment, useEffect } from 'react'
import { Row, Col, CardBody, CardText } from 'reactstrap'
import prism from 'prismjs'
import TableBasic from './TableBasic'

import Card from '@components/card-snippet'


const Alerts = () => {
  useEffect(() => {
    prism.highlightAll()
  })

  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <Card title='ALerts'
            noBody >
            <TableBasic />
          </Card>
        </Col>

      </Row>
    </Fragment >
  )
}

export default Alerts
