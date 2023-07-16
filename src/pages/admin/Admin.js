import { useEffect, useState } from 'react';
import s from './Admin.module.css';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminCards from '../../components/adminCard/AdminCard';
import { HiUsers } from 'react-icons/hi';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import { SiSoundcharts } from 'react-icons/si';
import AdminSideNav from '../../components/adminSideNav/AdminSideNav';
import Approval from '../../components/approval/Approval';
import Ids from '../../components/ids/Ids';
import Settings from '../../components/settings/Settings';

export default function Admin() {
  const user = JSON.parse(localStorage.getItem('ctm_user'))?.user
  const { page } = useParams();
  const navigate = useNavigate()
  const [userDoc, setUserDoc] = useState(user? user : null);
  const [deposits, setDeposits] = useState([]);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [withdrawals, setWithdrawals] = useState([]);
  const [trades, setTrades] = useState([]);
  const [users, setUsers] = useState([]);
  const [profits, setProfits] = useState([])
  const [nins, setNins] = useState([])
  const [utils, setUtils] = useState({ rate: 0, bonus: 0, margin: 0, bankName: '', accountName: '', accountNumber: 0, walletCoin: '', walletAddress: '' })


    
  useEffect(() => {
    const chatDiv = document.getElementById('tidio-chat')
    if(chatDiv) chatDiv.style.display = 'none'

    return () => {
      if(chatDiv) chatDiv.style.display = 'block'
    }
  }, [])
  
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
          const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`)
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
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/transactions`)
        if (res.data) {
          setDeposits(res.data.filter(transaction => transaction.type === "deposit"))
          //filter out deposits and add the amount to the total deposits and the deposits status should not be pending
          setTotalDeposits(Math.round(res.data.filter(transaction => transaction.type === "deposit" && transaction.status === 'successful').reduce((acc, transaction) => acc + transaction.amount, 0))
          .toLocaleString('en-US'))
          setWithdrawals(res.data.filter(transaction => transaction.type === "withdrawal"))
        }
      } catch (error) {
        console.log(error)
      }
    }

    const fetchTrades = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/trades`)
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
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/nins`)
        setNins(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchUtils = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/utils/647cd9ec3c6d2b0f516b962f`)
        setUtils(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }


    fetchUtils()
    fetchNins()
    fetchTransactions()
    fetchTrades()
  }, [])


  return (userDoc &&
    <>
    {page === "transactions" ?<Approval deposits={deposits} withdrawals={withdrawals} />

      : page === "ids" ? 
      <>
        <AdminSideNav />
        <div className={s.ctn}>
          <main>
            <Ids nins={nins}/>
          </main>
        </div>
      </>

      : page === "settings" ?         
      <>
      <AdminSideNav />
      <div className={s.ctn}>
        <main>
          <Settings utils={utils} />
        </main>
      </div>
      </>

      : 
      <>
      <AdminSideNav />
      <div className={s.ctn}>
      <main>
        <p style={{color: "#001d13", fontSize: "1.1rem", paddingLeft: "30px"}}>Hellooo!  Admin👋</p>
        <div className={s.wrp}>
            <AdminCards title="Total Users" value={users.length} icon={<HiUsers />} />
            <AdminCards title="Total Deposits" value={totalDeposits} icon={<BsDatabaseFillAdd />} />
            <AdminCards title='Total Trades' value={trades.length} icon={<SiSoundcharts />} />
            <AdminCards title='Total Profits' value={profits} icon={<SiSoundcharts />} />
          </div>
      </main>
      </div>
      </>
    }
    </>
  )
}
