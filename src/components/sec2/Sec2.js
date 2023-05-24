import s from './Sec2.module.css'

export default function Sec2({data}) {
  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <div className={s.left}>
          <h1>{data.title}</h1>
          <p>{data.text}</p>
        </div>
        <div className={s.right}><img src={data.img} alt='stats' /></div>
      </div>
    </div>
  )
}
