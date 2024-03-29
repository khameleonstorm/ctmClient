import s from './Sec1.module.css'

export default function Sec1({data, about, join}) {
  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <div className={s.left}>
          <h1 className={about? s.title : ''}>{data.title}</h1>
          {about && <p className={s.p}>{data.desc}</p>}
          {!about && <p>{data.text}</p>}
          {(!about && join) && <a href='https://t.me/ctmpro' ><button className="heroBtn">Join Our Community</button></a>}
          {about && <p className={s.p}>{data.text}</p>}
        </div>
        <div className={s.right}><img className={about? s.img : ''} src={data.img} alt='stats' /></div>
      </div>
    </div>
  )
}
