
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
const AddService = () => {
    const [isLoading, setisLoading] = useState(true)
    const [departments, setDepartments] = useState([])
    const [directions, setDirections] = useState([])
    const [divisions, setDivisions] = useState([])
    const [formData, setFormData] = useState({ name: '', dep_name: '' })
    const [depOptions, setDepOptions] = useState()
    const [dirOptions, setDirOptions] = useState()
    const [divOptions, setDivOptions] = useState()

    async function loadDepartments() {
        await axios.get('https://pfe-cims.herokuapp.com/dep')
            .then(res => setDepartments(res.data))
            .catch(error => alert(error.message))
    }
    async function loadDirections() {
        await axios.get('https://pfe-cims.herokuapp.com/dir')
            .then(res => setDirections(res.data))
            .catch(error => alert(error.message))
    }
    async function loadDivisions() {
        await axios.get('https://pfe-cims.herokuapp.com/div')
            .then(res => {
                setDivisions(res.data)
                setisLoading(false)
            })
            .catch(error => alert(error.message))
    }

    useEffect(() => {
        loadDepartments()
        loadDirections()
        loadDivisions()

    }, [])

    function getDepartments() {
        const options = []
        departments.forEach(dep => {
            options.push({ value: dep.name, label: dep.name })
        })
        setDepOptions(options)
    }
    function getDirections() {
        const options = []
        if (formData.dep_name === '') {
            setDirOptions(options)
        } else {
            directions.forEach(dir => {
                if (dir.dep_name === formData.dep_name) {
                    options.push({ value: dir.name, label: dir.name })
                }
            })
            setDirOptions(options)

        }


    }
    function getDivisions() {
        const options = []
        if (formData.dir_name === '') {
            setDivOptions(options)
        } else {
            divisions.forEach(div => {
                if (div.dir_name === formData.dir_name) {
                    options.push({ value: div.name, label: div.name })
                }
            })
            setDivOptions(options)

        }
    }
    async function submit() {
        // event.preventDefault()
        // console.log(formData)
        await axios.post("https://pfe-cims.herokuapp.com/ser", formData)
            .then(res => handleSuccess({ props: { title: 'Service submited successfully' } })
            ).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
    }

    if (isLoading) {
        return <span></span>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Ajout Service</CardTitle>
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
                                    setFormData({ ...formData, dep_name: val.value, dir_name: '', div_name: '' })
                                    setDirOptions([])
                                    setDivOptions([])
                                    // setSerOptions([])

                                }}
                                isClearable={false}
                            />
                        </Col>

                        <Col className='mb-1' lg='3' md='6' sm='12'>
                            <Label>Direction</Label>
                            <Select
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                defaultValue={colourOptions[1]}
                                options={dirOptions}
                                onFocus={getDirections}
                                onChange={val => {
                                    setFormData({ ...formData, dir_name: val.value, div_name: '' })
                                    setDivOptions([])
                                    // setSerOptions([])

                                }}
                                isClearable={false}
                            />
                        </Col>
                        <Col className='mb-1' lg='3' md='6' sm='12'>
                            <Label>Division</Label>
                            <Select
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                defaultValue={colourOptions[2]}
                                options={divOptions}
                                onFocus={getDivisions}
                                onChange={val => {
                                    setFormData({ ...formData, div_name: val.value })
                                    // setDirOptions([])
                                    // setDivOptions([])
                                    // setSerOptions([])

                                }}
                                isClearable={false}
                            />
                        </Col>

                        <Col lg='3' md='6' sm='12'>
                            <FormGroup>
                                <Label for='nameMulti'>Nom Service</Label>
                                <Input type='text' name='name' id='nameMulti' placeholder='Nom Service'
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

export default AddService
