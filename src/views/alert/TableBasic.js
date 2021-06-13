
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import MailCard from './alerts/MailCard'
// import MailDetails from './MailDetails'
// import ComposePopUp from './ComposePopup'

const TableBasic = () => {

  const [alerts, setAlerts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [mails, setMails] = useState([])


  async function loadMails() {
    await axios.get('https://pfe-cims.herokuapp.com/alert')
      .then(res => {
        setAlerts(res.data)

        // const mails = res.data.map(mail => {

        //   return {
        //     id: mail._id,
        //     from: {
        //       email: 'tommys@mail.com',
        //       name: mail.by,
        //       avatar: require('@src/assets/images/avatars/1.png').default
        //     },
        //     to: [
        //       {
        //         name: 'me',
        //         email: 'johndoe@mail.com'
        //       }
        //     ],
        //     subject: 'Theme Update',
        //     cc: [],
        //     bcc: [],
        //     message:
        //       `<p>${mail.content}</p>`,
        //     attachments: [
        //       {
        //         fileName: 'log.txt',
        //         thumbnail: require('@src/assets/images/icons/txt.png').default,
        //         url: '',
        //         size: '5mb'
        //       },
        //       {
        //         fileName: 'performance.xls',
        //         thumbnail: require('@src/assets/images/icons/xls.png').default,
        //         url: '',
        //         size: '10mb'
        //       }
        //     ],
        //     isStarred: false,
        //     labels: ['private'],
        //     time: mail.writedAt,
        //     replies: [],
        //     folder: 'inbox',
        //     isRead: true
        //   }


        // })
        // setMails(mails)

        setIsLoading(false)
      })
      .catch(error => alert(error.message))
  }


  useEffect(() => {
    loadMails()
  }, [])

  async function deleteDirection(id) {

    await axios.delete(`https://pfe-cims.herokuapp.com/dir/${id}`)
      .then(res => loadDirections())
      .catch(error => alert(error.message))
  }
  // ** Renders Mail
  const renderMails = () => {
    if (mails.length) {
      return mails.map((mail, index) => {
        return (
          <MailCard
            mail={mail}
            key={index}
            // dispatch={dispatch}
            // selectMail={selectMail}
            // updateMails={updateMails}
            // labelColors={labelColors}
            selectedMails={selectedMails}
          // handleMailClick={handleMailClick}
          // handleMailReadUpdate={handleMailReadUpdate}
          // formatDateToMonthShort={formatDateToMonthShort}
          />
        )
      })
    }
  }

  if (isLoading) return <span></span>

  return (
    // <div className='email-app-list'>
    //   <PerfectScrollbar className='email-user-list' options={{ wheelPropagation: false }}>
    //     {mails.length ? (
    //       <ul className='email-media-list'>{renderMails()}</ul>
    //     ) : (
    //       <div className='no-results d-block'>
    //         <h5>No Items Found</h5>
    //       </div>
    //     )}
    //   </PerfectScrollbar>
    // </div>

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
