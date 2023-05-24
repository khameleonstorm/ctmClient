import s from './Bot.module.css'
import bot from '../../assets/greenBot.svg'
import logo from '../../assets/logo.png'

export default function Bot() {
  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <div className={s.images}>
          <img src={bot} alt='CTM Robots' className={s.bot1}/>
          <img src={logo} alt='CTM logo' className={s.logo}/>
          <img src={bot} alt='CTM Robots' className={s.bot1}/>
        </div>
        <h1>Crypto Flipping Bots</h1>
      </div>
    </div>
  )
}
