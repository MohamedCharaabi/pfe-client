
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'


const TableBasic = () => {

  const [alerts, setAlerts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function loadAlerts() {
    await axios.get('https://pfe-cims.herokuapp.com/alert')
      .then(res => {
        setAlerts(res.data)
        setIsLoading(false)
      })
      .catch(error => alert(error.message))
  }

  useEffect(() => {
    loadAlerts()
  }, [])

  async function deleteDirection(id) {

    await axios.delete(`https://pfe-cims.herokuapp.com/dir/${id}`)
      .then(res => loadDirections())
      .catch(error => alert(error.message))
  }

  if (isLoading) return <span></span>

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Modirateur</th>
          <th>Contenu</th>
          <th>date</th>

        </tr>
      </thead>
      <tbody>
        {alerts.map(alert => {
          return <tr>
            <td>
              {/* <img className='mr-75' src={angular} alt='angular' height='20' width='20' /> */}
              <span className='align-middle font-weight-bold'>{alert.by}</span>
            </td>
            <td>{alert.content}</td>
            <td>
              {alert.writedAt}
            </td>
            <td>
              <UncontrolledDropdown>
                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                  <MoreVertical size={15} />
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to={``}>
                    <DropdownItem >
                      <Edit className='mr-50' size={15} /> <span className='align-middle'>Edit</span>
                    </DropdownItem>
                  </Link>
                  <DropdownItem href='/' onClick={e => e.preventDefault()}>
                    <Trash className='mr-50' size={15} /> <span className='align-middle'>Delete</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td>
          </tr>

        })
        }

      </tbody>
    </Table>
  )
}

export default TableBasic
