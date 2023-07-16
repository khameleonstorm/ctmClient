import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import s from './Verify.module.css';
import { SiGmail } from 'react-icons/si';

const Verify = () => {
  const [verified, setVerified] = useState(false);
  let { email } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/users/verify`, { email })
      .then(res => {
        if(res.status === 200) {
          setVerified(true)
          setTimeout(() => navigate('/login'), 5000);
        }
      })
      .catch(err => console.log(err));
  }, [email]);

  return (verified &&
    <div className={s.ctn}>
        <div className={s.wrapper}>
          <SiGmail size="4rem" color='#00b35f'/>
          <h1 className={s.success}>User Verified!</h1>
        </div>
    </div>
  );
};

export default Verify;









// const handleResend = () => {
//   const { id } = match.params;
//   axios.post('/api/users/resend', { id })
//     .then(res => {
//       if (res.data.success) {
//         setShowResend(false);
//       } else {
//         console.log(res.data.message);
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }
