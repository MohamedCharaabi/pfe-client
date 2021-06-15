import { Fragment, useEffect } from 'react'
import { Row, Col } from 'reactstrap'
import prism from 'prismjs'
import TableBasic from './TableBasic'

import Card from '@components/card-snippet'
import DataTableWithButtons from './TableWithButtons'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import PropositionTable from './propositionTable'
import StandartProposition from './StandartProposition'

const Proposition = () => {
    useEffect(() => {
        prism.highlightAll()
    })

    return (
        <Fragment>
            {/* <Breadcrumbs breadCrumbTitle='Reactstrap Tables' breadCrumbParent='Forms & Tables' breadCrumbActive='Tables' /> */}
            <Row>
                <Col sm='12'>
                    <Card title='Propositons' noBody>
                        <StandartProposition />
                        {/* <PropositionTable /> */}

                    </Card>
                </Col>

            </Row>
        </Fragment>
    )
}

export default Proposition
