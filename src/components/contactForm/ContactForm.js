import { TextField } from '@mui/material'
import s from './ContactForm.module.css'
import { ImSpinner9 } from 'react-icons/im';
import { useState } from 'react';

export default function ContactForm() {
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  const handleContact = (e) => {
    e.preventDefault()
  }


  return (
    <div className='formCtn'>
      <form className="form" onSubmit={handleContact} autoComplete="off" >
        <h1>Contact Us!</h1>
        <TextField 
        label="Full Name" 
        variant="outlined" 
        autoComplete='off'
        onChange={(e) => setFullName(e.target.value)}/>

        <TextField 
        label="Email" 
        variant="outlined" 
        autoComplete='off'
        onChange={(e) => setEmail(e.target.value)} />

        <TextField 
        label="Message" 
        variant="outlined" 
        multiline rows={4} 
        onChange={(e) => setMessage(e.target.value)}/>


        
      {error && <p className="formError">{error}</p>}
      {success && <p className="formSuccess">{success}</p>}
      {!loading && <button className="bigBtn full">Send Message  {'>>'}</button>}
      {loading && <button disabled className="bigBtn full load"><ImSpinner9 className='spin' color="#ffffff73" size={25}/></button>}
      </form>

    </div>
  )
}
