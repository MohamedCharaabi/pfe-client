
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
const AjoutDirDirector = () => {
    // const { dep } = useParams()
    const [depForm, setDepForm] = useState({})
    const [directions, setDirections] = useState()
    const [formData, setFormData] = useState({ fullName: '', email: '', rolePer: 'dir', Dep: '', Dir: '', Div: '', Ser: '' })
    const [isLoading, setIsLoading] = useState(false)
    const [dirOptions, setDirOptions] = useState()

    async function loadDirections() {
        await axios.get('https://pfe-cims.herokuapp.com/dir/checkdirector')
            .then(res => setDirections(res.data))
            .catch(error => alert(error.message))
    }

    useEffect(() => {
        loadDirections()

    }, [])

    function getDirections() {
        const options = []
        directions.forEach(dir => {
            options.push({ value: dir.name, label: dir.name })
        })
        setDirOptions(options)
    }
    async function submit() {
        // event.preventDefault()

        console.log(formData)
        // if (depForm.name) {
        //     await axios.patch(`https://pfe-cims.herokuapp.com/dep/${dep}`, depForm)
        //         .then(res => console.log(res.data))
        //         .catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
        // }
        await axios.post("https://pfe-cims.herokuapp.com/new/register", formData,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(async (res) => handleSuccess({ props: { title: 'Directeur ajouter' } })
            ).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
    }

    if (isLoading) {
        return <span></span>
    }
    return (

        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Ajout Modirateur</CardTitle>
            </CardHeader>

            <CardBody>
                <Form onSubmit={submit}>
                    <Row>

                        <Col className='mb-1' lg='3' md='6' sm='12'>
                            <Label>Directions</Label>
                            <Select
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                defaultValue={colourOptions[1]}
                                options={dirOptions}
                                onFocus={getDirections}
                                onChange={val => {

                                    const dep = directions.find(e => e.name === val.value).dep_name
                                    setFormData({
                                        ...formData,
                                        Dir: val.value,
                                        Dep: dep
                                    })
                                    // setDirOptions([])
                                    // setDivOptions([])
                                    // setSerOptions([])

                                }}
                                isClearable={false}
                            />
                        </Col>

                        <Col lg='3' md='6' sm='12'>
                            <FormGroup>
                                <Label for='nameMulti'>Nom Modirateur</Label>
                                <Input type='text' name='name' id='nameMulti'
                                    placeholder="Nom Modirateur"
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                            </FormGroup>
                        </Col>
                        <Col lg='3' md='6' sm='12'>
                            <FormGroup>
                                <Label for='nameMulti'>Email</Label>
                                <Input type='email' name='name' id='nameMulti'
                                    placeholder='Email'
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

export default AjoutDirDirector
