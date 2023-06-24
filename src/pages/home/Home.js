// import { MoonLoader } from 'react-spinners';

// Import components
import Nav from '../../components/nav/Nav';
import Hero from '../../components/hero/Hero';
import Footer from '../../components/footer/Footer';
import Sec1 from '../../components/sec1/Sec1';
import { secText1, secText2, secText3, secText4, secText5 } from '../../utils/secText';
import Sec2 from '../../components/sec2/Sec2';
import Sec3 from '../../components/sec3/Sec3';
import { homeHero } from '../../utils/heroText';







export default function Home() {

    // return (
    //   <div className={styles.spinnerContainer}>
    //     <div className={styles.spinner}>
    //       <MoonLoader color="#1649ff" />
    //     </div>
    //   </div>
    // )

    return (
      <>
        <Nav />
        <Hero data={homeHero}/>
        <Sec1 data={secText1} join={true}/>
        <Sec3 data={secText5}/>
        <Sec2 data={secText2} />
        <Sec3 data={secText3} />
        <Sec1 data={secText4} />
        <Footer />
      </>
    )
}
