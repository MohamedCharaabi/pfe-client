
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
import { handleError, handleInfo, handleSuccess } from '../../exports/SweetAlerts'
import { useParams } from 'react-router'

const colourOptions = [
    { value: 'Departments', label: 'Departments' },
    { value: 'Directions', label: 'Directions' },
    { value: 'Divisions', label: 'Divisions' },
    { value: 'Services', label: 'Services' },
    { value: 'Themes', label: 'Themes' }

]
const EditDepartment = () => {
    const { dep } = useParams()
    const [depForm, setDepForm] = useState({})
    const [department, setDepartment] = useState()
    const [formData, setFormData] = useState({ fullName: '', email: '', rolePer: 'dep', Dep: '', Dir: '', Div: '', Ser: '' })
    const [isLoading, setIsLoading] = useState(true)

    async function getDep() {

        await axios.get(`https://pfe-cims.herokuapp.com/dep/${dep}`)
            .then(res => {
                setDepartment(res.data)
                setFormData({ ...formData, Dep: res.data.name })
                // setDepForm({ ...depForm, name: res.data.name })

                setIsLoading(false)
            }).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
    }

    useEffect(() => {
        getDep()

    }, [])

    async function submit() {
        // event.preventDefault()
        // console.log(formData)
        // console.log(depForm)
        if (depForm.name) {
            await axios.patch(`https://pfe-cims.herokuapp.com/dep/${dep}`, depForm)
                .then(res => console.log(res.data))
                .catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
        }
        await axios.post("https://pfe-cims.herokuapp.com/new/register", formData,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(async (res) => handleSuccess({ props: { title: 'Department updated successfully' } })
            ).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
    }

    if (isLoading) {
        return <span></span>
    }
    return (

        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Edit Department</CardTitle>
            </CardHeader>

            <CardBody>
                <Form onSubmit={submit}>
                    <Row>

                        <Col lg='3' md='6' sm='12'>
                            <FormGroup>
                                <Label for='nameMulti'>Department Name</Label>
                                <Input type='text' name='name' id='nameMulti' placeholder={department.name}
                                    onChange={(e) => setDepForm({ name: e.target.value })} />
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
        //                 {/* </Col>
        //             </Row>
        //         </div>
        //    */}
    )
}

export default EditDepartment
