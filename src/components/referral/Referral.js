import s from './Referral.module.css'
import { ImSpinner9 } from 'react-icons/im';
import { useState } from 'react';

export default function Referral({user}) {

  // const handleContact = (e) => {
  //   e.preventDefault()
  // }


if(!user.idVerified){
  return (
    <div className={s.ctn}>
      <p className='formWarning'>Your Account is not yet verified, verify your account and start referring friends to earn more bonus</p>
    </div>
  )
}
}
