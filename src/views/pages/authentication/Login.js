import { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import { Coffee } from 'react-feather'
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
  Alert
} from 'reactstrap'

import '@styles/base/pages/page-auth.scss'
import axios from 'axios'
import cimsImg from '../../../assets/images/logo/cims.png'
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

const Login = props => {
  const [skin, setSkin] = useSkin()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState('medch@yahoo.fr')
  const [password, setPassword] = useState('12345')
  const { register, errors, handleSubmit } = useForm()
  const [alert, setALert] = useState(false)
  const [loginError, setLoginError] = useState('')
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const onSubmit = async (data) => {
    if (isObjEmpty(errors)) {
      // useJwt
      //   .login({ email, password })
      await axios.post('https://pfe-cims.herokuapp.com/new/login', { email, password }, {
        headers: {
          'Content-Type': 'Application/json',
          'Access-Control-Allow-Origin': '*'
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

          // toast.success(
          //   <ToastContent name={data.fullName || data.username || 'John Doe'} role={data.role || 'admin'} />,
          //   { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          // )
        })
        .catch(err => {
          console.log(err)
          setLoginError(err.message)
        })
    }
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <img src={cimsImg} height={'40'} width={"40"} />
          <h2 className='brand-text text-primary ml-1'>PFE-CIMS</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>

            <Alert color="danger" className='reactstarp_alert' isOpen={alert}>
              {errors.loginemail && errors.loginemail.type === "required" && (
                <div className="error">Email requis</div>)}
              {errors.password && errors.password.type === "required" && (
                <div className="error">Mot de passe requis</div>)}
              {loginError}
            </Alert>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='loginemail'>
                  Email
                </Label>
                <Input
                  autoFocus
                  type='email'
                  value={email}
                  id='loginemail'
                  name='loginemail'
                  placeholder='john@example.com'
                  onChange={e => setEmail(e.target.value)}
                  className={classnames({ 'is-invalid': errors['loginemail'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='password'>
                    Mot de passe
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Mot de passe oublié?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  value={password}
                  id='password'
                  name='password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['password'] })}
                  innerRef={register({ required: true, minLength: 6, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                {/* <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' /> */}
              </FormGroup>
              <Button.Ripple type='submit' color='primary' block>
                Connexion
              </Button.Ripple>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
