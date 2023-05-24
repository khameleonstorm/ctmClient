import s from './Transfer.module.css'
import { BiArrowFromBottom, BiArrowFromTop } from 'react-icons/bi'
import { RiUserSharedLine } from 'react-icons/ri'
import Modal from '../modal/Modal'
import { useState } from 'react';

export default function Transfer() {
  const userDoc = JSON.parse(localStorage.getItem('ctm_user')).user;
  const [showModal, setShowModal] = useState(false)
  const [type, setType] = useState('toTrade')


  const handleModal = (e) => {
    setShowModal(e)
  }

  return (
    <div className={s.ctn}>
      {showModal && <Modal type={type} user={userDoc} handleModal={handleModal}/>}
      <div className={s.card}>
        <BiArrowFromBottom />
        <p onClick={() =>{ setType('toTrade'); setShowModal(true)}}>Transfer to trading bot {'>>'}</p>
      </div>
      <div className={s.card}>
        <BiArrowFromTop />
        <p onClick={() =>{ setType('fromTrade'); setShowModal(true)}}>Transfer from trading bot {'>>'}</p>
      </div>
      <div className={s.card}>
        <RiUserSharedLine />
        <p onClick={() =>{ setType('toUser'); setShowModal(true)}}>Transfer to CtmPro user {'>>'}</p>
      </div>
    </div>
  )
}
