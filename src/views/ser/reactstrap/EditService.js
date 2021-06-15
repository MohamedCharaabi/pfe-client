
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
    const [depOptions, setDepOptions] = useState()
    const [dirOptions, setDirOptions] = useState()
    const [divOptions, setDivOptions] = useState()
    const [departments, setDepartments] = useState([])
    const [directions, setDirections] = useState([])
    const [divisions, setDivisions] = useState([])
    async function loadDepartments() {
        await axios.get('https://pfe-cims.herokuapp.com/dep')
            .then(res => setDepartments(res.data))
            .catch(error => alert(error.message))
    }
    async function loadDirections() {
        await axios.get('https://pfe-cims.herokuapp.com/dir')
            .then(res => {
                setDirections(res.data)

            })
            .catch(error => alert(error.message))
    }
    async function loadDivisions() {
        await axios.get('https://pfe-cims.herokuapp.com/dir')
            .then(res => {
                setDivisions(res.data)

            })
            .catch(error => alert(error.message))
    }
    async function getSer() {

        await axios.get(`https://pfe-cims.herokuapp.com/ser/${ser}`)
            .then(res => {
                setService(res.data)
                setSerForm({
                    ...serForm,
                    name: res.data.name,
                    div_name: res.data.div_name,
                    dir_name: res.data.dir_name,
                    dep_name: res.data.dep_name
                })

                // setFormData({ ...formData, Dep: res.data.dep_name, Dir: res.data.dir_name, Div: res.data.div_name, Ser: res.data.name })
                setIsLoading(false)
            }).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
    }

    useEffect(() => {
        loadDepartments()
        loadDirections()
        loadDivisions()
        getSer()

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
        directions.forEach(dir => {
            if (dir.dep_name === serForm.dep_name) {
                options.push({ value: dir.name, label: dir.name })
            }
        })
        setDirOptions(options)
    }
    function getDivisions() {
        const options = []
        divisions.forEach(div => {
            if (div.dep_name === serForm.dir_name) {
                options.push({ value: div.name, label: div.name })
            }
        })
        setDivOptions(options)
    }

    async function submit() {
        // event.preventDefault()
        // console.log(formData)
        console.log(serForm)
        // if (serForm.name) {
        // await axios.patch(`https://pfe-cims.herokuapp.com/ser/${ser}`, serForm)
        //     .then(res => handleSuccess({ props: { title: 'Service est modifier' } }))
        //     .catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
        // }
        // await axios.post("https://pfe-cims.herokuapp.com/new/register", formData,
        //     {
        //         headers: {
        //             "Access-Control-Allow-Origin": "*"
        //         }
        //     })
        //     .then(async (res) => handleSuccess({ props: { title: 'Service updated successfully' } })
        //     ).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
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
                        <Col className='mb-1' lg='3' md='6' sm='12'>
                            <Label>Department</Label>
                            <Select
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                defaultValue={{ value: service.dep_name, label: service.dep_name }}
                                options={depOptions}
                                onFocus={getDepartments}
                                onChange={val => {
                                    setSerForm({
                                        ...serForm,
                                        dep_name: val.value,
                                        dir_name: '',
                                        div_name: ''
                                    })
                                    setDirOptions([])


                                }}
                                isClearable={false}
                            />
                        </Col>
                        <Col className='mb-1' lg='3' md='6' sm='12'>
                            <Label>Directions</Label>
                            <Select
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                defaultValue={{ value: service.dir_name, label: service.dir_name }}
                                options={dirOptions}
                                onFocus={getDirections}
                                onChange={val => {
                                    setSerForm({
                                        ...serForm,
                                        dir_name: val.value,
                                        div_name: ''
                                    })
                                    // setDirOptions([])
                                    setDivOptions([])
                                    // setSerOptions([])

                                }}
                                isClearable={false}
                            />
                        </Col>
                        <Col className='mb-1' lg='3' md='6' sm='12'>
                            <Label>Divisions</Label>
                            <Select
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                defaultValue={{ value: service.div_name, label: service.div_name }}
                                options={divOptions}
                                onFocus={getDivisions}
                                onChange={val => {
                                    setSerForm({ ...serForm, div_name: val.value })
                                    // setDirOptions([])
                                    // setDivOptions([])
                                    // setSerOptions([])

                                }}
                                isClearable={false}
                            />
                        </Col>

                        <Col lg='3' md='6' sm='12'>
                            <FormGroup>
                                <Label for='nameMulti'>Service Name</Label>
                                <Input type='text' name='name' id='nameMulti' placeholder={service.name}
                                    onChange={(e) => setSerForm({ name: e.target.value })} />
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
