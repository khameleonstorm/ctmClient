import s from './Deposit.module.css'
import { ReactComponent as SkrillIcon } from '../../assets/S.svg';
import { SiPayoneer, SiTether } from 'react-icons/si'
import { HiBuildingOffice2 } from 'react-icons/hi2'
import Modal2 from '../modal2/Modal2'
import { useState } from 'react';
import Modal4 from '../modal4/Modal4';
import { ImPaypal } from 'react-icons/im';

export default function Deposit() {
  const userDoc = JSON.parse(localStorage.getItem('ctm_user')).user;
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [type, setType] = useState('cryptoDeposit')


  const handleModal = (e) => {
    setShowModal(e)
  }

  const handleModal2 = (e) => {
    setShowModal2(e)
  }

  return (
    <div className={s.ctn}>
      {showModal && <Modal2 type={type} user={userDoc} handleModal={handleModal}/>}
      {showModal2 && <Modal4 type={type} user={userDoc} handleModal={handleModal2}/>}
      <div className={s.card}>
        <HiBuildingOffice2 color='#1c3b00'/>
        <p onClick={() =>{ setType('bankDeposit'); setShowModal(true)}}>Deposit from bank {'>>'}</p>
      </div>

      <div className={s.card}>
        <SiTether color='#00b35f'/>
        <p onClick={() =>{ setType('usdtDeposit'); setShowModal(true)}}>USDT Deposit {'>>'}</p>
      </div>

      <div className={s.card}>
        <SkrillIcon />
        <p onClick={() =>{alert('This deposit option is currently not available')}}>Skrill Deposit {'>>'}</p>
      </div>

      <div className={s.card}>
        <SiPayoneer color='#c70056'/>
        <p onClick={() =>{alert('This deposit option is currently not available')}}>Payoneer Deposit {'>>'}</p>
      </div>

      <div className={s.card}>
        <ImPaypal color='#005fcc'/>
        <p onClick={() =>{alert('This deposit option is currently not available')}}>PayPal Deposit {'>>'}</p>
      </div>

    </div>
  )
}
