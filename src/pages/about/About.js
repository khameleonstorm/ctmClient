// Import components
import Nav from '../../components/nav/Nav';
import Hero from '../../components/hero/Hero';
import Footer from '../../components/footer/Footer';
import Sec1 from '../../components/sec1/Sec1';
import { aboutText1 } from '../../utils/aboutText';
import { aboutHero } from '../../utils/heroText';
import AboutText from '../../components/aboutText/AboutText';


export default function About() {

    return (
      <>
        <Nav />
        <Hero data={aboutHero}/>
        <Sec1 data={aboutText1} about={true}/>
        <AboutText data={aboutText1}/>
        <Footer />
      </>
    )
}
