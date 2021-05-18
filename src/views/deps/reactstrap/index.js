import { Fragment, useEffect, useState } from 'react'
import { Row, Col, CardBody, CardText } from 'reactstrap'
import prism from 'prismjs'
import axios from 'axios'
import TableBasic from './TableBasic'
import TableDark from './TableDark'
import TableTheadDark from './TableTheadDark'
import TableTheadLight from './TableTheadLight'
import TableStriped from './TableStriped'
import TableStripedDark from './TableStripedDark'
import TableBordered from './TableBordered'
import TableBorderless from './TableBorderless'
import TableHover from './TableHover'
import TableSmall from './TableSmall'
import TableContextual from './TableContextual'
import TableResponsive from './TableResponsive'
import TableHoverAnimation from './TableHoverAnimation'
import Breadcrumbs from '@components/breadcrumbs'
import Card from '@components/card-snippet'
import {
  tableBasic,
  tableDark,
  tableTheadOptions,
  tableStriped,
  tableStripedDark,
  tableBordered,
  tableBorderless,
  tableContextual,
  tableHover,
  tableSmall,
  tableHoverAnimation,
  tableResponsive
} from './TableSourceCode'
import { Redirect } from 'react-router'

const Tables = () => {
  useEffect(() => {
    prism.highlightAll()
  })

  return (
    <Fragment>
      {/* <Breadcrumbs breadCrumbTitle='Reactstrap Tables' breadCrumbParent='Forms & Tables' breadCrumbActive='Tables' /> */}
      <Row>
        <Col sm='12'>
          <Card title='Departments' noBody>
            <TableBasic />
          </Card>
        </Col>

      </Row>
    </Fragment >
  )
}

export default Tables
