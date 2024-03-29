import { useState } from 'react'
import { ImSpinner8 } from 'react-icons/im'


export default function Modal({type, user, handleModal}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [transfer, setTransfer] = useState({
    type: 'transfer',
    from: user.email,
    to: type === 'toUser' ? '' : type === 'toTrade'? 'To trading bot' : 'From trading bot',
    amount: 0,
    status: 'successful',
    method: type
  })
  const [trade, setTrade] = useState({
    email: user.email,
    amount: 0,
  })

  const handleTransfer = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/transfers/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( transfer )
      })
      const data = await res.json()
      if (res.status !== 200) throw new Error(data.message)
      if (res.status === 200) setSuccess('Transfer Successfully Initiated') 
    } catch (error) { setError(error.message) }
    setLoading(false)
  }


  const handleTrade = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/trades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( trade )
      })
      const data = await res.json()
      if (res.ok) setSuccess("Trade Successfully Initiated")
      else throw new Error(data.message)

    } catch (error) { setError(error.message) }
    setLoading(false)
  }


  return (
    <div className='modalCtn'>
      {type === 'toTrade' &&
        <div className='modalWrp'>
              <p className='modalTitle'>Transfer To Trade</p>
              <input 
                value={transfer.amount}
                type='number' 
                placeholder='Enter Amount' 
                className='modalInput' 
                onChange={(e) => setTransfer({...transfer, amount: e.target.value})}/>
              <p className='cancel' onClick={() => handleModal(false)}><span>Cancel</span></p> 
              <p className='modalBtn' onClick={handleTransfer}>{!loading && <span>Send</span>} {loading && <span><ImSpinner8 className='spin'/></span>}</p>
              {error && <p className='formError'>{error}</p>}
              {success && <p className='formSuccess'>{success}</p>}
      </div>
      }


      
      {type === 'fromTrade' &&
        <div className='modalWrp'>
              <p className='modalTitle'>Transfer From Trade</p>
              <input
                value={transfer.amount}
                type='number' 
                placeholder='Enter Amount' 
                className='modalInput' 
                onChange={(e) => setTransfer({...transfer, amount: e.target.value})}/>
              <p className='cancel' onClick={() => handleModal(false)}><span>Cancel</span></p> 
              <p className='modalBtn' onClick={handleTransfer}>{!loading && <span>Send</span>} {loading && <span><ImSpinner8 className='spin'/></span>}</p>
              {error && <p className='formError'>{error}</p>}
              {success && <p className='formSuccess'>{success}</p>}
      </div>
      }



      {type === 'toUser' &&
        <div className='modalWrp'>
              <p className='modalTitle'>Transfer To CtmPro User</p>
              <input 
                  value={transfer.amount}
                  type='number' 
                  placeholder='Enter Amount' 
                  className='modalInput' 
                  onChange={(e) => setTransfer({...transfer, amount: e.target.value})}/>
              <input 
                value={transfer.to}
                type='email' 
                placeholder='Enter Reciever Email' 
                className='modalInput'
                onChange={(e) => setTransfer({...transfer, to: e.target.value})}/>
              <p className='cancel' onClick={() => handleModal(false)}><span>Cancel</span></p> 
              <p className='modalBtn' onClick={handleTransfer}>{!loading && <span>Send</span>} {loading && <span><ImSpinner8 className='spin'/></span>}</p>
              {error && <p className='formError'>{error}</p>}
              {success && <p className='formSuccess'>{success}</p>}
      </div>
      }



      {type === 'startTrade' &&
        <div className='modalWrp'>
              <p className='modalTitle'>Start Trade</p>
              <input 
                value={trade.amount}
                type='number' 
                placeholder='Enter Amount' 
                className='modalInput' 
                onChange={(e) => setTrade({...trade, amount: e.target.value})}/>
              <p className='cancel' onClick={() => handleModal(false)}><span>Cancel</span></p> 
              <button className='modalBtn' disabled={loading} onClick={handleTrade}>{!loading && <span>Send</span>} {loading && <span><ImSpinner8 className='spin'/></span>}</button>
              {error && <p className='formError'>{error}</p>}
              {success && <p className='formSuccess'>{success}</p>}
      </div>
      }
    </div>
  )
}
