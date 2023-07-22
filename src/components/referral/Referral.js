import s from './Referral.module.css'

export default function Referral({user}) {
  
  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(`https://ctmpro.co/signUp/${textToCopy}`);
      alert('Text copied to clipboard');
    } catch (err) {
      console.log('Failed to copy text: ', err);
    }
  };


if(!user.idVerified){
  return (
    <div className={s.ctn}>
      <p className='formWarning'>Your Account is not yet verified, verify your account and start referring friends to earn more bonus</p>
    </div>
  )
}

if(user.idVerified){
  return (
    <div className={s.ctn}>
      <p className='formSuccess' onClick={() => handleCopy(user.username)}>You can now invite friends to CtmPro and start earning $0.5 when your friends deposit and trade up to $10, Click this text to copy referral code or click the button above.</p>
    </div>
  )
}
}
