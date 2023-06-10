import s from './Withdrawal.module.css'
import { GiCardExchange } from 'react-icons/gi'
import { BsBank2 } from 'react-icons/bs'
import Modal3 from '../modal3/Modal3'
import { useState } from 'react';

export default function Withdrawal() {
  const userDoc = JSON.parse(localStorage.getItem('ctm_user')).user;
  const [showModal, setShowModal] = useState(false)
  const [type, setType] = useState('cryptoWithdrawal')


  const handleModal = (e) => {
    setShowModal(e)
  }

  return (
    <div className={s.ctn}>
      {showModal && <Modal3 type={type} user={userDoc} handleModal={handleModal}/>}
      <div className={s.card}>
        <GiCardExchange />
        <p onClick={() =>{ setType('cryptoWithdrawal'); setShowModal(true)}}>Withdraw to crypto exchange {'>>'}</p>
      </div>
      <div className={s.card}>
        <BsBank2 />
        <p onClick={() =>{ setType('bankWithdrawal'); setShowModal(true)}}>Withdraw to bank {'>>'}</p>
      </div>
    </div>
  )
}
