
import { useEffect, useState } from 'react'
import axios from 'axios'

import Select from 'react-select'
import { selectThemeColors } from '@utils'

import {

    Row,
    Col,
    CardTitle,
    Card, CardHeader,
    CardBody,
    Form,
    Input,
    FormGroup,
    Label,
    Button

} from 'reactstrap'
import { handleError, handleSuccess } from '../../exports/SweetAlerts'
import { useParams } from 'react-router'

const colourOptions = [
    { value: 'Departments', label: 'Departments' },
    { value: 'Directions', label: 'Directions' },
    { value: 'Divisions', label: 'Divisions' },
    { value: 'Services', label: 'Services' },
    { value: 'Themes', label: 'Themes' }

]
const EditService = () => {
    const { ser } = useParams()
    const [serForm, setSerForm] = useState({})
    const [service, setService] = useState()
    const [formData, setFormData] = useState({ fullName: '', email: '', rolePer: 'ser', Dep: '', Dir: '', Div: '', Ser: '' })
    const [isLoading, setIsLoading] = useState(true)

    async function getSer() {

        await axios.get(`https://pfe-cims.herokuapp.com/ser/${ser}`)
            .then(res => {
                setService(res.data)
                setFormData({ ...formData, Dep: res.data.dep_name, Dir: res.data.dir_name, Div: res.data.div_name, Ser: res.data.name })
                setIsLoading(false)
            }).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
    }

    useEffect(() => {
        getSer()

    }, [])

    async function submit() {
        // event.preventDefault()
        // console.log(formData)
        // console.log(serForm)
        if (serForm.name) {
            await axios.patch(`https://pfe-cims.herokuapp.com/ser/${ser}`, serForm)
                .then(res => console.log(res.data))
                .catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
        }
        await axios.post("https://pfe-cims.herokuapp.com/new/register", formData,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(async (res) => handleSuccess({ props: { title: 'Service updated successfully' } })
            ).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
    }

    if (isLoading) {
        return <span></span>
    }
    return (

        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Edit Service</CardTitle>
            </CardHeader>

            <CardBody>
                <Form onSubmit={submit}>
                    <Row>

                        <Col lg='3' md='6' sm='12'>
                            <FormGroup>
                                <Label for='nameMulti'>Service Name</Label>
                                <Input type='text' name='name' id='nameMulti' placeholder={service.name}
                                    onChange={(e) => setSerForm({ name: e.target.value })} />
                            </FormGroup>
                        </Col>
                        <Col lg='3' md='6' sm='12'>
                            <FormGroup>
                                <Label for='nameMulti'>Director Name</Label>
                                <Input type='text' name='name' id='nameMulti' placeholder="director full name"
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                            </FormGroup>
                        </Col>
                        <Col lg='3' md='6' sm='12'>
                            <FormGroup>
                                <Label for='nameMulti'>Director email</Label>
                                <Input type='email' name='name' id='nameMulti' placeholder='director email'
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </FormGroup>
                        </Col>


                    </Row>
                    <Row>
                        <Col lg='6' sm='12'>
                            <FormGroup className='d-flex mb-0'>
                                <Button.Ripple className='mr-1' color='primary' type='submit' onClick={e => { e.preventDefault(); submit() }}>
                                    Submit
                </Button.Ripple>
                                <Button.Ripple outline color='secondary' type='reset' >
                                    Reset
                </Button.Ripple>
                            </FormGroup>
                        </Col>

                    </Row>
                </Form>
            </CardBody>

        </Card>

    )
}

export default EditService
