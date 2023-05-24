import s from './Sec3.module.css'

export default function Sec3({data}) {
  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <div className={s.left}><img src={data.img} alt='stats' /></div>
        <div className={s.right}>
          <h1>{data.title}</h1>
          <p>{data.text}</p>
        </div>
      </div>
    </div>
  )
}
