
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

const colourOptions = [
    { value: 'Departments', label: 'Departments' },
    { value: 'Directions', label: 'Directions' },
    { value: 'Divisions', label: 'Divisions' },
    { value: 'Services', label: 'Services' },
    { value: 'Themes', label: 'Themes' }

]
const AddDepartment = () => {


    const [formData, setFormData] = useState({ name: '' })

    async function submit() {
        // event.preventDefault()
        console.log(formData)
        await axios.post("https://pfe-cims.herokuapp.com/dep", formData)
            .then(res => handleSuccess({ props: { title: 'Department submited successfully' } })
            ).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
    }


    return (

        <Card>
            <CardHeader>
                <CardTitle tag='h4'>ADD Department</CardTitle>
            </CardHeader>

            <CardBody>
                <Form onSubmit={submit}>
                    <Row>

                        <Col lg='3' md='6' sm='12'>
                            <FormGroup>
                                <Label for='nameMulti'>Department Name</Label>
                                <Input type='text' name='name' id='nameMulti' placeholder='Department Name'
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
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

export default AddDepartment
