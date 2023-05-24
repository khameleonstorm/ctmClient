import s from './Balance.module.css'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Modal from '../modal/Modal'

export default function Balance({type, user}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')


  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    console.log(currentTime)
    return () => clearInterval(interval)
  }, []);

  const handleModal = (e) => {
    setShowModal(e)
  }


  return (
    <div className={s.ctn}>
      <div className={`${s.wrp} ${type === "balance"? s.balance : type === "trade"? s.trade : type === "bonus"? s.bonus : s.card}`}>
        <div className={s.left}>
          <p className={s.title}>{type}</p>
          <h1 className={s.bal}>{
            type === "balance"? user.balance.toLocaleString('en-US')
            : type === "trade"? user.trade.toLocaleString('en-US')
              : type === "bonus"? user.bonus.toLocaleString('en-US')
              : user.card}<span>$</span>
          </h1>
          <div className={s.btns}>
            <Link to="/dashboard/transfer" className={s.btn}> Transfer </Link>
            <p className={s.btn} onClick={() => {setModalType('withdrawal'); setShowModal(true)}}> Withdraw </p>
          </div>
        </div>
        <div className={s.right}>
          <Logo />
          <p className={s.date}>{currentTime.getMonth() + 1}/{currentTime.getDate()}/{currentTime.getHours()}:{currentTime.getMinutes()}</p>
          {type === "trade" ? (
          <p className={s.btn} onClick={() => {setModalType('startTrade'); setShowModal(true)}}>
            Trade {">>"}
          </p>
          ) : (
          <Link to="/dashboard/deposit" className={s.btn}>
            + Add Fund
          </Link>
          )}
        </div>
      </div>

      {showModal && <Modal type={modalType} user={user} handleModal={handleModal}/>}
    </div>
  )
}
