// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle } from 'react-feather'
import {
  Button,
  Badge,
  Media,
  CustomInput,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'
import { Link } from 'react-router-dom'

const NotificationDropdown = () => {

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
  }, [alert])


  // ** Notification Array
  const notificationsArray = [
    {
      img: require('@src/assets/images/portrait/small/avatar-s-15.jpg').default,
      subtitle: 'Won the monthly best seller badge.',
      title: (
        <Media tag='p' heading>
          <span className='font-weight-bolder'>Congratulation Sam 🎉</span>winner!
        </Media>
      )
    }
    // {
    //   img: require('@src/assets/images/portrait/small/avatar-s-3.jpg').default,
    //   subtitle: 'You have 10 unread messages.',
    //   title: (
    //     <Media tag='p' heading>
    //       <span className='font-weight-bolder'>New message</span>&nbsp;received
    //     </Media>
    //   )
    // },
    // {
    //   avatarContent: 'MD',
    //   color: 'light-danger',
    //   subtitle: 'MD Inc. order updated',
    //   title: (
    //     <Media tag='p' heading>
    //       <span className='font-weight-bolder'>Revised Order 👋</span>&nbsp;checkout
    //     </Media>
    //   )
    // },
    // {
    //   title: <h6 className='font-weight-bolder mr-auto mb-0'>System Notifications</h6>,
    //   switch: <CustomInput type='switch' id='primary' name='primary' inline defaultChecked />
    // },
    // {
    //   avatarIcon: <X size={14} />,
    //   color: 'light-danger',
    //   subtitle: 'USA Server is down due to hight CPU usage',
    //   title: (
    //     <Media tag='p' heading>
    //       <span className='font-weight-bolder'>Server down</span>&nbsp;registered
    //     </Media>
    //   )
    // },
    // {
    //   avatarIcon: <Check size={14} />,
    //   color: 'light-success',
    //   subtitle: 'Last month sales report generated',
    //   title: (
    //     <Media tag='p' heading>
    //       <span className='font-weight-bolder'>Sales report</span>&nbsp;generated
    //     </Media>
    //   )
    // },
    // {
    //   avatarIcon: <AlertTriangle size={14} />,
    //   color: 'light-warning',
    //   subtitle: 'BLR Server using high memory',
    //   title: (
    //     <Media tag='p' heading>
    //       <span className='font-weight-bolder'>High memory</span>&nbsp;usage
    //     </Media>
    //   )
    // }
  ]
  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >

        {alerts.map(alert => {
          if (alert.seen) return null
          return <a key={alert._id} className='d-flex' onClick={
            e => {
              e.preventDefault()
              const alertLength = alerts.length;
              const x = alerts.find(a => a._id === alert._id)
              alerts.splice(x)
              // seenAlert(alert._id)
              if (alerts.length === alertLength - 1) { window.location.pathname = `/alert/${alert._id}` }
            }
          }>
            <Media
              className={classnames('d-flex',
                'align-items-start'
              )}
            >

              <Fragment>
                <Media left>
                  {/* <Avatar
                      {...(item.img
                        ? { img: item.img, imgHeight: 32, imgWidth: 32 }
                        : item.avatarContent
                          ? {
                            content: item.avatarContent,
                            color: item.color
                          }
                          : item.avatarIcon
                            ? {
                              icon: item.avatarIcon,
                              color: item.color
                            }
                            : null)}
                    /> */}
                </Media>
                <Media body>
                  {alert.by}
                  <small className='notification-text'>{
                    alert.content ?
                      alert.content.substring(1, 10)
                      : null}
                  </small>
                </Media>
              </Fragment>


            </Media>
          </a>


        })}
        {/* {notificationsArray.map((item, index) => {
          return (
            <a key={index} className='d-flex' href='/' onClick={e => e.preventDefault()}>
              <Media
                className={classnames('d-flex', {
                  'align-items-start': !item.switch,
                  'align-items-center': item.switch
                })}
              >
                {!item.switch ? (
                  <Fragment>
                    <Media left>
                      <Avatar
                        {...(item.img
                          ? { img: item.img, imgHeight: 32, imgWidth: 32 }
                          : item.avatarContent
                            ? {
                              content: item.avatarContent,
                              color: item.color
                            }
                            : item.avatarIcon
                              ? {
                                icon: item.avatarIcon,
                                color: item.color
                              }
                              : null)}
                      />
                    </Media>
                    <Media body>
                      {item.title}
                      <small className='notification-text'>{item.subtitle}</small>
                    </Media>
                  </Fragment>
                ) : (
                  <Fragment>
                    {item.title}
                    {item.switch}
                  </Fragment>
                )}
              </Media>
            </a>
          )
        })} */}
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */
  if (isLoading) return <span></span>

  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item mr-25'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
        <Bell size={21} />
        {alerts.filter(a => a.seen === false).length > 0 ? <Badge pill color='danger' className='badge-up'></Badge> : null}

      </DropdownToggle>
      <DropdownMenu tag='ul' right className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 mr-auto'>Notifications</h4>
            <Badge tag='div' color='light-primary' pill>
              6 New
            </Badge>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        <li className='dropdown-menu-footer'>
          <Link to={`/alerts`}>

            <Button.Ripple color='primary' block>
              Tous les notifications
            </Button.Ripple>
          </Link>
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
