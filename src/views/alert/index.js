import { Fragment, useEffect } from 'react'
import { Row, Col, CardBody, CardText } from 'reactstrap'
import prism from 'prismjs'
import TableBasic from './TableBasic'
import MailsList from './MailsList'

import Card from '@components/card-snippet'
import { formatDateToMonthShort } from '@utils'


const mail = {
  id: 1,
  from: {
    email: 'tommys@mail.com',
    name: 'Tommy Sicilia',
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
    '<p>Hi John,</p><p>Biscuit lemon drops marshmallow. Cotton candy marshmallow bear claw. Dragée tiramisu cookie cotton candy. Carrot cake sweet roll I love macaroon wafer jelly soufflé I love dragée. Jujubes jelly I love carrot cake topping I love. Sweet candy I love chupa chups dragée. Tart I love gummies. Chocolate bar carrot cake candy wafer candy canes oat cake I love. Sesame snaps icing pudding sweet roll marshmallow. Cupcake brownie sweet roll chocolate bar I love gummies. Biscuit biscuit macaroon sesame snaps macaroon icing I love soufflé caramels. Apple pie candy jelly. I love icing gummi bears jelly-o pie muffin apple pie.</p><p>Marshmallow halvah brownie cake marzipan ice cream marshmallow. I love lollipop toffee croissant liquorice wafer muffin. Lollipop jelly beans caramels lollipop tootsie roll pudding pie macaroon tootsie roll. Oat cake jujubes gummies cake cake powder cupcake soufflé muffin. Chocolate caramels muffin tart. Jelly beans caramels dessert cotton candy liquorice chocolate cake. Chupa chups muffin bear claw I love. Biscuit jujubes soufflé tart caramels pie sugar plum. Croissant jelly beans cake. Ice cream chocolate liquorice dessert cookie chocolate cake. Powder tart sweet roll macaroon croissant. Sweet tootsie roll macaroon gummi bears macaroon. Gingerbread cake tart.</p><p>Regrads,</p><p>Kristeen Sicilia</p>',
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
  time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)',
  replies: [],
  folder: 'inbox',
  isRead: true
}

const Alerts = () => {


  const handleMailClick = id => {
    dispatch(selectCurrentMail(id))
    setOpenMail(true)
  }

  // ** Handles SelectAll
  const handleSelectAll = e => {
    dispatch(selectAllMail(e.target.checked))
  }

  /*eslint-disable */

  // ** Handles Folder Update
  const handleFolderUpdate = (e, folder, ids = selectedMails) => {
    e.preventDefault()
    dispatch(updateMails(ids, { folder }))
    dispatch(resetSelectedMail())
  }

  // ** Handles Label Update
  const handleLabelsUpdate = (e, label, ids = selectedMails) => {
    e.preventDefault()
    dispatch(updateMailLabel(ids, label))
    dispatch(resetSelectedMail())
  }

  // ** Handles Mail Read Update
  const handleMailReadUpdate = (arr, bool) => {
    dispatch(updateMails(arr, { isRead: bool })).then(() => dispatch(resetSelectedMail()))
    dispatch(selectAllMail(false))
  }

  // ** Handles Move to Trash
  const handleMailToTrash = ids => {
    dispatch(updateMails(ids, { folder: 'trash' }))
    dispatch(resetSelectedMail())
  }
  /*eslint-enable */

  useEffect(() => {
    prism.highlightAll()
  })

  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <Card title='ALerts'
            noBody >
            {/* <TableBasic /> */}
            <MailsList props={{ mail, formatDateToMonthShort, onMailClick: { handleMailClick } }} />
          </Card>
        </Col>

      </Row>
    </Fragment >
  )
}

export default Alerts
