
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { handleError, handleInfo, handleSuccess } from '../../exports/SweetAlerts'


const TableBasic = () => {

  const [directions, setDirections] = useState([])
  const [personnels, setPersonnels] = useState([])

  async function loadDirections() {
    await axios.get('https://pfe-cims.herokuapp.com/dir')
      .then(res => setDirections(res.data))
      .catch(error => alert(error.message))
  }

  async function loadPersonnels() {
    await axios.get('https://pfe-cims.herokuapp.com/new/users')
      .then(res => setPersonnels(res.data))
      .catch(error => alert(`error!:: ${error}`))

  }

  useEffect(() => {
    loadDirections()
    loadPersonnels()
  }, [])

  async function deleteDirection(id) {

    await axios.delete(`https://pfe-cims.herokuapp.com/dir/${id}`)
      .then(res => {
        // loadDepartments() 
        handleSuccess({ props: { title: 'Directions supprimer', click: loadDirections } })
      })
      .catch(error => handleError({ props: { title: error.message } }))

  }

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Department</th>
          <th>Modirateur</th>
          <th>Actions</th>

        </tr>
      </thead>
      <tbody>
        {directions.map(direction => {
          return <tr>
            <td>
              {/* <img className='mr-75' src={angular} alt='angular' height='20' width='20' /> */}
              <span className='align-middle font-weight-bold'>{direction.name}</span>
            </td>
            <td>{direction.dep_name}</td>
            <td>
              {personnels.map(personnel => {
                if (personnel.Dir === direction.name && personnel.rolePer === 'dir') {
                  return personnel.fullName
                }
              })}
            </td>
            <td>
              {/* <UncontrolledDropdown>
                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                  <MoreVertical size={15} />
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to={`/editDirection/${direction._id}`}>
                    <DropdownItem >
                      <Edit className='mr-50' size={15} /> <span className='align-middle'>Edit</span>
                    </DropdownItem>
                  </Link>
                  <DropdownItem href='/' onClick={e => { e.preventDefault(); deleteDirection(direction._id) }}>
                    <Trash className='mr-50' size={15} /> <span className='align-middle'>Delete</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}

              <div className='d-flex'>
                <Link to={`/editDirection/${direction._id}`}>
                  <Edit size={20} color={'green'} className='mr-50' />
                </Link>

                <Trash size={20} color={'red'} onClick={e => {
                  e.preventDefault()
                  deleteDirection(direction._id)
                }} />
              </div>
            </td>
          </tr>

        })
        }

      </tbody>
    </Table>
  )
}

export default TableBasic
