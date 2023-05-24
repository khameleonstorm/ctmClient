import s from './SideNav.module.css'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'

//import icons
import { ReactComponent as HomeIcon } from '../../assets/home.svg';
import { ReactComponent as TradeIcon } from '../../assets/trade.svg';
import { ReactComponent as TransferIcon } from '../../assets/transfer.svg';
import { ReactComponent as DepositIcon } from '../../assets/deposit.svg';
import { ReactComponent as GiftIcon } from '../../assets/gift.svg';
import { ReactComponent as AnnounceIcon } from '../../assets/announce.svg';

export default function SideNav() {
  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <div className={s.logo}><img src={logo} alt="CTM Logo"/></div>
        <div className={s.menu}>
          <NavLink to="/dashboard/home"><HomeIcon /> <span>Home</span></NavLink>
          <NavLink to="/dashboard/trade"><TradeIcon /> <span>Trade</span></NavLink>
          <NavLink to="/dashboard/transfer"><TransferIcon /> <span>Transfer</span></NavLink>
          <NavLink to="/dashboard/deposit"><DepositIcon /> <span>Deposit</span></NavLink>
          <NavLink to="/dashboard/referral"><GiftIcon /> <span>Referral</span></NavLink>
        </div>
        <div className={s.note}>
          <p>Web3 Integration Coming Soon!</p>
          <AnnounceIcon className={s.noteIcon}/>
        </div>
      </div>
    </div>
  )
}
