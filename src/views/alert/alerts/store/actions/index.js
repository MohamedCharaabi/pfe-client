import axios from 'axios'

// ** GET Mails
export const getMails = params => {
  return dispatch => {
    return axios.get('/apps/email/emails', { params }).then(res => {
      console.log(res.data)
      dispatch({ type: 'GET_MAILS', data: res.data, params })
    })
  }
}

export const getMongoMails = params => {
  return dispatch => {
    return axios.get('https://pfe-cims.herokuapp.com/alert', { params }).then(res => {
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
      dispatch({ type: 'GET_MAILS', data: mails, params })
    })
  }
}

// ** UPDATE Mails
export const updateMails = (emailIds, dataToUpdate) => {
  return (dispatch, getState) => {
    return axios.post('/apps/email/update-emails', { emailIds, dataToUpdate }).then(res => {
      dispatch({ type: 'UPDATE_MAILS', emailIds, dataToUpdate, data: res.data })
      dispatch(getMails(getState().email.params))
    })
  }
}

// ** Update Mail Label
export const updateMailLabel = (emailIds, label) => {
  return (dispatch, getState) => {
    return axios.post('/apps/email/update-emails-label', { emailIds, label }).then(res => {
      dispatch({ type: 'UPDATE_MAIL_LABEL', data: res.data })
      dispatch(getMails(getState().email.params))
    })
  }
}

// ** GET Next/Prev mail
export const paginateMail = (dir, emailId) => {
  return dispatch => {
    return axios.get('/apps/email/paginate-email', { params: { dir, emailId } }).then(res => {
      dispatch({ type: 'PAGINATE_MAIL', data: res.data })
    })
  }
}

// ** SELECT Current Mail
export const selectCurrentMail = id => dispatch => {
  return axios.get('/apps/email/get-email', { id }).then(res => {
    dispatch({ type: 'SELECT_CURRENT_MAIL', mail: res.data })
  })
}

// ** SELECT Mail
export const selectMail = id => dispatch => dispatch({ type: 'SELECT_MAIL', id })

// ** SELECT All Mails
export const selectAllMail = val => dispatch => dispatch({ type: 'SELECT_ALL_MAIL', val })

// ** RESET Selected Mails
export const resetSelectedMail = () => dispatch => dispatch({ type: 'RESET_SELECT_MAILS' })
