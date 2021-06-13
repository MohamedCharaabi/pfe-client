// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// ** Email App Component Imports
import Mails from './Mails'
import Sidebar from './Sidebar'

// ** Third Party Components
import classnames from 'classnames'
import axios from 'axios'


// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  getMails,
  selectMail,
  updateMails,
  paginateMail,
  selectAllMail,
  resetSelectedMail,
  selectCurrentMail,
  updateMailLabel,
  getMongoMails
} from './store/actions'

// ** Styles
import '@styles/react/apps/app-email.scss'

const EmailApp = () => {
  // ** States
  const [query, setQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [composeOpen, setComposeOpen] = useState(false)
  const [mails, setMails] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // ** Toggle Compose Function
  const toggleCompose = () => setComposeOpen(!composeOpen)

  // ** Store Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.email)

  // ** Vars
  const params = useParams()


  async function loadMails() {
    await axios.get('https://pfe-cims.herokuapp.com/alert')
      .then(res => {
        // setAlerts(res.data)

        const mails = res.data.map(mail => {

          return {
            id: mail._id,
            from: {
              email: 'tommys@mail.com',
              name: mail.by,
              avatar: require('@src/assets/images/avatars/1.png').default
            },
            to: [
              {
                name: 'me',
                email: 'johndoe@mail.com'
              }
            ],
            subject: 'Theme Update',
            cc: [],
            bcc: [],
            message:
              `<p>${mail.content}</p>`,
            attachments: [
              {
                fileName: 'log.txt',
                thumbnail: require('@src/assets/images/icons/txt.png').default,
                url: '',
                size: '5mb'
              },
              {
                fileName: 'performance.xls',
                thumbnail: require('@src/assets/images/icons/xls.png').default,
                url: '',
                size: '10mb'
              }
            ],
            isStarred: false,
            labels: ['private'],
            time: mail.writedAt,
            replies: [],
            folder: 'inbox',
            isRead: true
          }


        })
        setMails(mails)
        setIsLoading(false)
      })
      .catch(error => alert(error.message))
  }

  // ** UseEffect: GET initial data on Mount
  useEffect(() => {
    dispatch(getMails({ q: query || '', folder: params.folder || 'inbox', label: params.label || '' }))
    loadMails()
  }, [query, params.folder, params.label])
  if (isLoading) return <span></span>

  return (
    <Fragment>
      <Sidebar
        store={store}
        dispatch={dispatch}
        getMails={mails}
        sidebarOpen={sidebarOpen}
        toggleCompose={toggleCompose}
        setSidebarOpen={setSidebarOpen}
        resetSelectedMail={resetSelectedMail}
      />
      <div className='content-right'>
        <div className='content-body'>
          <div
            className={classnames('body-content-overlay', {
              show: sidebarOpen
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <Mails
            store={store}
            query={query}
            setQuery={setQuery}
            dispatch={dispatch}
            getMails={mails}
            selectMail={selectMail}
            updateMails={updateMails}
            composeOpen={composeOpen}
            paginateMail={paginateMail}
            selectAllMail={selectAllMail}
            toggleCompose={toggleCompose}
            setSidebarOpen={setSidebarOpen}
            updateMailLabel={updateMailLabel}
            selectCurrentMail={selectCurrentMail}
            resetSelectedMail={resetSelectedMail}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default EmailApp
