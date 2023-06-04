import { useState } from 'react'
import { ImSpinner8 } from 'react-icons/im'


export default function Settings({ utils }) {
  const [rate, setRate] = useState(utils.rate)
  const [bonus, setBonus] = useState(utils.bonus)
  const [margin, setMargin] = useState(utils.margin)
  const [bankName, setBankName] = useState(utils.bankName)
  const [accName, setAccName] = useState(utils.accName)
  const [accNumber, setAccNumber] = useState(utils.accNumber)
  const [walletCoin, setWalletCoin] = useState(utils.walletCoin)
  const [walletAddress, setWalletAddress] = useState(utils.walletAddress)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {} catch (error) {}
  }





  return (
    <div className='formCtn'>
      <div className='modalWrp'>
        <input className='modalInput' type='number' value={rate} onChange={e => setRate(e.target.value)} />
        <input className='modalInput' type='number' value={bonus} onChange={e => setBonus(e.target.value)} />
        <input className='modalInput' type='number' value={margin} onChange={e => setMargin(e.target.value)} />
        <input className='modalInput' type='text' value={bankName} onChange={e => setBankName(e.target.value)} />
        <input className='modalInput' type='text' value={accName} onChange={e => setAccName(e.target.value)} />
        <input className='modalInput' type='number' value={accNumber} onChange={e => setAccNumber(e.target.value)} />
        <input className='modalInput' type='text' value={walletCoin} onChange={e => setWalletCoin(e.target.value)} />
        <input className='modalInput' type='text' value={walletAddress} onChange={e => setWalletAddress(e.target.value)} />
        <p className='modalBtn' onClick={handleSubmit}>{!loading && <span>Save</span>} {loading && <span><ImSpinner8 className='spin'/></span>}</p>
        {error && <p className='formError'>{error}</p>}
        {success && <p className='formSuccess'>{success}</p>}
      </div>
    </div>
  )
}
