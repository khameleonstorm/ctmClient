import { ImSpinner8 } from 'react-icons/im'
import s from './Modal4.module.css'
import { useState } from 'react'

export default function Modal4({type: typeOf, handleModal, user}) {
  const [type, setType] = useState(typeOf)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [deposit, setDeposit] = useState({
    type: 'deposit',
    from: user.email,
    amount: 0,
    status: 'pending',
    method: type
  })

  const handleNext = () => {
    if (type === 'skrill') setType('skrillNext')
    if (type === 'paypal') setType('paypalNext')
    if (type === 'payoneer') setType('payoneerNext')
  }

  
  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('Text copied to clipboard');
    } catch (err) {
      console.log('Failed to copy text: ', err);
    }
  };

  const handleDeposit = async () => { 
    setLoading(true)
    setError(null)
    setSuccess(null)

    const convertedAmount = type === 'skrillNext' ? Number(deposit.amount) * 0.884 
    : type === 'payoneerNext' ? Number(deposit.amount) * 0.884 
    : type === 'paypalNext' ? Number(deposit.amount) * 0.809 : Number(deposit.amount)


    try {
      const response = await fetch(`https://ctmserver.herokuapp.com/api/deposits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {...deposit, amount: convertedAmount} )
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      if (response.ok) setSuccess(data.message)
    } catch (error) { setError(error.message) }
    setLoading(false)
  }





  return (
    <div className='modalCtn'>
    {(type === 'skrill' || type === 'paypal' || type === 'payoneer') &&
      <div className='modalWrp'>
            <p className={s.title}>{type} Deposit</p>
            <p className={s.title2}>(1) $1 &rarr; {type === 'skrill' ? '$0.884' : type === 'payoneer' ? '$0.884' : type === 'paypal' ? '$0.809' : '$1'}</p>
            <p className={s.title2}>(2) Tap on the email to copy</p>
            <p className={s.title2}>(3) Send USD to the email</p>
            <p className={s.title2}>(4) Click Next to fill your transaction details</p> 
            <p className={s.title2}>(5) Wait 5mins for deposit approval.</p>
            <input onClick={() => handleCopy('oraclepayng@gmail.com')} defaultValue={'oraclepayng@gmail.com'} className='modalInput' readOnly/>
            <p className='cancel' onClick={() => handleModal(false)}><span>Cancel</span></p> 
            <p className='modalBtn' onClick={handleNext}><span>Next</span></p>
      </div>
    }

    {(type === 'skrillNext' || type === 'paypalNext' || type === 'payoneerNext') &&
      <div className='modalWrp'>
        <p className='title' style={{width: "100%",textAlign: 'center', marginBottom: '10px'}}>Amount</p>
        <input value={deposit.amount} type='number' placeholder='Enter Amount' className='modalInput' onChange={(e) => setDeposit({...deposit, amount: e.target.value})}/>
        <p className='cancel' onClick={() => handleModal(false)}><span>Cancel</span></p>
        <p className='modalBtn' onClick={handleDeposit}>{!loading && "Send"} {loading && <ImSpinner8 className='spin'/>}</p>
        {error && <p className='formError'>{error}</p>}
        {success && <p className='formSuccess'>{success}</p>}
      </div>
    }

  </div>
  )
}
