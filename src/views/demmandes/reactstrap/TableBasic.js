import { useEffect, useState } from 'react'
import axios from 'axios'

import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'


const TableBasic = () => {

  const [demandes, setDemandes] = useState([])


  async function loadDemandes() {

    await axios.get('https://pfe-cims.herokuapp.com/request')
      .then(res => setDemandes(res.data))
      .catch(error => alert(`errror ==> ${error.message}`))
  }

  useEffect(() => {
    loadDemandes()
  }, [])

  async function deleteDemande(id) {
    await axios.delete(`https://pfe-cims.herokuapp.com/request/${id}`)
      .then(res => loadDemandes())
      .catch(error => alert(error.message))


  }

  return (
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
          return <tr key={demmande._id}>
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

              {
                moment(demmande.dateDem).format('MMMM Do YYYY, h:mm')
              }
            </td>
            <td>{demmande.name}</td>

            <td>
              <UncontrolledDropdown>
                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                  <MoreVertical size={15} />
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to={`/demmandes/details/${demmande._id}`}>
                    <DropdownItem >
                      <Edit className='mr-50' size={15} /> <span className='align-middle'>Show Details</span>
                    </DropdownItem>
                  </Link>

                </DropdownMenu>
              </UncontrolledDropdown>
            </td>

          </tr>


        })}

      </tbody>
    </Table>
  )
}

export default TableBasic
