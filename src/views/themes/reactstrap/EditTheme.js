
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
const EditTheme = () => {
    const { id } = useParams()
    const [depForm, setDepForm] = useState({})
    const [theme, setTheme] = useState()
    const [formData, setFormData] = useState({ theme: '', creator: '' })
    const [isLoading, setIsLoading] = useState(true)

    async function getTheme() {

        await axios.get(`https://pfe-cims.herokuapp.com/theme/${id}`)
            .then(res => {
                setTheme(res.data)
                setFormData({ ...formData, theme: res.data.theme, creator: res.data.creator })
                // setDepForm({ ...depForm, name: res.data.name })

                setIsLoading(false)
            }).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
    }

    useEffect(() => {
        getTheme()

    }, [])

    async function submit() {
        await axios.patch(`https://pfe-cims.herokuapp.com/theme/${id}`, formData)
            .then(res => handleSuccess({ props: { title: 'Theme Modifier' } })
                .catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } })))
    }


    if (isLoading) {
        return <span></span>
    }
    return (

        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Edit Theme</CardTitle>
            </CardHeader>

            <CardBody>
                <Form onSubmit={submit}>
                    <Row>

                        <Col lg='3' md='6' sm='12'>
                            <FormGroup>
                                <Label for='nameMulti'>Theme Name</Label>
                                <Input type='text' name='name' id='nameMulti' placeholder={theme.theme}
                                    onChange={(e) => setFormData({ ...formData, theme: e.target.value })} />
                            </FormGroup>
                        </Col>
                        <Col lg='3' md='6' sm='12'>
                            <FormGroup>
                                <Label for='nameMulti'>Theme Creator</Label>
                                <Input type='text' name='name' id='nameMulti' placeholder={theme.creator}

                                    onChange={(e) => setFormData({ ...formData, creator: e.target.value })} />
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

export default EditTheme
