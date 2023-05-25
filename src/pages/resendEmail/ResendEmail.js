import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ImSpinner9 } from 'react-icons/im';
import axios from 'axios';
import Nav from '../../components/nav/Nav';

export default function ResendEmail() {
  const { email } = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)


  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await axios.post('https://ctmserver.herokuapp.com/api/users/resend-email', { email })
      if(res.status === 200) setSuccess(true)
      if(res.status !== 200) setError(res.data.message)

      console.log(res)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.response?.data?.message)
    }
  }


  return (
    <div className='formCtn'>
      <Nav black={true}/>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Verify your email</h1>
        {!loading && <button className="bigBtn full">Verify</button>}
        {loading && <button disabled className="bigBtn full load"><ImSpinner9 className='spin' color="#ffffff73" size={25}/> </button>}
        {error && <p className="formError">{error}</p>}
        {success && <p className="formSuccess">An email has been sent to your mail box!</p>}

        <p style={{textAlign: "center", cursor: "pointer"}} onClick={handleSubmit}>Resend Email</p>
      </form>
    </div>
  )
}
