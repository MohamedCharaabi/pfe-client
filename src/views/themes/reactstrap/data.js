// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import axios from 'axios'
import moment from 'moment'
import { MoreVertical, Edit, FileText, Archive, Trash, Check } from 'react-feather'
import { Link } from 'react-router-dom'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { handleError, handleSuccess } from '../../exports/SweetAlerts'

// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const status = {
  1: { title: 'Current', color: 'light-primary' },
  2: { title: 'Professional', color: 'light-success' },
  3: { title: 'Rejected', color: 'light-danger' },
  4: { title: 'Resigned', color: 'light-warning' },
  5: { title: 'Applied', color: 'light-info' }
}

export let data

// ** Get initial Data
axios.get('/api/datatables/initial-data').then(response => {
  console.log(response.data)
  data = response.data
})

// delete Theme
async function deleteTheme(id) {
  await axios.delete(`https://pfe-cims.herokuapp.com/theme/${id}`)
    .then(res => {
      if (res.status === 200) {
        // loadThemes()
        return handleSuccess({ props: { title: 'Theme Deleted Succesfuly' } })
      }
    })
    .catch(error => handleError({ props: { title: 'Error while deleting theme', text: error.message } }))
}
async function deleteThemeRequest(id) {
  await axios.delete(`https://pfe-cims.herokuapp.com/requesttheme/${id}`)
    .then(res => {
      if (res.status === 200) {
        // loadThemes()
        return handleSuccess({ props: { title: 'Proposition Supprimer' } })
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
        .then(res => handleSuccess({ props: { title: 'Theme Created Succesfuly' } }))
    })
    .catch(error => {
      handleError({ props: { title: error.response.data.message } }
      )
    }
    )
}

// ** Table Zero Config Column
export const basicColumns = [
  {
    name: 'ID',
    selector: 'id',
    sortable: true,
    maxWidth: '100px'
  },
  {
    name: 'Name',
    selector: 'full_name',
    sortable: true,
    minWidth: '225px'
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    minWidth: '310px'
  },
  {
    name: 'Position',
    selector: 'post',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Age',
    selector: 'age',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'Salary',
    selector: 'salary',
    sortable: true,
    minWidth: '175px'
  }
]

// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>City:</span> {data.city}
      </p>
      <p>
        <span className='font-weight-bold'>Experience:</span> {data.experience}
      </p>
      <p className='m-0'>
        <span className='font-weight-bold'>Post:</span> {data.post}
      </p>
    </div>
  )
}

// ** Table Common Column
export const columns = [
  {
    name: 'Name',
    selector: 'theme',
    sortable: true,
    minWidth: '250px',
    cell: row => (
      <div className='d-flex align-items-center'>
        {/* {row.avatar === '' ? (
          <Avatar color={`light-${states[row.status]}`} content={row.full_name} initials />
        ) : (
          <Avatar img={require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`).default} />
        )} */}
        <div className='user-info text-truncate ml-1'>
          <span className='d-block font-weight-bold text-truncate'>{row.theme}</span>
          {/* <small>{row.post}</small> */}
        </div>
      </div>
    )
  },
  {
    name: 'Creator',
    selector: 'creator',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Date',
    selector: 'createdAt',
    sortable: true,
    minWidth: '150px',
    cell: row => (moment(row.createdAt).format('MMMM Do YYYY, h:mm'))
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex'>

          <Link to={`/editTheme/${row._id}`}>
            <Edit size={20} className='mr-50' />

          </Link>
          <Trash size={20} color={'red'}
            onClick={e => {
              e.preventDefault()
              deleteTheme(row._id)
            }

            } />

        </div>
      )
    }
  }
]

// ** Table Common Column
export const propositionsColumns = [
  {
    name: 'Name',
    selector: 'theme',
    sortable: true,
    minWidth: '250px',
    cell: row => (
      <div className='d-flex align-items-center'>
        {/* {row.avatar === '' ? (
          <Avatar color={`light-${states[row.status]}`} content={row.full_name} initials />
        ) : (
          <Avatar img={require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`).default} />
        )} */}
        <div className='user-info text-truncate ml-1'>
          <span className='d-block font-weight-bold text-truncate'>{row.theme}</span>
          {/* <small>{row.post}</small> */}
        </div>
      </div>
    )
  },
  {
    name: 'Creator',
    selector: 'creator',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Date',
    selector: 'createdAt',
    sortable: true,
    minWidth: '150px',
    cell: row => (moment(row.createdAt).format('MMMM Do YYYY, h:mm'))
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex'>

          <Check size={20} color={'green'} className='mr-50' onClick={e => {
            e.preventDefault()
            addTheme({ theme: row.theme, creator: row.creator }, row._id)
          }} />


          <Trash size={20} color={'red'} onClick={e => {
            e.preventDefault()
            deleteThemeRequest(row._id)
          }} />
        </div>
      )
    }
  }
]

// ** Table Intl Column
export const multiLingColumns = [
  {
    name: 'Name',
    selector: 'full_name',
    sortable: true,
    minWidth: '200px'
  },
  {
    name: 'Position',
    selector: 'post',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Date',
    selector: 'start_date',
    sortable: true,
    minWidth: '150px'
  },

  {
    name: 'Salary',
    selector: 'salary',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    minWidth: '150px',
    cell: row => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      )
    }
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <FileText size={15} />
                <span className='align-middle ml-50'>Details</span>
              </DropdownItem>
              <DropdownItem>
                <Archive size={15} />
                <span className='align-middle ml-50'>Archive</span>
              </DropdownItem>
              <DropdownItem>
                <Trash size={15} />
                <span className='align-middle ml-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      )
    }
  }
]

// ** Table Server Side Column
export const serverSideColumns = [
  {
    name: 'Full Name',
    selector: 'full_name',
    sortable: true,
    minWidth: '225px'
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Position',
    selector: 'post',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Office',
    selector: 'city',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Start Date',
    selector: 'start_date',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Salary',
    selector: 'salary',
    sortable: true,
    minWidth: '150px'
  }
]

// ** Table Adv Search Column
export const advSearchColumns = [
  {
    name: 'Name',
    selector: 'full_name',
    sortable: true,
    minWidth: '200px'
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Post',
    selector: 'post',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'City',
    selector: 'city',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Date',
    selector: 'start_date',
    sortable: true,
    minWidth: '150px'
  },

  {
    name: 'Salary',
    selector: 'salary',
    sortable: true,
    minWidth: '100px'
  }
]

export default ExpandableTable
