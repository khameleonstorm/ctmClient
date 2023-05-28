import { useState } from 'react'
import s from './Ids.module.css'

export default function Ids({nins}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleApproval  = async (email) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const response = await fetch(`https://ctmserver.herokuapp.com/api/nins/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await response.json()
      setSuccess('NIN approved')
    } catch (error) { setError('NIN approval was unsuccessful') }
    setLoading(false)
  }


  return (
    <div className={s.ctn}>
      {nins?.map(nin => 
      <div className={s.card} key={nin._id}>
        <div className={s.left}><p>{nin.name}</p><p>{nin.nin}</p></div>
        <div className={s.right}> 
          <p className='modalBtn' onClick={() => handleApproval(nin.email)}>{!loading && <span>Approve</span>} {loading && <span><ImSpinner8 className='spin'/></span>}</p>
        </div>

        {success || error && 
        <div className='modalCtn'>
          <div className='modalWrp'>
            {success? <p className='formSuccess'>{success}</p> : <p className='formError'>{error}</p>}
          </div>
        </div>
        }
      </div>
        )}
    </div>
  )
}
