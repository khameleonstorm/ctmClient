import styles from './ForgotPassword.module.css';
import Nav from '../../components/nav/Nav';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import { ImSpinner9 } from 'react-icons/im';
import axios from 'axios';

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { page } = useParams();

  // handling reset
  const handleReset = async(e) => {
    e.preventDefault()

    if(email === "" || !email.includes("@") || email.length < 5) return setError('Email is invalid');

    // sending data to server
    try {
      setLoading(true)
      setError(null)

      const res = await axios.post('https://ctmserver.herokuapp.com/api/users/reset-password', { email })
      if(res.status === 200) {
        setLoading(false)
        setSuccess("Check your email for a reset link")
      }
      else {
        setLoading(false)
        setError("Invalid Credentials")
      }
    } catch (error) {
      setLoading(false)
      setError("Invalid Credentials")
    }
  }



  // handling new password
  const handleNewPassword = async(e) => {
    e.preventDefault()

    if(email === "" || !email.includes("@") || email.length < 5) return setError('Email is invalid');
    if(newPassword === "" || newPassword.length < 5) return setError('password is invalid');

    // sending data to server
    try {
      setLoading(true)
      setError(null)

      const res = await axios.post('https://ctmserver.herokuapp.com/api/users/new-password', { email, newPassword })
      if(res.status === 200) {
        setLoading(false)
        setSuccess("Password Changed Successfully, Login to continue")
      }
      else {
        setLoading(false)
        setError("Invalid Credentials")
      }
    } catch (error) {
      setLoading(false)
      setError("Invalid Credentials")
    }
  }


  return (
    <div className="formCtn">
      <Nav black={true}/>
      {page === 'newPassword' ? 
          <form className="form" onSubmit={handleNewPassword}>
            <h1 style={{fontSize: "1.5rem"}}>Enter Email & New Password!</h1>  
            <TextField value={email} id="email" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>       
            <TextField value={newPassword} id="password" label="Password" variant="outlined" onChange={(e) => setNewPassword(e.target.value)}/>

            {!loading && <button className="bigBtn full">Reset</button>}
            {loading && <button disabled className="bigBtn full load"><ImSpinner9 className='spin' color="#ffffff73" size={25}/></button>}
            {error && <p className="formError">{error}</p>} 
            {success && <p className="formSuccess">{success}</p>}        
            <Link to="/login" className={styles.link}>Back to Login?</Link>
        </form>

      :<form className="form" onSubmit={handleReset}>
        <h1>Reset Password</h1>
        <TextField id="email" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>


        {!loading && <button className="bigBtn full">Send Mail</button>}
        {loading && <button disabled className="bigBtn full load"><ImSpinner9 className='spin' color="#ffffff73" size={25}/></button>}
        {error && <p className="formError">{error}</p>}
        {success && <p className="formSuccess">{success}</p>}       
        <Link to="/login" className={styles.link}>Back to Login?</Link>
    </form>
      }

    </div>
  )
}
