import s from './RightNav.module.css'
import { NavLink } from 'react-router-dom'
import Avatar from '../avatar/Avatar';
import { useEffect, useState } from 'react';

//import icons
import { ReactComponent as TradeIcon } from '../../assets/trade2.svg';
import { ReactComponent as TransferIcon } from '../../assets/transfer2.svg';
import { ReactComponent as WalletIcon } from '../../assets/wallet.svg';
import { MdCandlestickChart } from 'react-icons/md'
import { HiUsers } from 'react-icons/hi'
import { GrClose } from 'react-icons/gr'
import { CiLogout } from 'react-icons/ci'
import axios from 'axios';

export default function RightNav({handleOpen}) {
  const user = JSON.parse(localStorage.getItem('ctm_user')).user
  const [activeTrades, setActiveTrades] = useState(0)
  const [completedTrades, setCompletedTrades] = useState(0)
  const [referrals, setReferrals] = useState(0)

  
      
    // get all active trades
    const getActiveTrades = async () => {
      try {
        const res = await fetch(`https://ctmserver.herokuapp.com/api/trades/count/${user.email}`)
        const data = await res.json()

        if (res.status === 200) setActiveTrades(data.count)
        else throw new Error(data.message)
      } catch (error) {
        console.log(error)
      }
    }
      
    // get all closed trades
    const getCompletedTrades = async () => {
      try {
        const res = await fetch(`https://ctmserver.herokuapp.com/api/trades/count/completed/${user.email}`)
        const data = await res.json()

        if (res.status === 200) setCompletedTrades(data.count)
        else throw new Error(data.message)
      } catch (error) {
        console.log(error)
      }
    }

    // get all referrals
    const getReferrals = async () => {
      try {
        const res = await fetch(`https://ctmserver.herokuapp.com/api/users/count-referrals/${user.username}`)
        const data = await res.json()

        if (res.status === 200) setReferrals(data.count)
        else throw new Error(data.message)
      } catch (error) {
        console.log(error)
      }
    }




  useEffect(() => {
    getActiveTrades()
    getCompletedTrades()
    getReferrals()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('ctm_user')
    window.location.reload()
  }


  return (
    <div className={s.ctn} id='rightNav'>
      <div className={s.wrp}>
        <Avatar user={user} size={90}/>
        <div className={s.menu}>
          <NavLink to="/dashboard/trade"><TradeIcon /><span>Trade</span></NavLink>
          <NavLink to="/dashboard/transactions"><TransferIcon /><span>Transactions</span></NavLink>
          <NavLink to="/dashboard/wallet"><WalletIcon /><span>Wallet</span></NavLink>
        </div>
        <div className={s.activity}>
          <div> <h3>Active Trades</h3> <h1>{activeTrades}<span><MdCandlestickChart /></span></h1></div>
          <div> <h3>Completed Trades</h3> <h1>{completedTrades}<span><MdCandlestickChart /></span></h1></div>
          <div> <h3>Referred</h3> <h1>{referrals}<span><HiUsers /></span></h1></div>
        </div>

        <GrClose className={s.close} onClick={() =>handleOpen(false)}/>

        <div className={s.logout}>
          <CiLogout />
          <p onClick={handleLogout}>Logout</p>
        </div>
      </div>

      
    </div>
  )
}
