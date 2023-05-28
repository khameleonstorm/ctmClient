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
  const [user, setUser] = useState({})
  const [activeTrades, setActiveTrades] = useState([])
  const [completedTrades, setCompletedTrades] = useState([])
  const [referrals, setReferrals] = useState([])

  
  useEffect(() => {
    const res = JSON.parse(localStorage.getItem('ctm_user'))
    setUser(res.user)
    
    // get all trades
    const getTrades = async () => {
      try {
        const res = await axios.get(`https://ctmserver.herokuapp.com/api/trades/user/${user.email}`).
        console.log(res.data)
        setActiveTrades(res.data.filter(trade => trade.status === 'pending').length)
        setCompletedTrades(res.data.filter(trade => trade.status === 'completed').length)
        console.log("numbers", activeTrades, completedTrades, referrals)
      } catch (error) {
        console.log(error)
      }
    }

    getTrades()
  }, [user.email])

  useEffect(() => {
    const getReferrals = async () => {
      try {
        const res = await axios.get(`https://ctmserver.herokuapp.com/api/users/referrals/${user.username}`)
        console.log(res.data)
        
        if (res.data.length === 0 || !res.data) setReferrals(0)
        else setReferrals(res.data.length)
      } catch (error) {
        console.log(error)
        setReferrals(0)
      }
    }
    
    getReferrals()

  }, [user.username])

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
