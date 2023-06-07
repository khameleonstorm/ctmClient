import styles from './SignUp.module.css';
import Nav from '../../components/nav/Nav';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import {MdVisibilityOff, MdVisibility} from "react-icons/md"
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { countries } from '../../utils/countries';
import { ImSpinner9 } from 'react-icons/im';
import axios from 'axios';


export default function SignUp() {
  const user = JSON.parse(localStorage.getItem('ctm_user'))?.user
  const form = useRef();
  const navigate = useNavigate()
  const { ref } = useParams();
  const [referredBy, setReferredBy] = useState(ref || "")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({ fullName: "", username: "", email: "", phone: "", country: "", showPassword: false,});

  const [formError, setFormError] = useState({ fullName: null, username: null, email: null, phone: null, country: null, referredBy: null,})


  // handling change for input fields
  const handleChange = (prop) => (event) => {
    if (prop === "referredBy") setReferredBy(event.target.value)
    setValues({ ...values, [prop]: event.target.value });
    setFormError({ ...formError, [prop]: null })
  };

  // handling password toggle mode
  const passwordVisibility = () => setValues({...values, showPassword: !values.showPassword })

  // handling mouse event 
  const handleMouseDownPassword = (event) => event.preventDefault()


  // handling form submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    const {fullName, username, email, phone, country} = values;
    const data = {...values, password, showPassword: undefined, referredBy}
    return console.log(data)

    // validating form
    if(fullName === "" || fullName.length < 3) return setFormError({...formError, fullName: "FullName is too short or invalid"});

    if(username === "" || username.length < 3) return setFormError({...formError, username: "Username is too short or invalid"});

    if(email === "" || !email.includes("@") || email.length < 5) return setFormError({...formError, email: "Email is invalid"});

    if(phone === "" || phone.length < 5) return setFormError({...formError, phone: "Phone Number is invalid"});

    if(country === "") return setFormError({...formError, country: "Select Your Country"});

    if(referredBy.length > 20) return setFormError({...formError, referredBy: "ReferredBy or invalid"});

    if(password === "" || password.length < 6) return setFormError({...formError, password: "Password is too short or invalid"});

    // sending data to server
    try {
      setLoading(true)
      setError(null)
      
      const res = await axios.post('https://ctmserver.herokuapp.com/api/users/signup', { ...data })
      if(res.status === 200)  navigate('/login')
      if(res.status !== 200) setError(res.data.message)
      
      console.log(res)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.response?.data.message)
      console.log("Catched Error", error.response?.data)
    }
  };


  useEffect(() => {
    if(user?.isVerified) navigate('/dashboard')
  }, [user, navigate]);


  return (
    <div className="formCtn">
      <Nav black={true}/>
      <form className="form" onSubmit={handleSubmit} ref={form}>
        <h1>Sign Up</h1>
        <TextField 
          id="full_name" 
          label="Full Name" 
          variant="outlined" 
          name="fullName"
          type="text" 
          {...(formError.fullName && {error: true, helperText: formError.fullName})}
          autoComplete='off'
          onChange={handleChange("fullName")}/>

        <TextField 
          id="username" 
          label="Username" 
          variant="outlined" 
          type="text" 
          autoComplete='off'
          {...(formError.username && {error: true, helperText: formError.username})}
          onChange={handleChange("username")}/>

        <TextField 
          id="email" 
          label="Email" 
          variant="outlined" 
          name='email'
          type="email" 
          autoComplete='off'
          {...(formError.email && {error: true, helperText: formError.email})}
          onChange={handleChange("email")}/>

        <TextField 
          id="phone" 
          label="Phone" 
          variant="outlined" 
          name='phone'
          type="tel" 
          autoComplete='off'
          {...(formError.phone && {error: true, helperText: formError.phone})}
          onChange={handleChange("phone")}/>

        <FormControl fullWidth>
        <InputLabel id="country">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="country"
          value={values.country}
          label="Country"
          {...(formError.country && {error: true})}
          onChange={handleChange('country')}>
          {countries.map((country, i) => <MenuItem key={i} value={country.country}>{country.country}</MenuItem>)}
        </Select>
        </FormControl>

        {/* password input and event */}
        <FormControl sx={{ width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            inputProps={{ autoComplete: 'new-password' }}
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={password}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            {...(formError.password && {error: true, helperText: formError.password})}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={passwordVisibility} onMouseDown={handleMouseDownPassword} edge="end">
                {values.showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <TextField 
          id="referredBy_code" 
          label="referredBy Code(Optional)" 
          variant="outlined" 
          value={referredBy}
          onChange={handleChange("referredBy")}/>

        <div className={styles.checkbox}>
          <input type="checkbox"/>
          <p>I agree to the <Link to="#">Terms and Condition</Link></p>
        </div>

        {!loading && <button className="bigBtn full">Sign up</button>}
        {loading && <button disabled className="bigBtn full load"><ImSpinner9 className='spin' color="#ffffff73" size={25}/> </button>}
        {error && <p className="formError">{error}</p>}
        
        <Link to="/login" className={styles.link}>Already have an account? <span>Login</span></Link>
      </form>

    </div>
  );
}
