
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
    Button, Media

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
    const [logo, setLogo] = useState()
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

    const onChange = e => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setLogo(reader.result)
        }
        reader.readAsDataURL(files[0])
    }

    const uploadImage = async () => {

        const data = new FormData()
        data.append("file", logo)
        data.append("upload_preset", "default")
        data.append("cloud_name", "isetz")

        console.log(logo)
        console.log(formData)


        fetch("  https://api.cloudinary.com/v1_1/isetz/image/upload",
            { method: "post", body: data })
            .then(resp => resp.json())
            .then(async (data) => {
                console.log(data)
                await axios.patch(`https://pfe-cims.herokuapp.com/theme/updatelogo/${id}`, { logo: data.url })
                    .then(res => {
                        handleSuccess({ props: { title: 'Theme modifier!!' } })
                        // reLogin(data = { email: formData.email, password: userData.password })
                    })
                    .catch(err => handleError({ props: { title: 'An Error aquired', text: err.message } }))

            })
            .catch(err => handleError({ props: { title: 'An Error aquired', text: err.message } }))

    }
    function submit() {
        // await axios.patch(`https://pfe-cims.herokuapp.com/theme/${id}`, formData)
        //     .then(res => handleSuccess({ props: { title: 'Theme Modifier' } })
        //         .catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } })))
        // if (trigger()) {
        uploadImage()
        // }
    }


    if (isLoading) {
        return <span></span>
    }
    return (

        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Modifier Theme</CardTitle>
            </CardHeader>

            <CardBody>
                <Media>
                    <Media className='mr-25' left>
                        <Media object className='rounded mr-50' src={logo} alt='Generic placeholder image' height='80' width='80' />
                    </Media>
                    <Media className='mt-75 ml-1' body>
                        <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                            Upload
                            <Input type='file' onChange={onChange} hidden accept='image/*' />
                        </Button.Ripple>
                        {/* <Button.Ripple color='secondary' size='sm' outline>
                            Reset
                        </Button.Ripple> */}
                        <p>Format JPG, GIF, PNG. Max 800kB</p>
                    </Media>
                </Media>

                <Form onSubmit={submit}>
                    <Row>

                        <Col lg='3' md='6' sm='12'>
                            <FormGroup>
                                <Label for='nameMulti'>Nom</Label>
                                <Input type='text' name='name' id='nameMulti' placeholder={theme.theme}
                                    onChange={(e) => setFormData({ ...formData, theme: e.target.value })} />
                            </FormGroup>
                        </Col>
                        <Col lg='3' md='6' sm='12'>
                            <FormGroup>
                                <Label for='nameMulti'>Createur</Label>
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
                                <Button.Ripple className='mr-75' size='sm' color='primary' type={'reset'}>
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
