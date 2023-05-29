import { useEffect, useState } from 'react';
import s from './Admin.module.css'
import { io } from 'socket.io-client';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminCards from '../../components/adminCard/AdminCard';
import { HiUsers } from 'react-icons/hi'
import { BsDatabaseFillAdd } from 'react-icons/bs'
import { SiSoundcharts } from 'react-icons/si'
import AdminSideNav from '../../components/adminSideNav/AdminSideNav';
import Approval from '../../components/approval/Approval';
import Ids from '../../components/ids/Ids';

export default function Admin() {
  const user = JSON.parse(localStorage.getItem('ctm_user'))?.user
  const { page } = useParams();
  const navigate = useNavigate()
  const [userDoc, setUserDoc] = useState(user? user : null);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [trades, setTrades] = useState([]);
  const [users, setUsers] = useState([]);
  const [profits, setProfits] = useState([])
  const [nins, setNins] = useState([])

  
  useEffect(() => {
    if (!userDoc) navigate('/login')
    if(userDoc && userDoc.isAdmin === false) navigate('/dashboard')

    const socket = io('https://ctmserver.herokuapp.com/')

      socket.on('connection', () => {
        console.log('Connected to server');
      });

      socket.on('change', (change) => {
        console.log('Received change event:', change);
      });


      // fetch users data using axios
      const fetchUsers = async () => {
        try {
          const res = await axios.get(`https://ctmserver.herokuapp.com/api/users`)
          if (res.data) setUsers(res.data)
        } catch (error) {
          console.log(error)
        }
      }

      if(userDoc) fetchUsers()

      return () => { socket.disconnect()};
  }, [userDoc]);


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`https://ctmserver.herokuapp.com/api/transactions`)
        if (res.data) {
          setDeposits(res.data.filter(transaction => transaction.type === "deposit"))
          setWithdrawals(res.data.filter(transaction => transaction.type === "withdrawal"))
        }
      } catch (error) {
        console.log(error)
      }
    }

    const fetchTrades = async () => {
      try {
        const res = await axios.get(`https://ctmserver.herokuapp.com/api/trades`)
        if (res.data) {
          setTrades(res.data)

          // loop through completed trades and add the spread
          const completed = res.data.filter(trade => trade.status === "completed")
          //loop through and add the value of the spread to the profits array
          setProfits(Math.round(completed.reduce((acc, trade) => acc + trade.spread, 0)).toLocaleString('en-US'))
          
          console.log(completed, trades)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const fetchNins = async () => {
      try {
        const res = await axios.get(`https://ctmserver.herokuapp.com/api/nins`)
        setNins(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }


    fetchNins()
    fetchTransactions()
    fetchTrades()
  }, [])


  return (userDoc &&
    <>
    <AdminSideNav />
      <div className={s.ctn}>
      <main>
        <p style={{color: "#001d13", fontSize: "1.1rem", paddingLeft: "30px"}}>Hellooo!  Admin👋</p>

        {page === "transactions" ? <Approval deposits={deposits} withdrawals={withdrawals} />
        : page === "ids" ? <Ids nins={nins}/>
        : page === "settings" ? <h1>settings</h1>


          : <div className={s.wrp}>
            <AdminCards title="Total Users" value={users.length} icon={<HiUsers />} />
            <AdminCards title="Total Deposits" value={deposits.length} icon={<BsDatabaseFillAdd />} />
            <AdminCards title='Total Trades' value={trades.length} icon={<SiSoundcharts />} />
            <AdminCards title='Total Profits' value={profits} icon={<SiSoundcharts />} />
          </div>}
      </main>
      </div>
    </>
  )
}
