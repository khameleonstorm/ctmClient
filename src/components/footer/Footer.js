import { Link } from 'react-router-dom';
import s from './Footer.module.css';
import logo from '../../assets/logo.png'


export default function Footer() {
  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <div className={s.address}>
          {/* <img src={logo} alt='CTM logo'/> */}
          <h2>Email</h2>
          <a href="mailto:info@ctmpro.co.uk">info@ctmpro.co.uk</a>
        </div>
        <div className={s.links}>
          <h2>Useful Links</h2>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
        </div>
        <div className={s.services}>
          <h2>Services</h2>
          <Link to="/dashnoard/trading">Trading</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      <div className={s.copyright}>
        <p>© 2023 CTM Pro. All rights reserved.</p>
      </div>
    </div>
  )
}
