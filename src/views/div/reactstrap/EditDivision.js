
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
const EditDivision = () => {
    const { div } = useParams()
    const [divForm, setDivForm] = useState({})
    const [division, setDivision] = useState()
    const [formData, setFormData] = useState({ fullName: '', email: '', rolePer: 'div', Dep: '', Dir: '', Div: '', Ser: '' })
    const [isLoading, setIsLoading] = useState(true)
    const [depOptions, setDepOptions] = useState()
    const [dirOptions, setDirOptions] = useState()
    const [departments, setDepartments] = useState([])
    const [directions, setDirections] = useState([])

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


    async function getDiv() {

        await axios.get(`https://pfe-cims.herokuapp.com/div/${div}`)
            .then(res => {
                setDivision(res.data)
                setDivForm({ ...divForm, name: res.data.name, dir_name: res.data.dir_name, dep_name: res.data.dep_name })
                setIsLoading(false)
            }).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
    }

    useEffect(() => {
        loadDepartments()
        loadDirections()
        getDiv()

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
            if (dir.dep_name === divForm.dep_name) {
                options.push({ value: dir.name, label: dir.name })
            }
        })
        setDirOptions(options)
    }
    async function submit() {
        // event.preventDefault()
        console.log(divForm)
        // console.log(dirForm)
        await axios.patch(`https://pfe-cims.herokuapp.com/div/${div}`, divForm)
            .then(res => handleSuccess({ props: { title: 'Division est modifier' } }))
            .catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))

        // await axios.post("https://pfe-cims.herokuapp.com/new/register", formData,
        //     {
        //         headers: {
        //             "Access-Control-Allow-Origin": "*"
        //         }
        //     })
        //     .then(async (res) => handleSuccess({ props: { title: 'Divison updated successfully' } })
        //     ).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
    }

    if (isLoading) {
        return <span></span>
    }
    return (

        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Edit Division</CardTitle>
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
                                defaultValue={{ value: division.dep_name, label: division.dep_name }}
                                options={depOptions}
                                onFocus={getDepartments}
                                onChange={val => {
                                    setDivForm({ ...divForm, dep_name: val.value, dir_name: '' })
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
                                defaultValue={{ value: division.dir_name, label: division.dir_name }}
                                options={dirOptions}
                                onFocus={getDirections}
                                onChange={val => {
                                    setDivForm({ ...divForm, dir_name: val.value })
                                    // setDirOptions([])
                                    // setDivOptions([])
                                    // setSerOptions([])

                                }}
                                isClearable={false}
                            />
                        </Col>


                        <Col lg='3' md='6' sm='12'>
                            <FormGroup>
                                <Label for='nameMulti'>Division Name</Label>
                                <Input type='text' name='name' id='nameMulti' placeholder={division.name}
                                    onChange={(e) => setDivForm({ ...divForm, name: e.target.value })} />
                            </FormGroup>
                        </Col>
                        {/* <Col lg='3' md='6' sm='12'>
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
                        </Col> */}


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

export default EditDivision
