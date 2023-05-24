import { useEffect, useState } from 'react';
import RightNav from '../../components/rightNav/RightNav'
import SideNav from '../../components/sideNav/SideNav'
import s from './Dashboard.module.css'
import { io } from 'socket.io-client';
import axios from 'axios';
import Balance from '../../components/balance/Balance';
import Activity from '../../components/activity/Activity';
import Transactions from '../../components/transactions/Transactions';
import Rocket from '../../components/rocket/Rocket';
import { useParams, useNavigate } from 'react-router-dom';
import Transfer from '../../components/transfer/Transfer';
import TradeCounter from '../../components/tradeCounter/TradeCounter';
import Deposit from '../../components/deposit/Deposit';
import ReferralForm from '../../components/referralForm/ReferralForm';
import { HiMenuAlt3 } from 'react-icons/hi';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('ctm_user'))?.user
  const { page } = useParams();
  const navigate = useNavigate()
  const [userDoc, setUserDoc] = useState(user? user : null);
  const [transactions, setTransactions] = useState([])


  const handleOpen = (e) => {
    const rightNav = document.getElementById('rightNav')
    if(e) rightNav.style.margin = '0'
    else rightNav.style.margin = '-100vw'
  }

  
  useEffect(() => {
    if (!userDoc) navigate('/login')
    if(userDoc && userDoc.isAdmin === true) navigate('/admin')

    const socket = io('http://localhost:5000/')

      socket.on('connection', () => {
        console.log('Connected to server');
      });


      // fetch user data using axios
      const fetchUser = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/users/${userDoc._id}`)
          setUserDoc(res.data)
          
          // get user token from local storage
          const token = JSON.parse(localStorage.getItem('ctm_user')).token

          // update user data in local storage
          localStorage.setItem('ctm_user', JSON.stringify({user: res.data, token}))

        } catch (error) {
          console.log(error)
        }
      }

      if(userDoc) fetchUser()

      socket.on('change', (change) => {
        console.log('Received change event:', change);
        fetchUser()
      });
      

      return () => { socket.disconnect()};
  }, []);


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/transactions/user/${userDoc.email}`)
        console.log(res.data)
        setTransactions(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTransactions()
  }, [userDoc])


  return (userDoc &&
    <>
    
    <SideNav />
    <div className={s.ctn}>
        <main>
          <div className={s.miniNav}> <p>Hellooo!  👋</p> <HiMenuAlt3 onClick={() => handleOpen(true)}/> </div>

          {
            page === 'trade' ?  
              <div className={s.wrp}>
                <Balance type="trade" user={userDoc}/>
                <Activity transactions={transactions} trades={[]}  type={"trade"}/>
                <TradeCounter user={userDoc}/>
              </div>:

            page === 'transfer' ? <Transfer /> :

            page === 'deposit' ? <Deposit /> :

            page === 'referral' ? <ReferralForm /> :

            page === 'transactions' ? <Transactions user={userDoc} transactions={transactions}/> :

              <div className={s.wrp}>
                <Balance type="balance" user={userDoc}/>
                <Activity transactions={transactions} type={"deposit"} />
                <Transactions user={userDoc} transactions={transactions} limit={3} />
                <Rocket />
              </div>
          }
        </main>
    </div>
    <RightNav handleOpen={handleOpen}/>
    </>
  )
}
