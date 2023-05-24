import s from './Hero.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Hero({data}) {
  const user = JSON.parse(localStorage.getItem('ctm_user'))?.user
  const navigate = useNavigate();
  const [scrollAnim, setScrollAnim] = useState(false);

  const handleNavigate = (e) => {
    navigate(`${e}`);
  }

  
  const handleNavbg = () => {
    if (window.scrollY >=  200) {
      setScrollAnim(true)  
    } else {
      setScrollAnim(false)
    }
  }

  
  useEffect(() => {
    window.addEventListener("scroll", handleNavbg)
  }, [])

  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <div className={s.left}>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
          {!user && <button className="heroBtn" onClick={() => handleNavigate('login')}>Get Started </button>}
          {user && <button className="heroBtn" onClick={() => handleNavigate('dashboard')}>Dashboard </button>}
        </div>
        <div className={s.right}><img className={scrollAnim? s.scroll : null} src={data.image} alt={data.title} /></div>
      </div>
    </div>
  )
}
