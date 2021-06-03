// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X, Airplay } from 'react-feather'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Form from 'reactstrap/lib/Form'
import axios from 'axios'
import { handleError, handleSuccess } from '../../exports/SweetAlerts'

const AddNewModal = ({ open, handleModal, load }) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())

  //formData
  const [formData, setFormData] = useState({ theme: '', creator: '' })

  async function handleSubmit() {
    console.log('formdata ==>', formData)
    await axios.post('https://pfe-cims.herokuapp.com/theme', formData)
      .then(res => {
        load()
        handleSuccess({ props: { title: 'Theme Created Succesfuly' } })
      })
      .catch(error => handleError({ props: { title: 'Error while creating theme', text: error.message } })
      )
  }

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  return (
    <Modal
      isOpen={open}
      // toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Add Theme</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for='full-name'>Theme</Label>
            <InputGroup

            >
              <InputGroupAddon addonType='prepend'>
                <InputGroupText>
                  <Airplay size={15} />
                </InputGroupText>
              </InputGroupAddon>
              <Input id='full-name' placeholder='Theme'
                onChange={e => setFormData({ ...formData, theme: e.target.value })}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for='post'>Creator</Label>
            <InputGroup>
              <InputGroupAddon addonType='prepend'>
                <InputGroupText>
                  <User size={15} />
                </InputGroupText>
              </InputGroupAddon>
              <Input id='post' placeholder='Creator'
                onChange={e => setFormData({ ...formData, creator: e.target.value })}

              />
            </InputGroup>
          </FormGroup>
          {/* <FormGroup>
          <Label for='email'>Email</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Mail size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='email' id='email' placeholder='brucewayne@email.com' />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='joining-date'>Joining Date</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <Calendar size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Flatpickr className='form-control' id='joining-date' value={Picker} onChange={date => setPicker(date)} />
          </InputGroup>
        </FormGroup>
        <FormGroup className='mb-4'>
          <Label for='salary'>Salary</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <DollarSign size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input type='number' id='salary' />
          </InputGroup>
        </FormGroup>
        */}
          {/* <Input type='submit' /> */}
          <Button className='mr-1' color='primary'
            // type='submit'
            onClick={handleSubmit}
          >
            Submit
        </Button>
          <Button color='secondary'
            onClick={handleModal}
            outline>
            Cancel
        </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
