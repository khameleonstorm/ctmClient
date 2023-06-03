import { useState } from 'react'
import s from './Avatar.module.css'
import { ImSpinner8 } from 'react-icons/im'

export default function Avatar({ user, size}) {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [NIN, setNIN] = useState('')


  const handleModal = () => {
    setShowModal(!showModal)
  }

  const handleSubmit = async() => {
    setLoading(true)
    if (NIN !== '') {
      try{
        const res = await fetch('https://ctmserver.herokuapp.com/api/nins', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({nin: NIN, name: user.fullName, email: user.email})
        })

        const data = await res.json()
        if (res.status !== 200) throw new Error(data.message)
        if (res.status === 200) {
          setSuccess('Verification Successful')
          setLoading(false)
        }

      } catch (error) {
        setError(error.message)
        setLoading(false)
      }

      setTimeout(() => {
        setSuccess(false)
        setError(false)
        setShowModal(false)
        setNIN('')
      }, 3000)
    }
  }



  return (
    <>
      <div className={s.ctn}>
        <div className={s.img}>
          <img src={`https://robohash.org/${user._id}`} alt="avatar" style={{height: `${size}px`, width: `${size}px`}}/>
        </div>

        <h3>{user.fullName}</h3>

        {!user.idVerified && <p className={s.notVerified} onClick={handleModal}>User Not Verified!</p>}
        {user.idVerified && <p className={s.verified}>User Verified!</p>}
      </div>

      {showModal &&
        <div className='modalCtn'>
          <div className='modalWrp'>
            <p className='modalTitle'>National Identication Number</p>
            <input value={NIN} className='modalInput' onChange={(e) => setNIN(e.target.value)} placeholder='Enter your national ID number'/>
            <p className='cancel' onClick={handleModal}><span>Cancel</span></p> 
            <p className='modalBtn' onClick={handleSubmit}>{!loading && <span>Submit</span>} {loading && <ImSpinner8 className='spin'/>}</p>
              {error && <p className='formError'>{error}</p>}
              {success && <p className='formSuccess'>{success}</p>}
          </div>
        </div>
      }
    </>
  )
}
