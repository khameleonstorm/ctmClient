import styles from './Login.module.css';
import Nav from '../../components/nav/Nav';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import {MdVisibilityOff, MdVisibility} from "react-icons/md"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';
import axios from 'axios';


export default function Login() {
  const user = JSON.parse(localStorage.getItem('ctm_user'))?.user
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState({
    email: null,
    password: null,
  })
  const [values, setValues] = useState({
    password: '',
    email: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setFormError({ ...formError, [prop]: null })
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  // handling login
  const handleLogin = async(e) => {
    e.preventDefault()
    const {email, password} = values;
    const data = { email, password }
    
    if(email === "" || !email.includes("@") || email.length < 1) return setFormError({...formError, email: "Email is invalid"})

    if(password.length < 1) return setFormError({...formError, password: "Invalid Password"})

    // sending data to server
    try {
      setLoading(true)
      setError(null)

      const res = await axios.post('https://ctmserver.herokuapp.com/api/users/login', { ...data })
      if(res.status === 200)  {
        const { token, user } = res.data
        window.localStorage.setItem("ctm_user", JSON.stringify({ token, user }))
        if(user.isAdmin) return navigate('/admin')
        if(!user.isVerified) return navigate(`/resend-email/${user.email}`)
        if(user.isVerified) return navigate('/dashboard')
      }
      if(res.status !== 200) setError(res.data.message)

      console.log(res)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.response?.data?.message)
    }
  }

  useEffect(() => {
    if(user?.isVerified) navigate('/')
  }, [user, navigate])


  return (
    <div className="formCtn">
      <Nav black={true}/>
      <form className="form" onSubmit={handleLogin} autoComplete="off">
        <h1>Welcome Back!</h1>
        <TextField 
        label="Email" 
        variant="outlined" 
        autoComplete='off'
        onChange={handleChange('email')}
        {...(formError.email && {error: true, helperText: formError.email})}/>

        {/* password input and event */}
        <FormControl sx={{ width: '100%'}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            autoComplete= 'new-password'
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            {...(formError.password && {error: true, helperText: formError.password})}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                {values.showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        {!loading && <button className="bigBtn full">Login</button>}
        {loading && <button disabled className="bigBtn full load"><ImSpinner9 className='spin' color="#ffffff73" size={25}/></button>}
        {error && <p className="formError">{error}</p>}
        
      <Link to="/signUp" className={styles.link}>Don't Have An Account?</Link>
      <Link to="/forgotPassword" className={styles.link2}>Forgot Password?</Link>
      </form>

    </div>
  )
}
