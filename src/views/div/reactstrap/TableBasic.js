import AvatarGroup from '@components/avatar-group'
import react from '@src/assets/images/icons/react.svg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import vuejs from '@src/assets/images/icons/vuejs.svg'
import angular from '@src/assets/images/icons/angular.svg'
import bootstrap from '@src/assets/images/icons/bootstrap.svg'
import avatar1 from '@src/assets/images/portrait/small/avatar-s-5.jpg'
import avatar2 from '@src/assets/images/portrait/small/avatar-s-6.jpg'
import avatar3 from '@src/assets/images/portrait/small/avatar-s-7.jpg'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { Link } from 'react-router-dom'
import { handleError, handleInfo, handleSuccess } from '../../exports/SweetAlerts'

const avatarGroupData1 = [
  {
    title: 'Lilian',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Alberto',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Bruce',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData2 = [
  {
    title: 'Diana',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Rey',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'James',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData3 = [
  {
    title: 'Lee',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Mario',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Oswald',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData4 = [
  {
    title: 'Christie',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Barnes',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Arthur',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const TableBasic = () => {

  const [divisions, setDivisions] = useState([])
  const [personnels, setPersonnels] = useState([])

  async function loadDivision() {

    await axios.get('https://pfe-cims.herokuapp.com/div')
      .then(res => setDivisions(res.data))
      .catch(error => alert(error.message))
  }

  async function loadPersonnels() {

    await axios.get('https://pfe-cims.herokuapp.com/new/users')
      .then(res => setPersonnels(res.data))
      .catch(error => alert(`error!:: ${error}`))
  }

  async function deleteDivision(id) {
    await axios.delete(`https://pfe-cims.herokuapp.com/div/${id}`)
      .then(res => {
        // loadDepartments() 
        handleSuccess({ props: { title: 'Division supprimer', click: loadDivision } })
      })
      .catch(error => handleError({ props: { title: error.message } }))

  }
  useEffect(() => {
    loadDivision()
    loadPersonnels()
  }, [])

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Direction</th>
          <th>Department</th>
          <th>Modirateur</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {divisions.map(division => {
          // const p = personnels.find((e) => e.Div === division.name && e.rolePer === 'div').fullName
          // console.log(p)
          return <tr>
            <td>
              {/* <img className='mr-75' src={angular} alt='angular' height='20' width='20' /> */}
              <span className='align-middle font-weight-bold'>{division.name}</span>
            </td>
            <td>{division.dir_name}</td>
            <td>
              {division.dep_name}
            </td>
            <td>
              {
                personnels.map(personnel => {
                  if (personnel.Div === division.name && personnel.rolePer === 'div') {
                    return personnel.fullName
                  }
                })
              }

            </td>
            <td>
              {/* <UncontrolledDropdown>
                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                  <MoreVertical size={15} />
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to={`/editDivision/${division._id}`}>
                    <DropdownItem >
                      <Edit className='mr-50' size={15} /> <span className='align-middle'>Edit</span>
                    </DropdownItem>
                  </Link>
                  <DropdownItem href='/' onClick={e => { e.preventDefault(); deleteDivision(division._id) }}>
                    <Trash className='mr-50' size={15} /> <span className='align-middle'>Delete</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}

              <div className='d-flex'>
                <Link to={`/editDivision/${division._id}`}>
                  <Edit size={20} color={'green'} className='mr-50' />
                </Link>

                <Trash size={20} color={'red'} onClick={e => {
                  e.preventDefault()
                  deleteDivision(division._id)
                }} />
              </div>

            </td>
          </tr>
        })}
      </tbody>
    </Table>
  )
}

export default TableBasic
