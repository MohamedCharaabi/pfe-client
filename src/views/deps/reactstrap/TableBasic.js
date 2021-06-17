import { useEffect, useState } from 'react'
import axios from 'axios'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { Link } from 'react-router-dom'
import { handleError, handleInfo, handleSuccess } from '../../exports/SweetAlerts'


const TableBasic = () => {

  const [departments, setDepartments] = useState([])
  const [personnels, setPersonnels] = useState([])

  async function loadDepartments() {

    await axios.get('https://pfe-cims.herokuapp.com/dep')
      .then(res => setDepartments(res.data))
      .catch(error => alert(error.message))
  }

  async function loadPersonnels() {

    await axios.get('https://pfe-cims.herokuapp.com/new/users')
      .then(res => {
        setPersonnels(res.data)
        // console.log(res.data)
      })
      .catch(error => alert(`error!:: ${error}`))

  }

  useEffect(() => {
    loadDepartments()
    loadPersonnels()
  }, [])

  async function deleteDepartment(id) {

    await axios.delete(`https://pfe-cims.herokuapp.com/dep/${id}`)
      .then(res => {
        // loadDepartments() 
        handleSuccess({ props: { title: 'Department updated successfully', click: loadDepartments } })
      })
      .catch(error => handleError({ props: { title: error.message } }))

  }

  return (

    <Table responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Modirateur</th>
          <th>Actions</th>

        </tr>
      </thead>
      <tbody>

        {departments.map(department => {

          return <tr key={department._id}>
            <td>
              {/* <img className='mr-75' src={angular} alt='angular' height='20' width='20' /> */}
              <span className='align-middle font-weight-bold'>{department.name}</span>
            </td>
            <td>
              {personnels.map(personnel => {
                if (personnel.Dep === department._id && personnel.rolePer === 'dep') {
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
                  <Link to={`editDepartment/${department._id}`}>

                    <DropdownItem >
                      <Edit className='mr-50' size={15} /> <span className='align-middle'>Edit</span>
                    </DropdownItem>
                  </Link>
                  <DropdownItem href='/' onClick={e => { e.preventDefault(); deleteDepartment(department._id) }}>
                    <Trash className='mr-50' size={15} /> <span className='align-middle'>Delete</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td>
          </tr>
        })
        }


      </tbody>
    </Table >

  )
}

export default TableBasic
