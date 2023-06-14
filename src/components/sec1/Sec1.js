import s from './Sec1.module.css'

export default function Sec1({data, about}) {
  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <div className={s.left}>
          <h1 className={about? s.title : ''}>{data.title}</h1>
          {about && <p className={s.p}>{data.desc}</p>}
          {!about && <p>{data.text}</p>}
          {about && <h1 className={s.title2}>{data.title2}</h1>}
          {about && data.text.map((text, i) => <p key={i} className={s.p}>{text}</p>)}
        </div>
        <div className={s.right}><img className={about? s.img : ''} src={data.img} alt='stats' /></div>
      </div>
    </div>
  )
}
