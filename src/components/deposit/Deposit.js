import s from './Deposit.module.css'
import { GiCardExchange } from 'react-icons/gi'
import { BsBank2 } from 'react-icons/bs'
import Modal2 from '../modal2/Modal2'
import { useState } from 'react';

export default function Deposit() {
  const userDoc = JSON.parse(localStorage.getItem('ctm_user')).user;
  const [showModal, setShowModal] = useState(false)
  const [type, setType] = useState('cryptoDeposit')


  const handleModal = (e) => {
    setShowModal(e)
  }

  return (
    <div className={s.ctn}>
      {showModal && <Modal2 type={type} user={userDoc} handleModal={handleModal}/>}
      <div className={s.card}>
        <GiCardExchange />
        <p onClick={() =>{ setType('usdtDeposit'); setShowModal(true)}}>USDT Deposit {'>>'}</p>
      </div>
      <div className={s.card}>
        <BsBank2 />
        <p onClick={() =>{ setType('bankDeposit'); setShowModal(true)}}>Deposit from bank {'>>'}</p>
      </div>
    </div>
  )
}
