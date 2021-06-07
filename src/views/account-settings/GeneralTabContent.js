import { Fragment, useState, useEffect } from 'react'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Media, Label, Row, Col, Input, FormGroup, Alert, Form } from 'reactstrap'
import { isUserLoggedIn } from '@utils'
import axios from 'axios'
// import { Image, CloudinaryContext } from 'cloudinary-react'

const GeneralTabs = ({ data }) => {
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()
  const [selectedImage, setSelectedImage] = useState()
  const [avatar, setAvatar] = useState(data.avatar ? data.avatar : '')
  const [userData, setUserData] = useState(null)
  const [formData, setFormData] = useState({ fullName: '', email: '' })


  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
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
  const uploadImage = async () => {

    const data = new FormData()
    data.append("file", avatar)
    data.append("upload_preset", "default")
    data.append("cloud_name", "isetz")

    console.log(avatar)
    console.log(data)
    fetch("  https://api.cloudinary.com/v1_1/isetz/image/upload",
      { method: "post", body: data })
      .then(resp => resp.json())
      .then(async (data) => {

        await axios.patch(`https://pfe-cims.herokuapp.com/new/${userData._id}`, { avatar: data.url, fullName: formData.fullName, email: formData.email })
          .then(res => console.log(res.data))
          .catch(err => console.log(err))

      })
      .catch(err => console.log(err))

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
          <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
        </Media>
      </Media>
      <Form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm='6'>
            <FormGroup>
              <Label for='username'>Username</Label>
              <Controller
                defaultValue={userData.fullName}
                control={control}
                as={Input}
                id='username'
                name='username'
                placeholder='Username'
                innerRef={register({ required: true })}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
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
                defaultValue={userData.email}
                control={control}
                as={Input}
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                innerRef={register({ required: true })}
                onChange={e => setFormData({ ...formData, email: e.target.value })}

                className={classnames({
                  'is-invalid': errors.email
                })}
              />
            </FormGroup>
          </Col>
          <Col className='mt-2' sm='12'>
            <Button.Ripple type='submit' className='mr-1' color='primary'>
              Save changes
            </Button.Ripple>
            <Button.Ripple color='secondary' outline>
              Cancel
            </Button.Ripple>
          </Col>
        </Row>
      </Form>
    </Fragment>
  )
}

export default GeneralTabs
