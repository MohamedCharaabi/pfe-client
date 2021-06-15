
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
const EditDirection = () => {
    const { dir } = useParams()
    const [dirForm, setDirForm] = useState({ name: '', dep_name: '' })
    const [direction, setDirection] = useState()
    const [formData, setFormData] = useState({ fullName: '', email: '', rolePer: 'dir', Dep: '', Dir: '', Div: '', Ser: '' })
    const [isLoading, setIsLoading] = useState(true)
    const [depOptions, setDepOptions] = useState()
    const [departments, setDepartments] = useState([])


    async function getDir() {

        await axios.get(`https://pfe-cims.herokuapp.com/dir/${dir}`)
            .then(res => {
                setDirection(res.data)
                setDirForm({ ...dirForm, dep_name: res.data.dep_name })
                setIsLoading(false)
            }).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
    }
    async function loadDepartments() {
        await axios.get('https://pfe-cims.herokuapp.com/dep')
            .then(res => {

                const options = []
                res.data.forEach(dep => {
                    options.push({ value: dep.name, label: dep.name })
                })
                setDepOptions(options)
                setDepartments(res.data)
            })
            .catch(error => alert(error.message))
    }


    useEffect(() => {
        loadDepartments()
        getDir()

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
        // console.log(formData)
        // console.log(dirForm)
        await axios.patch(`https://pfe-cims.herokuapp.com/dir/${dir}`, dirForm)
            .then(res => handleSuccess({ props: { title: 'Direction est modifier' } }))
            .catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
        // await axios.post("https://pfe-cims.herokuapp.com/new/register", formData,
        //     {
        //         headers: {
        //             "Access-Control-Allow-Origin": "*"
        //         }
        //     })
        //     .then(async (res) => handleSuccess({ props: { title: 'Direction updated successfully' } })
        //     ).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
    }

    if (isLoading) {
        return <span></span>
    }
    return (

        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Edit Direction</CardTitle>
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
                                defaultValue={
                                    { value: direction.dep_name, label: dirForm.dep_name }

                                }
                                options={depOptions}
                                // onFocus={getDepartments}
                                onChange={val => {
                                    setDirForm({ ...dirForm, dep_name: val.value })
                                    // setDirOptions([])
                                    // setDivOptions([])
                                    // setSerOptions([])

                                }}
                                isClearable={false}
                            />
                        </Col>

                        <Col lg='3' md='6' sm='12'>
                            <FormGroup>
                                <Label for='nameMulti'>Direction Name</Label>
                                <Input type='text' name='name' id='nameMulti' placeholder={direction.name}
                                    onChange={(e) => setDirForm({ ...dirForm, name: e.target.value })} />
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

export default EditDirection
