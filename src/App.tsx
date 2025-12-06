import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { WhyUs } from "./components/WhyUs";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

function App() {
    return (
        <div className="relative min-h-screen bg-dark text-white selection:bg-primary selection:text-dark font-sans overflow-x-hidden">
            {/* Global Watermark */}
            <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                <img
                    src="/logo.png"
                    alt=""
                    className="w-[80vw] md:w-[60vw] lg:w-[40vw] object-contain grayscale"
                />
            </div>

            <Header />
            <Hero />
            <About />
            <WhyUs />
            <Pricing />
            <Testimonials />
            <FinalCTA />
            <Footer />
        </div>
    )
}

export default App
