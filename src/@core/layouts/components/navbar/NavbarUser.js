// ** Dropdowns Imports
import IntlDropdown from './IntlDropdown'
import CartDropdown from './CartDropdown'
import UserDropdown from './UserDropdown'
import NavbarSearch from './NavbarSearch'
import NotificationDropdown from './NotificationDropdown'
import { useState, useEffect } from 'react'
// ** Third Party Components
import { Sun, Moon } from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'

const NavbarUser = props => {
  const [userData, setUserData] = useState()


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'))
    setUserData(user)
  }, [])
  // ** Props
  const { skin, setSkin } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  if (!userData) return null
  return (
    <ul className='nav navbar-nav align-items-center ml-auto'>
      {/* change language dropdown */}
      {/* <IntlDropdown /> */}
      <NavItem className='d-none d-lg-block'>
        <NavLink className='nav-link-style'>
          <ThemeToggler />
        </NavLink>
      </NavItem>
      <NavbarSearch />
      {/* Cart Icon  */}
      {/* <CartDropdown /> */}
      {
        userData.role === 'admin' ? <NotificationDropdown /> : null
      }
      <UserDropdown />
    </ul>
  )
}
export default NavbarUser
