import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import About from './components/About'
import WhyUs from './components/WhyUs'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative bg-void min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <About />
      <WhyUs />
      <CTA />
      <Contact />
      <Footer />
    </div>
  )
}
