import s from './ReferralForm.module.css'
import { ImSpinner9 } from 'react-icons/im';
import { useState } from 'react';

export default function ReferralForm() {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [isInfluencer, setIsInfluencer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  const handleContact = (e) => {
    e.preventDefault()
  }


  return (
    <div className='formCtn' style={{marginTop: "-100px"}}>
      <form className="form" onSubmit={handleContact} autoComplete="off">
        <h2>Affiliate Request!</h2>
        <input 
        className={s.input}
        value={fullName}
        type='name'
        placeholder="Full Name" 
        onChange={(e) => setFullName(e.target.value)}/>

        <input 
        className={s.input}
        value={dob}
        type='date'
        onChange={(e) => setDob(e.target.value)}/>

        <input 
        className={s.input}
        value={country}
        type="Country" 
        placeholder='Country'
        onChange={(e) => setCountry(e.target.value)} />

        <input 
        className={s.input}
        value={state}
        type="text" 
        placeholder='State'
        onChange={(e) => setState(e.target.value)}/>


      <div className={s.checkbox}>
          <input type="checkbox" onChange={(e) => setIsInfluencer(e.target.value)}/>
          <p>Are you a social media influencer</p>
      </div>
        
      {error && <p className="formError">{error}</p>}
      {success && <p className="formSuccess">{success}</p>}
      {!loading && <button className="bigBtn full">Send  {'>>'}</button>}
      {loading && <button disabled className="bigBtn full load"><ImSpinner9 className='spin' color="#ffffff73" size={25}/></button>}
      </form>

    </div>
  )
}
