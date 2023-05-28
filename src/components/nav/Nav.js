import { NavLink, Link } from "react-router-dom"
import styles from "./Nav.module.css"
import { useEffect, useState } from "react"
import logo from "../../assets/logo.png"

export default function Nav({black}) {
  const user = JSON.parse(localStorage.getItem('ctm_user'))?.user
  const [navbg, setNavbg] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const handleClick = () => {
      setShowMenu(!showMenu)
      console.log(showMenu)
  }

  const handleNavbg = () => {
    if (window.scrollY >=  80) {
      setNavbg(true)  
    } else {
      setNavbg(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleNavbg)
  }, [])

  return (
    <nav className={navbg? styles.container2 : styles.container}>
      <div className={styles.wrapper}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="logo"/>
        </Link>

        {!(black) &&
          <div className={styles.menu}  style={showMenu ? {right:  "0"} : {right:  '-100%'}} onClick={handleClick}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          {!user?.isVerified &&
          <>
            <Link className={styles.getStarted} to="/signUp">Sign up</Link>
            <Link className={styles.login} to="/login">Login</Link>
          </>
          }

          {user?.isVerified && <Link className={styles.getStarted} to="/dashboard">Dashboard</Link>}
          </div>
          }

        <div className={styles.hamburger} onClick={handleClick}>
            <span 
            className={showMenu ? styles.activeBar : styles.bar}
            style={navbg?{background: "black"}: {background: ""}}
            ></span>
            <span 
            className={showMenu ? styles.activeBar : styles.bar}
            style={navbg?{background: "black"}: {background: ""}}
            ></span>
            <span 
            className={showMenu ? styles.activeBar : styles.bar}
            style={navbg?{background: "black"}: {background: ""}}
            ></span>
        </div>
      </div>
    </nav>
  )
}
