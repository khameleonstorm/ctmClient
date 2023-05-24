import styles from './Converter.module.css';
import { useState } from 'react';
import { countries, country_list } from '../../utils/countries';
import btn from "../../assets/convertButton.svg";
import { MoonLoader } from 'react-spinners';

function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isConverting, setIsConverting] = useState(false);

  function hadleConvert (e){
    setIsConverting(true)
    const myHeaders = new Headers();
    myHeaders.append("apikey", "Nkn0HAvXMRtf3Yx8qhQypLTGQdOnWdHD");

    const requestOptions = {
      method: 'GET',
      headers: myHeaders
    };

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, requestOptions)
      .then(response => response.json())
      .then(data => setConvertedAmount(data.result))
      .catch(error => console.error(error));

      setIsConverting(false)
  }

  function handleFromCurrencyChange(event) {
    setFromCurrency(event.target.value);
  }

  function handleToCurrencyChange(event) {
    setToCurrency(event.target.value);
  }

  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  return (
    <form className={styles.container} onSubmit={hadleConvert}>
      {isConverting &&
      <div className={styles.loader}>
        <MoonLoader />
      </div>
      }
      <img src={btn} alt="button"  className={styles.btn} onClick={hadleConvert}/>
      <div className={styles.from}>
        <div className={styles.currency}>
          <img src={`https://flagcdn.com/72x54/${country_list[fromCurrency].toLowerCase()}.png`} alt='flag' className={styles.flag}/>

          <select value={fromCurrency} onChange={handleFromCurrencyChange}>
            {countries.map((country, i) => 
            <option key={i} value={country.currency_code}>{country.currency_code}</option>)}
          </select>
        </div>

        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>

      <div className={styles.to}>
        <h1 className={styles.amount}>{convertedAmount}</h1>

        <div className={styles.currency}>
           <select value={toCurrency} onChange={handleToCurrencyChange}>
            {countries.map((country, i) => 
            <option key={i} value={country.currency_code}>{country.currency_code}</option>)}
          </select>

          <img src={`https://flagcdn.com/72x54/${country_list[toCurrency].toLowerCase()}.png`} alt='flag' className={styles.flag}/>
        </div>
      </div>
    </form>
  );
}

export default CurrencyConverter;
