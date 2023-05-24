import s from './Activity.module.css'
import activity1 from '../../assets/activity1.png'
import activity2 from '../../assets/activity2.png'
import activity3 from '../../assets/activity3.png'
import { useEffect, useState } from 'react'

export default function Activity({transactions, trades, type}) {
  const [stage1, setStage1] = useState(false)
  const [stage2, setStage2] = useState(false)
  const [stage3, setStage3] = useState(false)

  const handleDeposit = () => {
    // loop through all transactions with type of deposit and add up the amounts
    let total = 0
    transactions.forEach(transaction => {
      if (transaction.type === 'deposit') total += transaction.amount
    })

    if (transactions.length === 0 || total > 0 && total < 300) setStage1(true)
    else setStage1(true)

    if (total > 300 && total < 30000) setStage2(true)
    else setStage2(true)

    if (total > 30000) setStage3(true)
  }

  const handleWithdrawal = () => {
    // loop through all transactions with type of deposit and add up the amounts
    let total = 0
    transactions.forEach(transaction => {
      if (transaction.type === 'withdrawal') total += transaction.amount
    })

    if (transactions.length === 0 || total > 0 && total < 300) setStage1(true)
    else setStage1(false)

    if (total > 300 && total < 30000) setStage2(true)
    else setStage2(false)

    if (total > 30000) setStage3(true)
  }


  const handleTrade = () => {
    // loop through all trades with type of deposit and add up the amounts
    let total = 0
    trades.forEach(trade => {
      if (trade.type === 'deposit') total += trade.amount
    })

    if (trades.length === 0 || total > 0 && total < 300) setStage1(true)
    else setStage1(false)

    if (total > 300 && total < 30000) setStage2(true)
    else setStage2(false)

    if (total > 30000) setStage3(true)
  }


  useEffect(() => {
    if (type === 'deposit') handleDeposit()
    if (type === 'withdrawal') handleWithdrawal()
    if (type === 'trade') handleTrade()
  }, [transactions, trades])



  return (
    <div className={s.ctn}>
      {stage1 && <img src={activity1} alt="activity1" />}
      {stage2 && <img src={activity2} alt="activity2" />}
      {stage3 && <img src={activity3} alt="activity3" />}
    </div>
  )
}
