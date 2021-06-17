import { Fragment, useState, useEffect, useContext } from 'react'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Media, Label, Row, Col, Input, FormGroup, Alert, Form } from 'reactstrap'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { isUserLoggedIn, getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import { toast, Slide } from 'react-toastify'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import Avatar from '@components/avatar'
import { Coffee } from 'react-feather'


import { useDispatch } from 'react-redux'

import axios from 'axios'
// import { Image, CloudinaryContext } from 'cloudinary-react'
import { handleError, handleSuccess } from '../exports/SweetAlerts'

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>Welcome, {name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>You have successfully logged in as an {role} user to PFE-CIMS!</span>
    </div>
  </Fragment>
)


const GeneralTabs = ({ data }) => {

  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()

  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()
  const [selectedImage, setSelectedImage] = useState()
  const [avatar, setAvatar] = useState(data.avatar ? data.avatar : '')
  const [userData, setUserData] = useState(null)
  const [formData, setFormData] = useState({ fullName: '', email: '' })


  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
      setAvatar(JSON.parse(localStorage.getItem('userData')).avatar)
      setFormData({ fullName: JSON.parse(localStorage.getItem('userData')).fullName, email: JSON.parse(localStorage.getItem('userData')).email })
    }
  }, [])


  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const reLogin = async ({ data }) => {
    if (isObjEmpty(errors)) {
      // useJwt
      //   .login({ email, password })
      await axios.post('https://pfe-cims.herokuapp.com/new/login', { email: formData.email, password: userData.password }, {
        headers: {
          'Content-Type': 'Application/json'
        },
        withCredentials: true
      })
        .then(res => {
          console.log(res.data)
          const data = { ...res.data.userData, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
          // const data = { ...res.data, accessToken: res.data.token, refreshToken: res.data.token }

          dispatch(handleLogin(data))
          // dispatch(handlepfeLogin(data))

          ability.update(res.data.userData.ability)
          // ability.update(res.data.role)

          history.push(getHomeRouteForLoggedInUser(data.role))
          // history.push(getHomeRouteForLoggedInUser('admin'))

          toast.success(
            <ToastContent name={data.fullName || data.username || 'John Doe'} role={data.role || 'admin'} />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        })
        .catch(err => alert(`error => ${err.message}`))
    }
  }

  const uploadImage = async () => {

    const data = new FormData()
    data.append("file", avatar)
    data.append("upload_preset", "default")
    data.append("cloud_name", "isetz")

    console.log(avatar)
    console.log(formData)


    fetch("  https://api.cloudinary.com/v1_1/isetz/image/upload",
      { method: "post", body: data })
      .then(resp => resp.json())
      .then(async (data) => {

        await axios.patch(`https://pfe-cims.herokuapp.com/new/${userData._id}`, { avatar: data.url, fullName: formData.fullName, email: formData.email })
          .then(res => {
            // handleSuccess({ props: { title: 'Department submited successfully' } })
            reLogin(data = { email: formData.email, password: userData.password })
          })
          .catch(err => handleError({ props: { title: 'An Error aquired', text: error.message } }))

      })
      .catch(err => handleError({ props: { title: 'An Error aquired', text: error.message } }))

  }

  const onSubmit = data => {

    if (trigger()) {
      uploadImage()
    }
  }


  if (!userData) return <span>  </span>

  return (
    <Fragment>
      <Media>
        <Media className='mr-25' left>
          <Media object className='rounded mr-50' src={avatar} alt='Generic placeholder image' height='80' width='80' />
        </Media>
        <Media className='mt-75 ml-1' body>
          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'
          // onChange={e => setSelectedImage(e.target.files[0])}
          >
            Upload
            <Input type='file' onChange={onChange} hidden accept='image/*' />
          </Button.Ripple>
          <Button.Ripple color='secondary' size='sm' outline>
            Reset
          </Button.Ripple>
          {/* <p>Allowed JPG, GIF or PNG. Max size of 800kB</p> */}
        </Media>
      </Media>
      <Form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm='6'>
            <FormGroup>
              <Label for='username'>Nom</Label>
              <Controller

                control={control}
                render={(props) => {
                  return <Input type='text' name='name' id='nameMulti' placeholder='Nom '
                    defaultValue={userData.fullName}

                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                }}
                // as={Input}
                id='username'
                name='username'
                placeholder='Nom'
                // innerRef={register({ required: true })}
                // onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                className={classnames({
                  'is-invalid': errors.username
                })}
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='email'>E-mail</Label>
              <Controller
                // defaultValue={userData.email}
                control={control}
                // as={Input}
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                innerRef={register({ required: true })}
                // onChange={e => setFormData({ ...formData, email: e.target.value })}
                render={(props) => {
                  return <Input name='name' id='nameMulti' placeholder='E-mail' defaultValue={userData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                }}
                className={classnames({
                  'is-invalid': errors.email
                })}
              />
            </FormGroup>
          </Col>
          <Col className='mt-2' sm='12'>
            <Button.Ripple type='submit' className='mr-1' color='primary'>
              Sauvgarder
            </Button.Ripple>
            <Button.Ripple color='secondary' outline>
              Annuler            </Button.Ripple>
          </Col>
        </Row>
      </Form>
    </Fragment>
  )
}

export default GeneralTabs
