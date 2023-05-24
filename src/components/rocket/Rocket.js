import s from './Rocket.module.css'
import rocket from '../../assets/rocket.svg'

export default function Rocket() {
  return (
    <div className={s.ctn}>
      <p>To The Moon!!!</p>
      <img src={rocket} alt="rocket"/>
    </div>
  )
}