import { useEffect, useState } from 'react'
import axios from 'axios'
import * as yup from 'yup'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, FormGroup, Row, Col, Button } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import { isUserLoggedIn } from '@utils'
import { handleError, handleSuccess } from '../exports/SweetAlerts'

const PasswordTabContent = () => {
  // const { id } = useParams()
  const [formData, setFormData] = useState({ oldpass: '', newPass: '' })
  const SignupSchema = yup.object().shape({
    'old-password': yup.string().required(),
    'new-password': yup.string().required(),
    'retype-new-password': yup
      .string()
      .required()
      .oneOf([yup.ref(`new-password`), null], 'Passwords must match')
  })

  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  const { register, errors, handleSubmit, trigger } = useForm({
    resolver: yupResolver(SignupSchema)
  })
  async function update() {
    // event.preventDefault()
    console.log(formData)
    await axios.patch(`https://pfe-cims.herokuapp.com/new/changepassword/${userData._id}`, formData, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => {
        console.log('success update pass')
        handleSuccess({ props: { title: 'Password updated successfully' } })
      }
      ).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
  }
  const onSubmit = () => {
    if (trigger()) {
      update()
    }
  }

  if (!userData) return <span></span>
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm='6'>
          <FormGroup>
            <InputPasswordToggle
              label='Ancien Password'
              htmlFor='old-password'
              name='old-password'
              onChange={e => setFormData({ ...formData, oldpass: e.target.value })}

              innerRef={register({ required: true })}
              className={classnames('input-group-merge', {
                'is-invalid': errors['old-password']
              })}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm='6'>
          <FormGroup>
            <InputPasswordToggle
              label='Nouveau Password'
              htmlFor='new-password'
              name='new-password'
              onChange={e => setFormData({ ...formData, newPass: e.target.value })}

              innerRef={register({ required: true })}
              className={classnames('input-group-merge', {
                'is-invalid': errors['new-password']
              })}
            />
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <InputPasswordToggle
              label='Retype Password'
              htmlFor='retype-new-password'
              name='retype-new-password'
              onChange={e => setFormData({ ...formData, newPass: e.target.value })}

              innerRef={register({ required: true })}
              className={classnames('input-group-merge', {
                'is-invalid': errors['retype-new-password']
              })}
            />
          </FormGroup>
        </Col>
        <Col className='mt-1' sm='12'>
          <Button.Ripple type='submit' className='mr-1' color='primary'>
            Sauvgarder
          </Button.Ripple>
          <Button.Ripple color='secondary' outline>
            Annuler          </Button.Ripple>
        </Col>
      </Row>
    </Form>
  )
}

export default PasswordTabContent
