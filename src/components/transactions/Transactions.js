import s from './Transactions.module.css'
import { useEffect, useState } from 'react'
import avatar from '../../assets/avatar.svg'
import analize from '../../assets/analize.svg'
import wallet from '../../assets/wallet.svg'
import dateFormat from "dateformat";


export default function Transactions({user, transactions, limit }) {
  const [data, setData] = useState(transactions)

  function processArray(transactions, limit) {
    if(limit) setData(transactions.slice(0, limit))
    else setData(transactions)
    console.log("limit", data)
  }


  useEffect(() => {
    processArray(transactions, limit)
  }, [transactions])


  const calculateRecipient = (user, doc) => {
    if(doc.to && doc.from !== doc.to) {
      if(user.email === doc.to) return  doc.from
      if(user.email === doc.from) return doc.to
    }

    if(doc.to && doc.from === doc.to) return doc.method

    if(!doc.to){
      if(doc.type === 'deposit') return doc.method
      if(doc.type === 'withdrawal') return 'Withdrawal'
    }
  }


  const calculateAmount = (user, doc) => {
    if(doc.to && doc.from !== doc.to) {
      if(user.email === doc.to) return  `+${doc.amount.toLocaleString('en-US')}`
      if(user.email === doc.from) return `-${doc.amount.toLocaleString('en-US')}`
    }

    if(doc.to && doc.from === doc.to && doc.method === 'toTrade') return `-${doc.amount.toLocaleString('en-US')}`
    if(doc.to && doc.from === doc.to && doc.method === 'fromTrade') return `+${doc.amount.toLocaleString('en-US')}`

    if(!doc.to && doc.type === 'deposit') return `+${doc.amount.toLocaleString('en-US')}`
    if(!doc.to && doc.type === 'withdrawal') return `-${doc.amount.toLocaleString('en-US')}`
  }


  return (
    <div className={s.ctn}>
      {data?.length > 0 && <h1>Most Recent Transactions</h1>}
      {data?.length === 0 && <h1>You Have No Transaction...</h1>}
      <div className={s.wrp}>
        {data?.map((doc, i) => 
            <div className={s.card} key={i}>
              <div style={{display: "flex", gap: "10px"}}>
                <div className={s.icon} style={doc?.type === "deposit"? {background: "#00e14011"} : {background: "#4b00e1c"}}>
                  <img src={doc?.type === "transfer"? avatar : wallet} alt='transaction icon'/>
                </div>
                
                <div className={s.left}>
                  <p className={s.type}>
                    {calculateRecipient(user, doc).length > 17? calculateRecipient(user, doc).slice(0, 15) + '...' : calculateRecipient(user, doc)}
                  </p>
                  <p className={s.date}>{dateFormat(`${doc?.date}`, "mmmm d, H:MM")}</p>
                </div>
              </div>
              <div className={s.right}>
                  <p className={s.amount}>
                    {calculateAmount(user, doc)}
                  </p>
                  <p className={s.status} style={doc?.status === 'successful'? {color: "#50fe00"} : doc?.status === 'failed'? {color: '#ff1100'} : {}}>{doc?.status}</p>
              </div>
            </div>
        )}

        {data?.length === 0 && <img className={s.analize} src={analize} alt='no transactions'/>}

      </div>
    </div>
  )
}
