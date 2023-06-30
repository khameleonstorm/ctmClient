import { ImSpinner8 } from 'react-icons/im'
import s from './Modal2.module.css'
import { useState } from 'react'

export default function Modal2({type: typeOf, handleModal, user}) {
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
    if (type === 'usdtDeposit') {
      setType('usdtNext')
    }

    if (type === 'bankDeposit') {
      setType('bankNext')
    }
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
    try {
      const response = await fetch(`https://ctmserver.herokuapp.com/api/deposits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( deposit )
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      if (response.ok) setSuccess(data.message)
    } catch (error) { setError(error.message) }
    setLoading(false)
  }

  const handleBankDeposit = async (e) => {
    setError(null)
    try {
      const res = await fetch(`https://ctmserver.herokuapp.com/api/utils/647cd9ec3c6d2b0f516b962f`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      console.log(data)
      if (!res.ok) throw new Error(data.message)
      if (res.ok) setDeposit({...deposit, amount: e.target.value/data.rate})
    } catch (error) {
      setError(error.message)
    }
  }





  return (
    <div className='modalCtn'>
    {type === 'usdtDeposit' &&
      <div className='modalWrp'>
            <p className={s.title}>Deposit only USDT(Network: TRC20) to this address.</p>
            <p className={s.title2}>(1) Tap on the address to copy</p>
            <p className={s.title2}>(2) Send USDT to the address </p>
            <p className={s.title2}>(3) Click Next to fill your transaction details</p> 
            <p className={s.title2}>(4) Wait 5mins for deposit approval.</p>
            <input onClick={() => handleCopy('TCFfkiRoXrhSdTtN1Ta9VAyx9fRvztzNK5')} defaultValue={'TCFfkiRoXrhSdTtN1Ta9VAyx9fRvztzNK5'} className='modalInput' readOnly/>
            <p className='cancel' onClick={() => handleModal(false)}><span>Cancel</span></p> 
            <p className='modalBtn' onClick={handleNext}><span>Next</span></p>
      </div>
    }

    {type === 'bankDeposit' &&
      <div className='modalWrp'>
            <p className={s.title}>Bank Deposit</p>
            <p className={s.title2}>(1) Tap on the account number to copy</p>
            <p className={s.title2}>(2) Send funds to the bank account </p>
            <p className={s.title2}>(3) Click Next to fill your transaction details</p> 
            <p className={s.title2}>(4) Wait 5mins for deposit approval.</p>
            <input onClick={() => handleCopy('8297639186')} defaultValue={'8297639186'} className='modalInput' readOnly/>
            <input onClick={() => handleCopy('Moniepoint')} defaultValue={'Moniepoint '} className='modalInput' readOnly/>
            <input onClick={() => handleCopy('Phillglad Technologies')} defaultValue={'Phillglad Technologies'} className='modalInput' readOnly/>
            <p className='cancel' onClick={() => handleModal(false)}><span>Cancel</span></p> 
            <p className='modalBtn' onClick={handleNext}><span>Next</span></p>
    </div>
    }

    {type === 'usdtNext' &&
      <div className='modalWrp'>
        <p className='title' style={{width: "100%",textAlign: 'center', marginBottom: '10px'}}>Amount</p>
        <input value={deposit.amount} type='number' placeholder='Enter Amount' className='modalInput' onChange={(e) => setDeposit({...deposit, amount: e.target.value})}/>
        <p className='cancel' onClick={() => handleModal(false)}><span>Cancel</span></p>
        <p className='modalBtn' onClick={handleDeposit}>{!loading && "Send"} {loading && <ImSpinner8 className='spin'/>}</p>
        {error && <p className='formError'>{error}</p>}
        {success && <p className='formSuccess'>{success}</p>}
      </div>
    }

    {type === 'bankNext' &&
      <div className='modalWrp'>
        <div style={{width: "49%", textAlign: 'center', fontSize: '.8rem'}}>
          <label>NGN</label>
          <input  type='number' className='modalInput' onChange={handleBankDeposit}/>
        </div>

        <div style={{width: "49%", textAlign: 'center', fontSize: '.8rem'}}>
          <label>USD</label>
          <input value={deposit.amount} type='number' className='modalInput' disabled/>
        </div>
        <p className='cancel' onClick={() => handleModal(false)}><span>Cancel</span></p>
        <p className="modalBtn" onClick={handleDeposit}>{!loading && "Send"} {loading && <ImSpinner8 className='spin'/>}</p>
        {error && <p className='formError'>{error}</p>}
        {success && <p className='formSuccess'>{success}</p>}
      </div>
    }
  </div>
  )
}
