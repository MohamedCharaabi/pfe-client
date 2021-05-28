import { Fragment, useEffect } from 'react'
import { Row, Col } from 'reactstrap'
import prism from 'prismjs'
import TableBasic from './TableBasic'

import Card from '@components/card-snippet'


const Tables = () => {
  useEffect(() => {
    prism.highlightAll()
  })

  return (
    <Fragment>
      {/* <Breadcrumbs breadCrumbTitle='Reactstrap Tables' breadCrumbParent='Forms & Tables' breadCrumbActive='Tables' /> */}
      <Row>
        <Col sm='12'>
          <Card title='Themes' noBody>
            <TableBasic />
          </Card>
        </Col>

      </Row>
    </Fragment>
  )
}

export default Tables
