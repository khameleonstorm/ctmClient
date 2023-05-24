import { useEffect, useState } from 'react';
import s from './TradeCounter.module.css';
import { io } from 'socket.io-client';
import dateFormat from 'dateformat';

export default function TradeCounter({ user }) {
  const [trades, setTrades] = useState(null);

  useEffect(() => {
    // Establish a socket.io connection
    const socket = io(`https://ctmserver.herokuapp.com/`);

    // Listen for the 'tradeProgressUpdated' event
    socket.on('tradeProgressUpdated', () => fetchTrades());

    return () => { socket.disconnect() };
  }, []);



  const fetchTrades = async () => {
    try {
      const response = await fetch(`https://ctmserver.herokuapp.com/api/trades/user/${user.email}`);
      const data = await response.json();
      if (data) setTrades(data);
    } catch (error) {
      console.error('Error fetching trades:', error);
    }
  };

  useEffect(() => { fetchTrades()}, []);

  return ((trades && trades.length > 0) &&
    <div className={s.ctn}>
      {trades.map((trade) => (
        <div className={s.card} key={trade._id}>
          <div className={s.text}>
            <p className={s.start}>{dateFormat(`${trade.startDate}`, "mmmm d, H:MM")}</p>
            <p className={s.amount}>${trade.amount}</p>
            <p className={s.end}>{dateFormat(`${trade.endDate}`, "mmmm d, H:MM")}</p>
          </div>

          <div className={s.barWrp}>
            <div style={{ backgroundColor: '#f5f2fd', height: '9px', borderRadius: '15px', width: '100%'}}>
            <div style={{ height: '100%', borderRadius: '15px', width: `${(trade.progress / 1440) * 100}%`}} className={s.bar}/>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
}




