import { useEffect, useState } from 'react'
import axios from 'axios'

import { MoreVertical, Edit, Trash, Check } from 'react-feather'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { handleError, handleSuccess } from '../../exports/SweetAlerts'


const StandartProposition = () => {

  const [themes, setThemes] = useState([])


  async function loadThemes() {

    await axios.get('https://pfe-cims.herokuapp.com/requesttheme')
      .then(res => setThemes(res.data))
      .catch(error => alert(`errror ==> ${error.message}`))
  }

  useEffect(() => {
    loadThemes()
  }, [])

  async function deleteThemeRequest(id) {
    await axios.delete(`https://pfe-cims.herokuapp.com/requesttheme/${id}`)
      .then(res => {
        if (res.status === 200) {
          // loadThemes()
          return handleSuccess({ props: { title: 'Proposition Supprimer', click: loadThemes } })
        }
      })
      .catch(error => handleError({ props: { title: 'Error while deleting theme', text: error.message } }))
  }
  async function addTheme(formData, id) {
    console.log(formData)
    await axios.post('https://pfe-cims.herokuapp.com/theme', formData)
      .then(async (res) => {
        // load()
        await axios.delete(`https://pfe-cims.herokuapp.com/requesttheme/${id}`)
          .then(res => handleSuccess({ props: { title: 'Theme accepter', click: loadThemes } }))
      })
      .catch(error => {
        handleError({ props: { title: error.response.data.message } }
        )
      }
      )
  }

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Name</th>
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
              <div className='d-flex'>

                <Check size={20} color={'green'} className='mr-50' onClick={e => {
                  e.preventDefault()
                  addTheme({ theme: theme.theme, creator: theme.creator }, theme._id)
                }} />


                <Trash size={20} color={'red'} onClick={e => {
                  e.preventDefault()
                  deleteThemeRequest(theme._id)
                }} />
              </div>
            </td>

          </tr>


        })}

      </tbody>
    </Table>
  )
}

export default StandartProposition
