import { useState } from 'react'
import s from './Ids.module.css'
import { ImSpinner8 } from 'react-icons/im'

export default function Ids({nins}) {
  const [loadingId, setLoadingId] = useState(null)
  const [email, setEmail] = useState(null)
  const [nin, setNin] = useState(null)

  const handleApproval  = (userEmail, userNin, id) => {
    setEmail(userEmail)
    setNin(userNin)
    handleSubmit(id)
  }

  const handleSubmit = async (id) => {
    setLoadingId(id)
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/nins/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nin })
      })

      const data = await res.json()
      if (res.status === 200) alert('NIN approved successfully')
      else throw new Error(data.message)
    } catch (error) { alert(error.message) }
    setLoadingId(null)
  }


  return (
    <div className={s.ctn}>
      {nins?.map((nin, i) => 
      <div className={s.card} key={i}>
        <div className={s.left}><p className={s.name}>{nin.name}</p><p>{nin.nin}</p></div>
        <div className={s.right}> 
          {nin.status && <p className={s.status} style={{color: '#00ff00'}}>Approved</p>}
          {!nin.status && <p className={s.status} style={{color: '#ff9900'}}>Pending</p>}
          <p className='modalBtn' onClick={() => handleApproval(nin.email, nin.nin, i)}>{loadingId === i? <ImSpinner8 />: <span>Approve</span>}</p>
        </div>
        </div>
          )}  
    </div>
  )
}
