import { ImSpinner8 } from 'react-icons/im'
import s from './Modal3.module.css'
import { useState } from 'react'

export default function Modal3({type, handleModal, user}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [withdraw, setWithdraw] = useState({
    type: 'withdrawal',
    from: user.email,
    wallet: '',
    amount: 0,
    status: 'pending',
    method: 'wallet',
    accountNumber: '',
    bankName: ''
  })


  const handlewithdraw = async () => { 
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const response = await fetch(`https://ctmserver.herokuapp.com/api/withdraws`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( withdraw )
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      if (response.ok) setSuccess(data.message)
    } catch (error) { setError(error.message) }
    setLoading(false)
  }

  const handleBankWithdrawal = async (e) => {
    setError(null)
    try {
      const res = await fetch(`https://ctmserver.herokuapp.com/api/utils/647cd9ec3c6d2b0f516b962f`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      console.log(data)
      if (!res.ok) throw new Error(data.message)
      if (res.ok) setWithdraw({...withdraw, amount: e.target.value * data.rate})
    } catch (error) {
      setError(error.message)
    }
  }





  return (
    <div className='modalCtn'>
    {type === 'cryptoWithdrawal' &&
      <div className='modalWrp'>
        <input value={withdraw.amount} type='number' placeholder='Enter Amount' className='modalInput' onChange={(e) => setWithdraw({...withdraw, amount: e.target.value})}/>
        <input value={withdraw.address} type='text' placeholder='Enter Transaction Hash' className='modalInput' onChange={(e) => setWithdraw({...withdraw, hash: e.target.value})}/>
        <p className='cancel' onClick={() => handleModal(false)}><span>Cancel</span></p>
        <p className={`modalBtn ${loading && 'loadBtn'}`} onClick={handlewithdraw}>{!loading && "Send"} {loading && <ImSpinner8 className='spin'/>}</p>
        {error && <p className='formError'>{error}</p>}
        {success && <p className='formSuccess'>{success}</p>}
      </div>
    }

    {type === 'bankWithdrawal' &&
      <div className='modalWrp'>
        <div style={{width: "49%", textAlign: 'center', fontSize: '.8rem'}}>
          <label>USD</label>
          <input  type='number' className='modalInput' onChange={handleBankWithdrawal}/>
        </div>

        <div style={{width: "49%", textAlign: 'center', fontSize: '.8rem'}}>
          <label>NGN</label>
          <input value={withdraw.amount} type='number' className='modalInput' disabled/>
        </div>
        <input value={withdraw.accountNumber} type='text' placeholder='Enter Account Number' className='modalInput' onChange={(e) => setWithdraw({...withdraw, accountNumber: e.target.value})}/>
        <input value={withdraw.bankName} type='text' placeholder='Enter Bank Name' className='modalInput' onChange={(e) => setWithdraw({...withdraw, bankName: e.target.value})}/>
        <p className='cancel' onClick={() => handleModal(false)}><span>Cancel</span></p>
        <p className="modalBtn" onClick={handlewithdraw}>{!loading && "Send"} {loading && <ImSpinner8 className='spin'/>}</p>
        {error && <p className='formError'>{error}</p>}
        {success && <p className='formSuccess'>{success}</p>}
      </div>
    }
  </div>
  )
}
