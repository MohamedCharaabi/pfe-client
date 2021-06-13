import { Fragment } from 'react'
import { Row, Col, Button } from 'reactstrap'
import Breadcrumbs from '@components/breadcrumbs'

import TextareaFloatingLabel from './TextareaFloatingLabel'

const AlertForm = () => {
    return (
        <Fragment>
            <Row>

                <Col sm='12'>
                    <TextareaFloatingLabel />
                </Col>

            </Row>

        </Fragment>
    )
}
export default AlertForm
