import s from './AdminCard.module.css'
import logo from '../../assets/logo.svg'

export default function AdminCards({title, value, icon}) {
  return (
    <div className={s.card}>
      <div className={s.title}>
        <p>{title}</p>
        <img src={logo} alt="CTM LOGO" />
      </div>
      <div className={s.value}>
        <h2>{value}</h2>
        <div className={s.icon}> {icon} </div>
      </div>
    </div>
  )
}
