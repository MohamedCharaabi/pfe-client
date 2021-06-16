import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { MoreVertical, Edit, Trash } from 'react-feather'
import {
  Table, Row, Col, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Modal, ModalHeader,
  ModalBody, Input, ModalFooter,
  Button,
  Label
} from 'reactstrap'
import prism from 'prismjs'
import Card from '@components/card-snippet'
import { isUserLoggedIn } from '@utils'
import { handleError, handleSuccess } from '../../exports/SweetAlerts'


const FiltredRequest = () => {


  const [demandes, setDemandes] = useState([])
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [refuseRemarque, setrefuseRemarque] = useState('')


  const [modal, setModal] = useState(false)
  const [unmountOnClose, setUnmountOnClose] = useState(true)

  async function loadDemandes() {
    const user = JSON.parse(localStorage.getItem('userData'))
    setUserData(user)
    await axios.get(`https://pfe-cims.herokuapp.com/request/filter/${user.rolePer}/${user.Dep}/${user.Dir || 0}/${user.Div || 0}/${user.Ser || 0}`)
      .then(res => {
        setDemandes(res.data)
        // console.log(res.data)
        setIsLoading(false)
      }).catch(error => alert(`errror ==> ${error.message}`))
  }
  useEffect(() => {
    loadDemandes()
    prism.highlightAll()

  }, [])

  async function deleteDemande(id) {
    await axios.delete(`https://pfe-cims.herokuapp.com/request/${id}`)
      .then(res => loadDemandes())
      .catch(error => alert(error.message))


  }
  async function acceptDemande(id, etatDem, name, demmande) {
    await axios.patch(`https://pfe-cims.herokuapp.com/request/accept/${id}`, { etatDem, name, demmande, message: `accepted by ${userData.fullName}` })
      .then(res => handleSuccess({ props: { title: 'Request Accepted' } }))
      .catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
  }
  async function refuseDemande(id, rmsqDem) {
    await axios.patch(`https://pfe-cims.herokuapp.com/request/refuse/${id}`, { rmsqDem, message: `refused by ${userData.fullName}` })
      .then(res => {
        handleSuccess({ props: { title: 'Request Refussed' } })
        setModal(!modal)
      })
      .catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
  }

  const toggle = () => setModal(!modal)
  const changeUnmountOnClose = e => {
    console.log(e.target.value)
    // let value = e.target.value;
    setUnmountOnClose(JSON.parse(value))
  }

  if (isLoading) {
    return <span>Loading...</span>
  }
  return (

    <Fragment>
      {/* <Breadcrumbs breadCrumbTitle='Reactstrap Tables' breadCrumbParent='Forms & Tables' breadCrumbActive='Tables' /> */}
      <Row>
        <Col sm='12'>
          <Card title='Requests'
            // code={tableBasic}
            noBody
          >
            <Table responsive>
              <thead>
                <tr>
                  <th>theme</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {demandes.map(demmande => {
                  if (demmande.confDem !== 'yes') return null
                  return < tr key={demmande._id} >
                    <td>
                      {/* <img className='mr-75' src={angular} alt='angular' height='20' width='20' /> */}
                      <span className='align-middle font-weight-bold'>{demmande.themeDem}</span>
                    </td>
                    <td>{demmande.nomDem} {demmande.prenomDem}</td>
                    <td>
                      {/* <AvatarGroup data={avatarGroupData1} /> */}
                      {demmande.emailDem}
                    </td>
                    <td>
                      {/* <Badge pill color='light-primary' className='mr-1'>
                Active
            </Badge> */}
                      {demmande.dateDem}
                    </td>
                    <td>{demmande.etatDem}</td>
                    <td>
                      <UncontrolledDropdown>
                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                          <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem href='/' onClick={e => {
                            e.preventDefault()
                            acceptDemande(demmande._id, demmande.etatDem, demmande.name, demmande)
                          }}>
                            <Edit className='mr-50' size={15} /> <span className='align-middle'>Accepter</span>
                          </DropdownItem>
                          <DropdownItem onClick={toggle}>
                            <Trash className='mr-50' size={15} /> <span className='align-middle'>Refuser</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>

                    <Modal isOpen={modal} toggle={toggle} unmountOnClose={unmountOnClose}>
                      <ModalHeader toggle={toggle}>Remarque</ModalHeader>
                      <ModalBody>
                        <Input type="textarea" placeholder="Pourquoi?" rows={5} onChange={e => setrefuseRemarque(e.target.value)} />
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" onClick={e => {
                          e.preventDefault()
                          refuseDemande(demmande._id, refuseRemarque)
                        }}>Refuser</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Annuler</Button>
                      </ModalFooter>
                    </Modal>

                  </tr>

                })}


              </tbody>
            </Table>

          </Card>
        </Col>

      </Row>


    </Fragment >

  )
}

export default FiltredRequest
