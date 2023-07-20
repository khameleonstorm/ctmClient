import s from './Sec3.module.css'

export default function Sec3({data, mail}) {
  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <div className={s.left}><img src={data.img} alt='stats'/></div>
        <div className={s.right}>
          <h1>{data.title}</h1>
          <p>{data.text}</p>
          {mail && 
          <div className={s.mail}>
            <a href="mailto:info@ctmpro.co.uk">hello@ctmpro.co</a>
            <a href="mailto:info@ctmpro.co.uk">Support@ctmpro.co</a>
          </div>
          }
        </div>
      </div>
    </div>
  )
}
