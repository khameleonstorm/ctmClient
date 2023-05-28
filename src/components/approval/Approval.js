import s from './Approval.module.css'
import { useState } from 'react'
import { BsBank2 } from 'react-icons/bs';
import { GiCardExchange } from 'react-icons/gi';
import wallet from '../../assets/wallet.svg'
import dateFormat from "dateformat";
import { ImSpinner8 } from 'react-icons/im';

export default function Approval({deposits, withdrawals}) {
  const [type, setType] = useState('deposit')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showModal, setShowModal] = useState(false)


  const handleApproval  = async (id) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const response = await fetch(`https://ctmserver.herokuapp.com/api/${type}s/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({from: data.from, amount: data.amount, status: 'successful'})
      })
      const data2 = await response.json()
      if (!response.ok) throw new Error(data2.message)
      if (response.ok) setSuccess(data2.message)
    } catch (error) { setError(error.message) }
    setLoading(false)
  }


  const handleModal = (doc) => {
    setShowModal(!showModal)

    if (doc) {
      setData(doc)
    }
  }

  const closeModal = () => {
    setShowModal(!showModal)
    setData(null)
  }



    
  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('Text copied to clipboard');
    } catch (err) {
      console.log('Failed to copy text: ', err);
    }
  };


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
          <p className={s.back} onClick={() => setType('')}>{`<<`} Back</p>
          {deposits.map((deposit, i) => 
            <div className={s.card} key={i} onClick={() => handleModal(deposit)}>
              <div style={{display: "flex", gap: "10px"}}>
                <div className={s.icon}>
                  <img src={wallet} alt='transaction icon'/>
                </div>

                <div className={s.left}>
                  <p className={s.title}>{deposit.from.length > 17 ? deposit.from.slice(0, 15) + '...' : deposit.form}</p>
                  <p className={s.date}>{dateFormat(`${deposit?.date}`, "mmmm d, H:MM")}</p>
                </div>
              </div>


              <div className={s.right}>
                <p className={s.amount}>{deposit.amount.toLocaleString('en-US')}</p>
                <p className={s.status} style={deposit?.status === 'successful'? {color: "#50fe00"} : deposit?.status === 'failed'? {color: '#ff1100'} : {}}>{deposit?.status}</p>
              </div>
            </div>
          )}
        </div>
      }


      {type === 'withdrawals' &&
        <div className={s.withdrawals}>
          <p className={s.back} onClick={() => setType('')}>{`<<`} Back</p>
          {withdrawals.map((withdrawal, i) =>
          <div className={s.card} key={i}>
            <div style={{display: "flex", gap: "10px"}}>
              <div className={s.icon}>
                <img src={wallet} alt='transaction icon'/>
              </div>

              <div className={s.left}>
                <p className={s.title}>{withdrawal.from.length > 17 ? withdrawal.from.slice(0, 15) + '...' : withdrawal.form}</p>
                <p className={s.date}>{dateFormat(`${withdrawal?.date}`, "mmmm d, H:MM")}</p>
              </div>
            </div>


            <div className={s.right}>
              <p className={s.amount}>{withdrawal.amount.toLocaleString('en-US')}</p>
              <p className={s.status} style={withdrawal?.status === 'successful'? {color: "#50fe00"} : withdrawal?.status === 'failed'? {color: '#ff1100'} : {}}>{withdrawal?.status}</p>
            </div>
          </div>
          )}
        </div>
          }


          {showModal && type === 'deposit' &&
            <div className='modalCtn'>
              <div className='modalWrp'>
              <p className='modalTitle'>Deposit Approval</p>
              <input value={data.from} className='modalInput' readOnly/>
              <input value={data.method} className='modalInput' readOnly/>
              <input value={data.amount} className='modalInput' readOnly/>
              <p style={{fontSize: '.6rem', textAlign: 'center', width: '100%', padding:'10px'}}>Click the input below to copy hash</p>
              <input onClick={() => handleCopy(data.hash)} value={data.hash} className='modalInput'  readOnly/>
              <input value={data.date} className='modalInput'  readOnly/>
              <p className='cancel' onClick={closeModal}><span>Cancel</span></p>
              <p className='modalBtn' onClick={() => handleApproval(data._id)}>{!loading && <span>Approve</span>} {loading && <span><ImSpinner8 className='spin'/></span>}</p>
              {error && <p className='formError'>{error}</p>}
              {success && <p className='formSuccess'>{success}</p>}
              </div>
            </div>
          }


          {showModal && type === 'withdrawal' &&
            <div className='modalCtn'>
              <div className='modalWrp'>
              <p className='modalTitle'>Withdrawal Approval</p>
              <input value={data.from} className='modalInput' readOnly/>
              <input value={data.method} className='modalInput' readOnly/>
              <input value={data.amount} className='modalInput' readOnly/>
              <p style={{fontSize: '.6rem', textAlign: 'center', width: '100%', padding:'10px'}}>Click the input below to copy wallet</p>
              <input onClick={() => handleCopy(data.wallet)} value={data.wallet} className='modalInput'  readOnly/>
              <input value={data.date} className='modalInput'  readOnly/>
              <p className='cancel' onClick={closeModal}><span>Cancel</span></p>
              <p className='modalBtn' onClick={() => handleApproval(data._id)}>{!loading && <span>Approve</span>} {loading && <span><ImSpinner8 className='spin'/></span>}</p>
              {error && <p className='formError'>{error}</p>}
              {success && <p className='formSuccess'>{success}</p>}
              </div>
            </div>
          }
    </div>
  )
}
