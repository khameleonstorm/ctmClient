import s from './Approval.module.css'
import { useState } from 'react'
import { BsBank2 } from 'react-icons/bs';
import { GiCardExchange } from 'react-icons/gi';
import wallet from '../../assets/wallet.svg'
import dateFormat from "dateformat";

export default function Approval({deposits, withdrawals}) {
  const [type, setType] = useState('deposit')


  return (
    <div className={s.ctn}>
      {!type && 
      <div className={s.type}>
        <div className={s.typeBtn}>
          <BsBank2 />
          <p onClick={() =>{ setType('deposit')}}>Deposits {'>>'}</p>
        </div>
        <div className={s.typeBtn}>
          <GiCardExchange />
          <p onClick={() =>{ setType('withdrawals')}}>Withdrawals {'>>'}</p>
        </div>
      </div>
      }


      {type === 'deposit' &&
        <div className={s.deposits}>
          {deposits.map((deposit, i) => 
            <div className={s.card} key={i}>
              <div style={{display: "flex", gap: "10px"}}>
                <div className={s.icon}>
                  <img src={wallet} alt='transaction icon'/>
                </div>

                <div className={s.left}>
                  <p className={s.title}>{}</p>
                  <p className={s.date}>{dateFormat(`${deposit?.date}`, "mmmm d, H:MM")}</p>
                </div>
              </div>


              <div className={s.right}>
                <p className={s.amount}>{}</p>
                <p className={s.status} style={deposit?.status === 'successful'? {color: "#50fe00"} : deposit?.status === 'failed'? {color: '#ff1100'} : {}}>{deposit?.status}</p>
              </div>
            </div>
          )}
        </div>
      }
    </div>
  )
}
