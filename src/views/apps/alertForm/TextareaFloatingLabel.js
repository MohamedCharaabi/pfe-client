import { Card, CardHeader, CardTitle, CardBody, CardText, Input, Label, Button } from 'reactstrap'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { handleError, handleSuccess } from '../../exports/SweetAlerts'

const TextareaFloatingLabel = () => {

  const [formData, setFormData] = useState({ by: '', content: '' })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'))
    setFormData({ ...formData, by: user.fullName })
  }, [])

  async function handleSubmit() {
    // event.preventDefault()
    // console.log(formData)
    await axios.post("https://pfe-cims.herokuapp.com/alert", formData)
      .then(res => handleSuccess({ props: { title: 'alert submitted successfully' } })
      ).catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Envoyer Alert </CardTitle>
      </CardHeader>

      <CardBody>
        <CardText>
          {/* Use <code>.form-label-group</code> as a wrapper to add a Floating Label with Textarea */}
        </CardText>
        <div className='form-label-group mt-2'>
          <Input type='textarea' name='text' id='exampleText' rows='3' placeholder='Enter alert'
            onChange={e => setFormData({ ...formData, content: e.target.value })}
          />
          <Label>Entrer alert</Label>
        </div>

        <Button className='mr-1' color='primary'
          // type='submit'
          onClick={handleSubmit}
        >
          Envoyer
        </Button>
      </CardBody>
    </Card>
  )
}
export default TextareaFloatingLabel
