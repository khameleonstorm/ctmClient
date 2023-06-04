import { useState } from 'react'
import s from './Ids.module.css'
import { ImSpinner8 } from 'react-icons/im'

export default function Ids({nins}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState(null)
  const [nin, setNin] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleApproval  = (userEmail, userNin) => {
    setEmail(userEmail)
    setNin(userNin)
    setShowModal(true)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const res = await fetch(`http://localhost:5000/api/nins/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nin })
      })

      const data = await res.json()
      if (res.status === 200) setSuccess('NIN approved successfully')
      else throw new Error(data.message)
    } catch (error) { setError(error.message) }
    setLoading(false)
  }


  return (
    <div className={s.ctn}>
      {nins?.map(nin => 
      <div className={s.card} key={nin._id}>
        <div className={s.left}><p className={s.name}>{nin.name}</p><p>{nin.nin}</p></div>
        <div className={s.right}> 
          {nin.status && <p className={s.status} style={{color: '#00ff00'}}>Approved</p>}
          {!nin.status && <p className={s.status} style={{color: '#ff9900'}}>Pending</p>}
          <p className='modalBtn' onClick={() => handleApproval(nin.email, nin.nin)}><span>Approve</span></p>
        </div>
        </div>
          )}

        {showModal &&
        <div className='modalCtn'>
          <div className='modalWrp'>
            <h1 className='modalTitle'>Sure You Want To Approve This NIN?</h1>
            <p className='cancel' onClick={() => setShowModal(false)}><span>Cancel</span></p> 
              <p className='modalBtn' onClick={handleSubmit}>{!loading && <span>Yes</span>} {loading && <span><ImSpinner8 className='spin'/></span>}</p>
              {error && <p className='formError'>{error}</p>}
              {success && <p className='formSuccess'>{success}</p>}
          </div>
        </div>
        }
            
    </div>
  )
}
