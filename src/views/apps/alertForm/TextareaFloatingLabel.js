import { Card, CardHeader, CardTitle, CardBody, CardText, Input, Label, Button, FormGroup } from 'reactstrap'
import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { handleError, handleSuccess } from '../../exports/SweetAlerts'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Check } from 'react-feather'
import Avatar from '@components/avatar'

const SuccessToast = ({ data }) => {
  return (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='success' icon={<Check size={12} />} />
          <h6 className='toast-title'>Form Submitted!</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <ul className='list-unstyled mb-0'>
          <li>
            <strong>firstName</strong>: {data.firstName}
          </li>
          <li>
            <strong>lastName</strong>: {data.lastName}
          </li>
          <li>
            <strong>email</strong>: {data.email}
          </li>
        </ul>
      </div>
    </Fragment>
  )
}

const TextareaFloatingLabel = () => {

  const [formData, setFormData] = useState({ by: '', content: '', title: '', avatar: '' })
  const { register, errors, handleSubmit } = useForm()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'))
    setFormData({ ...formData, by: user.fullName, avatar: user.avatar })
  }, [])

  // async function handleSubmit() {
  //   // event.preventDefault()
  //   // console.log(formData)
  //   await axios.post("https://pfe-cims.herokuapp.com/alert", formData)
  //     .then(res => handleSuccess({ props: { title: 'alert submitted successfully' } })
  //     ).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
  // }


  const onSubmit = async (data) => {
    console.log(formData)
    // toast.success(<SuccessToast data={data} />, { hideProgressBar: true })
    await axios.post("https://pfe-cims.herokuapp.com/alert", formData)
      .then(res => handleSuccess({ props: { title: 'reclamation envoyer' } })
      ).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))

  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Envoyer Reclamation </CardTitle>
      </CardHeader>

      <CardBody>
        <CardText>
          {/* Use <code>.form-label-group</code> as a wrapper to add a Floating Label with Textarea */}
        </CardText>
        <FormGroup>
          <Label for='firstNameBasic'>Titre</Label>
          <Input
            id='firstNameBasic'
            name='title'
            innerRef={register({ required: true })}
            invalid={errors.firstNameBasic && true}
            onChange={e => setFormData({ ...formData, title: e.target.value })}

            placeholder='Titre'
          />
        </FormGroup>

        <div className='form-label-group mt-2'>
          <Input type='textarea'
            name='content'
            id='exampleText'
            rows='3'
            placeholder='Enter alert'
            innerRef={register({ required: true })}
            invalid={errors.firstNameBasic && true}

            onChange={e => setFormData({ ...formData, content: e.target.value })}
          />
          <Label>Entrer alert</Label>
        </div>

        <Button className='mr-1' color='primary'
          // type='submit'
          onClick={handleSubmit(onSubmit)}
        >
          Envoyer
        </Button>
      </CardBody>
    </Card>
  )
}

export default TextareaFloatingLabel
