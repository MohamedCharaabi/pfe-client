import { useEffect, useState } from 'react'
import axios from 'axios'

import { MoreVertical, Edit, Trash, Check } from 'react-feather'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { handleError, handleInfo, handleSuccess } from '../../exports/SweetAlerts'
import Avatar from '@components/avatar'

import defaultLogo from '@src/assets/images/themeLogo.png'


const TableBasic = () => {

  const [themes, setThemes] = useState([])


  async function loadThemes() {

    await axios.get('https://pfe-cims.herokuapp.com/theme')
      .then(res => setThemes(res.data))
      .catch(error => alert(`errror ==> ${error.message}`))
  }

  useEffect(() => {
    loadThemes()
  }, [])

  async function deleteTheme(id) {
    await axios.delete(`https://pfe-cims.herokuapp.com/theme/${id}`)
      .then(res => handleSuccess({ props: { title: 'Theme Supprimer', click: loadThemes } }))
      .catch(error => handleError({ props: { title: 'An Error aquired', text: error.message } }))


  }

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>theme</th>
          <th>Creator</th>
          <th>Date</th>
          <th>Actions</th>

        </tr>
      </thead>
      <tbody>
        {themes.map(theme => {
          return <tr key={theme._id}>
            <td>
              {/* <img className='mr-75' src={theme.logo} height='20' width='20' /> */}
              <Avatar img={theme.logo || defaultLogo} imgHeight='30' imgWidth='30' />

              <span className='align-middle font-weight-bold ml-1' >{theme.theme}</span>
            </td>
            <td>
              {/* <AvatarGroup data={avatarGroupData1} /> */}
              {theme.creator}
            </td>
            <td>

              {
                moment(theme.createdAt).format('MMMM Do YYYY, h:mm')
              }
            </td>

            <td>
              {/* <UncontrolledDropdown>
                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                  <MoreVertical size={15} />
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to={`/editTheme/${theme._id}`}>
                    <DropdownItem >
                      <Edit className='mr-50' size={15} /> <span className='align-middle'>Modifier Theme</span>
                    </DropdownItem>
                  </Link>

                  <DropdownItem onClick={e => {
                    e.preventDefault()
                    deleteTheme(theme._id)
                  }}>
                    <Trash className='mr-50' size={15} /> <span className='align-middle'>Supprimer Theme</span>
                  </DropdownItem>

                </DropdownMenu>
              </UncontrolledDropdown>
             */}
              <div className='d-flex'>
                <Link to={`/editTheme/${theme._id}`}>
                  <Edit size={20} color={'green'} className='mr-50' />
                </Link>

                <Trash size={20} color={'red'} onClick={e => {
                  e.preventDefault()
                  deleteTheme(theme._id)
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
