import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Row, Col, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import prism from 'prismjs'
import Card from '@components/card-snippet'
import { isUserLoggedIn } from '@utils'
import { handleError, handleSuccess } from '../../exports/SweetAlerts'

const FiltredRequest = () => {


  const [demandes, setDemandes] = useState([])
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)


  async function loadDemandes() {
    const user = JSON.parse(localStorage.getItem('userData'))
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
    await axios.patch(`https://pfe-cims.herokuapp.com/request/accept/${id}`, { etatDem, name, demmande, message: `accepted by ${user.fullName}` })
      .then(res => handleSuccess({ props: { title: 'Request Accepted' } }))
      .catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))
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
                            acceptDemande(demande._id, demande.etatDem, demande.name, demande)
                          }}>
                            <Edit className='mr-50' size={15} /> <span className='align-middle'>Accept</span>
                          </DropdownItem>
                          <DropdownItem href='/' onClick={e => e.preventDefault()}>
                            <Trash className='mr-50' size={15} /> <span className='align-middle'>Refuse</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>

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
