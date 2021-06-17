
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
const AddDirection = () => {

    const [departments, setDepartments] = useState([])
    const [formData, setFormData] = useState({ name: '', dep_name: '' })
    const [depOptions, setDepOptions] = useState()
    async function loadDepartments() {
        await axios.get('https://pfe-cims.herokuapp.com/dep')
            .then(res => setDepartments(res.data))
            .catch(error => alert(error.message))
    }

    useEffect(() => {
        loadDepartments()

    }, [])

    function getDepartments() {
        const options = []
        departments.forEach(dep => {
            options.push({ value: dep.name, label: dep.name })
        })
        setDepOptions(options)
    }
    async function submit() {
        // event.preventDefault()
        console.log(formData)
        await axios.post("https://pfe-cims.herokuapp.com/dir", formData)
            .then(res => handleSuccess({ props: { title: 'Direction submited successfully' } })
            ).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
    }


    return (

        // <div className='auth-wrapper auth-v2'>
        //     <Row className='auth-inner m-0'>
        //         <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='6' sm='12'>

        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Ajout Direction</CardTitle>
            </CardHeader>

            <CardBody>
                <Form onSubmit={submit}>
                    <Row>

                        <Col className='mb-1' lg='3' md='6' sm='12'>
                            <Label>Department</Label>
                            <Select
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                defaultValue={colourOptions[0]}
                                options={depOptions}
                                onFocus={getDepartments}
                                onChange={val => {
                                    setFormData({ ...formData, dep_name: val.value })
                                    // setDirOptions([])
                                    // setDivOptions([])
                                    // setSerOptions([])

                                }}
                                isClearable={false}
                            />
                        </Col>

                        <Col lg='3' md='6' sm='12'>
                            <FormGroup>
                                <Label for='nameMulti'>Nom Direction</Label>
                                <Input type='text' name='name' id='nameMulti' placeholder='Nom Direction'
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

export default AddDirection
