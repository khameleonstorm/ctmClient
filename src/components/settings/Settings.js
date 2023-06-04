import { useEffect, useState } from 'react'
import { ImSpinner8 } from 'react-icons/im'


export default function Settings({ utils }) {
  const [rate, setRate] = useState(utils.rate)
  const [bonus, setBonus] = useState(utils.bonus)
  const [margin, setMargin] = useState(utils.margin)
  const [bankName, setBankName] = useState(utils.bankName)
  const [accountName, setAccountName] = useState(utils.accountName)
  const [accountNumber, setAccountNumber] = useState(utils.accountNumber)
  const [walletCoin, setWalletCoin] = useState(utils.walletCoin)
  const [walletAddress, setWalletAddress] = useState(utils.walletAddress)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const res = await fetch(`https://ctmserver.herokuapp.com/api/utils/${utils._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rate,
          bonus,
          margin,
          bankName,
          accountName,
          accountNumber,
          walletCoin,
          walletAddress
        })
      })
      const data = await res.json()
      if(res.status === 200) setSuccess('Settings updated successfully')
      else throw new Error(data.message)

    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    setRate(utils.rate)
    setBonus(utils.bonus)
    setMargin(utils.margin)
    setBankName(utils.bankName)
    setAccountName(utils.accountName)
    setAccountNumber(utils.accountNumber)
    setWalletCoin(utils.walletCoin)
    setWalletAddress(utils.walletAddress)
  }, [utils])





  return (
    <div className='formCtn'>
      <div className='modalWrp' style={{maxWidth: '500px', width: '100%', background: 'none'}}>
        <label style={{padding: '5px'}}>Rate</label>
        <input className='modalInput noBorder' type='number' value={rate} onChange={e => setRate(Number(e.target.value))} />

        <label style={{padding: '5px'}}>Bonus</label>
        <input className='modalInput noBorder' type='number' value={bonus} onChange={e => setBonus(Number(e.target.value))} />

        <label style={{padding: '5px'}}>Margin</label>
        <input className='modalInput noBorder' type='number' value={margin} onChange={e => setMargin(Number(e.target.value))} />

        <label style={{padding: '5px'}}>Bank Name</label>
        <input className='modalInput noBorder' type='text' value={bankName} onChange={e => setBankName(e.target.value)} />

        <label style={{padding: '5px'}}>Account Name</label>
        <input className='modalInput noBorder' type='text' value={accountName} onChange={e => setAccountName(e.target.value)} />

        <label style={{padding: '5px'}}>Account Number</label>
        <input className='modalInput noBorder' type='number' value={accountNumber} onChange={e => setAccountNumber(Number(e.target.value))} />

        <label style={{padding: '5px'}}>Wallet Coin</label>
        <input className='modalInput noBorder' type='text' value={walletCoin} onChange={e => setWalletCoin(e.target.value)} />

        <label style={{padding: '5px'}}>Wallet Address</label>
        <input className='modalInput noBorder' type='text' value={walletAddress} onChange={e => setWalletAddress(e.target.value)} />
        
        <p className='modalBtn' onClick={handleSubmit}>{!loading && <span>Save</span>} {loading && <span><ImSpinner8 className='spin'/></span>}</p>
        {error && <p className='formError'>{error}</p>}
        {success && <p className='formSuccess'>{success}</p>}
      </div>
    </div>
  )
}
