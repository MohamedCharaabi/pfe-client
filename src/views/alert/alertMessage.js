import { Fragment, useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'
import BasicBlocking from './BasicBlocking'
import axios from 'axios'
import ExtensionsHeader from '@components/extensions-header'
import { useParams } from 'react-router'
import { handleError } from '../exports/SweetAlerts'

const Editor = () => {
    const { id } = useParams()
    const [alert, setAlert] = useState()
    const [isLoading, setIsLoading] = useState(true)

    async function seenAlert() {
        await axios.patch(`https://pfe-cims.herokuapp.com/alert/see/${id}`)
            .then(res => console.log(res.data))
            .catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))


    }
    async function getAlert() {

        await axios.get(`https://pfe-cims.herokuapp.com/alert/${id}`)
            .then(res => {
                setAlert(res.data)
                setIsLoading(false)
            }).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
    }

    useEffect(() => {
        getAlert()
        seenAlert()

    }, [])

    if (isLoading) return <span></span>

    return (
        <Fragment>
            <ExtensionsHeader

                subTitle={alert.writedAt}
            />

            <Row>
                <Col sm={12}>

                    <BasicBlocking props={alert} />
                </Col>

            </Row>
        </Fragment>
    )
}

export default Editor
