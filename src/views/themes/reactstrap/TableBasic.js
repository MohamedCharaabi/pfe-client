import { useEffect, useState } from 'react'
import axios from 'axios'

import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'


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
      .then(res => loadThemes())
      .catch(error => alert(error.message))


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
              {/* <img className='mr-75' src={angular} alt='angular' height='20' width='20' /> */}
              <span className='align-middle font-weight-bold'>{theme.theme}</span>
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
              <UncontrolledDropdown>
                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                  <MoreVertical size={15} />
                </DropdownToggle>
                <DropdownMenu right>
                  <Link >
                    <DropdownItem >
                      <Edit className='mr-50' size={15} /> <span className='align-middle'>Edit Theme</span>
                    </DropdownItem>
                  </Link>

                  <DropdownItem >
                    <Trash className='mr-50' size={15} /> <span className='align-middle'>Delete Theme</span>
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
