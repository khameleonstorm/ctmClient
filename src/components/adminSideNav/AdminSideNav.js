import s from './AdminSideNav.module.css'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'

//import icons
import { ReactComponent as HomeIcon } from '../../assets/home.svg';
import { ReactComponent as TransactIcon } from '../../assets/transact.svg';
import { ReactComponent as VerifyIcon } from '../../assets/verify.svg';
import { ReactComponent as UtilsIcon } from '../../assets/utils.svg';
import { CiLogout } from 'react-icons/ci';

export default function AdminSideNav() {
  
  const handleLogout = () => {
    localStorage.removeItem('ctm_user')
    window.location.reload()
  }




  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <div className={s.logo}><img src={logo} alt="CTM Logo"/></div>
        <div className={s.menu}>
          <NavLink to="/admin/home"><HomeIcon /> <span>Home</span></NavLink>
          <NavLink to="/admin/transactions"><TransactIcon /> <span>Transactions</span></NavLink>
          <NavLink to="/admin/ids"><VerifyIcon /> <span>Verifications</span></NavLink>
          <NavLink to="/admin/settings"><UtilsIcon /> <span>Settings</span></NavLink>
        </div>

        <div className={s.logout}>
          <CiLogout />
          <p onClick={handleLogout}>Logout</p>
        </div>
      </div>
    </div>
  )
}
