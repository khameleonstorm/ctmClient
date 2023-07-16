import styles from './UsdChart.module.css';
import { useEffect } from 'react';

export default function UsdChart() {

  useEffect(() => {
    const script = document.createElement('script')
    const chartDiv = document.getElementById('cryptochart')
    
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js"
    script.type = 'text/javascript'
    script.async = true
    
    const loadscript = {
      "symbol": "BINANCEUS:USDTUSD",
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "dateRange": "1D",
      "colorTheme": "light",
      "isTransparent": true,
      "autosize": true,
      "largeChartUrl": ""
    }
    
    script.innerHTML = JSON.stringify(loadscript)
    chartDiv.appendChild(script)
  }, [])



  return (
    <div className={styles.container}>
      <div className={`${styles.tvcontainer} tradingview-widget-container__widget`} id="cryptochart">
      </div>
    </div>
  )
}



