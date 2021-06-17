import { useEffect, useState } from 'react'
import axios from 'axios'

import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { Link } from 'react-router-dom'
import { handleError, handleInfo, handleSuccess } from '../../exports/SweetAlerts'

const TableBasic = () => {

  const [services, setServices] = useState([])
  const [personnels, setPersonnels] = useState([])

  async function loadServices() {
    await axios.get('https://pfe-cims.herokuapp.com/ser')
      .then(res => setServices(res.data))
      .catch(error => alert(`error!:: ${error}`))
  }

  async function loadPersonnels() {

    await axios.get('https://pfe-cims.herokuapp.com/new/users')
      .then(res => setPersonnels(res.data))
      .catch(error => alert(`error!:: ${error}`))
  }

  async function deleteService(id) {
    await axios.delete(`https://pfe-cims.herokuapp.com/ser/${id}`)
      .then(res => {
        // loadDepartments() 
        handleSuccess({ props: { title: 'Service supprimer', click: loadServices } })
      })
      .catch(error => handleError({ props: { title: error.message } }))

  }

  useEffect(() => {
    loadServices()
    loadPersonnels()
  }, [])

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Division</th>
          <th>Direction</th>
          <th>Service</th>
          <th>Modirateur</th>
          <th>Actions</th>

        </tr>
      </thead>
      <tbody>

        {services.map(service => {
          return <tr>
            <td>
              <span className='align-middle font-weight-bold'> {service.name}</span>
            </td>
            <td>{service.div_name}</td>
            <td>
              {service.dir_name}
            </td>
            <td>
              {service.dep_name}
            </td>
            <td>
              {personnels.map(personnel => {
                if (personnel.Ser === service.name && personnel.rolePer === 'ser') {
                  return personnel.fullName
                }
              })}
            </td>
            <td>
              <UncontrolledDropdown>
                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                  <MoreVertical size={15} />
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to={`/editService/${service._id}`}>
                    <DropdownItem >
                      <Edit className='mr-50' size={15} /> <span className='align-middle'>Edit</span>
                    </DropdownItem>
                  </Link>
                  <DropdownItem href='/' onClick={e => { e.preventDefault(); deleteService(service._id) }}>
                    <Trash className='mr-50' size={15} /> <span className='align-middle'>Delete</span>
                  </DropdownItem>
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
