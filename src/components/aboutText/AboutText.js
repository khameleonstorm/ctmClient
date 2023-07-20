import s from './AboutText.module.css'

export default function AboutText({data}) {
  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        {data.text2.map((text, i) =>
          <p className={s.txt} key={i}>{text}</p>
        )}
      </div>
    </div>
  )
}
