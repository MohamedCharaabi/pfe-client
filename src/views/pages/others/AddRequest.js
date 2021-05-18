import { useState, useContext, Fragment, useEffect } from 'react'
import Avatar from '@components/avatar'
import { useSkin } from '@hooks/useSkin'
import { Link, useHistory } from 'react-router-dom'
import { selectThemeColors } from '@utils'
import { Coffee } from 'react-feather'
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

import Select from 'react-select'

import '@styles/base/pages/page-auth.scss'
import axios from 'axios'

// import {  } from '@utils'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>Welcome, {name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>You have successfully logged in as an {role} user to Vuexy. Now you can start to explore. Enjoy!</span>
    </div>
  </Fragment>
)

const colourOptions = [
  { value: 'Departments', label: 'Departments' },
  { value: 'Directions', label: 'Directions' },
  { value: 'Divisions', label: 'Divisions' },
  { value: 'Services', label: 'Services' },
  { value: 'Themes', label: 'Themes' }

]
const AddRequest = props => {
  const [skin, setSkin] = useSkin()

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default
  const [formData, setFormData] = useState({ nomDem: '', prenomDem: '', emailDem: '', themeDem: '', confDem: 'yes', etatDem: 4, rmsqDem: 'ggg', name: 'ser', dep_name: '', dir_name: '', div_name: '', ser_name: '' })
  const [departments, setdepartments] = useState([])
  const [directions, setDirections] = useState([])
  const [divisions, setDivisions] = useState([])
  const [services, setServices] = useState([])
  const [themes, setThemes] = useState([])
  const [depOptions, setDepOptions] = useState([])
  const [dirOptions, setDirOptions] = useState([])
  const [divOptions, setDivOptions] = useState([])
  const [serOptions, setSerOptions] = useState([])
  const [themeOptions, setThemeOptions] = useState([])

  async function getDep() {
    await axios.get('https://pfe-cims.herokuapp.com/dep')
      .then(res => {
        // console.log(res.data)
        setdepartments(res.data)
        // console.log(departments)

      }).catch(error => alert('an error accured while loading departments'))
  }

  async function getDir() {
    await axios.get('https://pfe-cims.herokuapp.com/dir')
      .then(res => {
        // console.log(res.data)
        setDirections(res.data)
        // console.log(departments)

      }).catch(error => alert('an error accured while loading departments'))
  }

  async function getDiv() {
    await axios.get('https://pfe-cims.herokuapp.com/div')
      .then(res => {
        // console.log(res.data)
        setDivisions(res.data)
        // console.log(departments)

      }).catch(error => alert('an error accured while loading departments'))
  }

  async function getSer() {
    await axios.get('https://pfe-cims.herokuapp.com/ser')
      .then(res => {
        // console.log(res.data)
        setServices(res.data)
        // console.log(departments)

      }).catch(error => alert('an error accured while loading departments'))
  }

  async function getTheme() {
    await axios.get('https://pfe-cims.herokuapp.com/theme')
      .then(res => {
        // console.log(res.data)
        setThemes(res.data)
        // console.log(departments)

      }).catch(error => alert('an error accured while loading Themes'))
  }

  useEffect(() => {
    getDep()
    getDir()
    getDiv()
    getSer()
    getTheme()
    // getDepartments()
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
    if (formData.dep_name === "") setDirOptions(options)

    else {
      // console.log(formData.dep_name)
      directions.forEach(dir => {
        if (dir.dep_name === formData.dep_name) options.push({ value: dir.name, label: dir.name })
      })
      setDirOptions(options)
    }

  }

  function getDivisions() {
    const options = []
    if (formData.dir_name === "") setDivOptions(options)

    else {
      // console.log(formData.dep_name)
      divisions.forEach(div => {
        if (div.dir_name === formData.dir_name) options.push({ value: div.name, label: div.name })
      })
      setDivOptions(options)
    }
  }
  function getServices() {
    const options = []
    if (formData.div_name === "") setDivOptions(options)

    else {
      // console.log(formData.dep_name)
      services.forEach(ser => {
        if (ser.div_name === formData.div_name) options.push({ value: ser.name, label: ser.name })
      })
      setSerOptions(options)
    }
  }
  function getThemes() {
    const options = []
    themes.forEach(th => {
      options.push({ value: th.theme, label: th.theme })
    })
    setThemeOptions(options)
  }
  const handleSuccess = () => {
    return MySwal.fire({
      title: 'Good job!',
      text: 'You clicked the button!',
      icon: 'success',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })
  }
  const handleWarning = (messge) => {
    return MySwal.fire({
      title: 'Warning!',
      text: messge,
      icon: 'warning',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })
  }

  const onSubmit = async (e) => {
    // e.preventDefault()
    console.log(formData)
    await axios.post('https://pfe-cims.herokuapp.com/request/', formData)
      .then(res => handleSuccess())
      .catch(err => handleWarning(err.message))

  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <svg viewBox='0 0 139 95' version='1.1' height='28'>
            <defs>
              <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                <stop stopColor='#000000' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
              <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
            </defs>
            <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
              <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                <g id='Group' transform='translate(400.000000, 178.000000)'>
                  <path
                    d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                    id='Path'
                    className='text-primary'
                    style={{ fill: 'currentColor' }}
                  ></path>
                  <path
                    d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                    id='Path'
                    fill='url(#linearGradient-1)'
                    opacity='0.2'
                  ></path>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.049999997'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                  ></polygon>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.099999994'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                  ></polygon>
                  <polygon
                    id='Path-3'
                    fill='url(#linearGradient-2)'
                    opacity='0.099999994'
                    points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className='brand-text text-primary ml-1'>CIMS</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='6' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='6' sm='12'>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>ADD REQUEST</CardTitle>
            </CardHeader>

            <CardBody>
              <Form onSubmit={onSubmit}>
                <Row>
                  <Col className='mb-1' md='6' sm='12'>
                    <Label>Department</Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      defaultValue={colourOptions[0]}
                      options={depOptions}
                      onFocus={getDepartments}
                      onChange={val => {
                        setFormData({ ...formData, dep_name: val.value, dir_name: '', div_name: '', ser_name: '' })
                        // setDirOptions([])
                        // setDivOptions([])
                        // setSerOptions([])

                      }}
                      isClearable={false}
                    />
                  </Col>
                  <Col className='mb-1' md='6' sm='12'>
                    <Label>Direction</Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      defaultValue={colourOptions[1]}
                      options={dirOptions}
                      onFocus={getDirections}
                      onChange={val => setFormData({ ...formData, dir_name: val.value, div_name: '', ser_name: '' })}

                      isClearable={false}
                    />
                  </Col>
                  <Col className='mb-1' md='6' sm='12'>
                    <Label>Division</Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      defaultValue={colourOptions[2]}
                      options={divOptions}
                      isClearable={false}
                      onFocus={getDivisions}
                      onChange={val => setFormData({ ...formData, div_name: val.value, ser_name: '' })}
                    />
                  </Col>
                  <Col className='mb-1' md='6' sm='12'>
                    <Label>Service</Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      defaultValue={colourOptions[3]}
                      options={serOptions}
                      isClearable={false}
                      onFocus={getServices}
                      onChange={val => setFormData({ ...formData, ser_name: val.value })}
                    />
                  </Col>

                  <Col md='6' sm='12'>
                    <FormGroup>
                      <Label for='nameMulti'>First Name</Label>
                      <Input type='text' name='name' id='nameMulti' placeholder='First Name'
                        onChange={(e) => setFormData({ ...formData, nomDem: e.target.value })} />
                    </FormGroup>
                  </Col>
                  <Col md='6' sm='12'>
                    <FormGroup>
                      <Label for='lastNameMulti'>Last Name</Label>
                      <Input type='text' name='lastname' id='lastNameMulti' placeholder='Last Name'
                        onChange={(e) => setFormData({ ...formData, prenomDem: e.target.value })} />
                    </FormGroup>
                  </Col>
                  <Col md='6' sm='12'>
                    <FormGroup>
                      <Label for='EmailMulti'>Email</Label>
                      <Input type='email' name='Email' id='EmailMulti' placeholder='Email'
                        onChange={(e) => setFormData({ ...formData, emailDem: e.target.value })} />

                    </FormGroup>
                  </Col>

                  <Col className='mb-1' md='6' sm='12'>
                    <Label>Theme</Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      defaultValue={colourOptions[4]}
                      options={themeOptions}
                      isClearable={false}
                      onFocus={getThemes}
                      onChange={val => setFormData({ ...formData, themeDem: val.value })}
                    />
                  </Col>

                  <Col sm='12'>
                    <FormGroup className='d-flex mb-0'>
                      <Button.Ripple className='mr-1' color='primary' type='submit' onClick={e => { e.preventDefault(); onSubmit() }}>
                        Submit
                </Button.Ripple>
                      <Button.Ripple outline color='secondary' type='reset' onClick={handleSuccess}>
                        Reset
                </Button.Ripple>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AddRequest
