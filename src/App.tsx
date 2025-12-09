import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { WhyUs } from "./components/WhyUs";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { CreateResume } from "./pages/CreateResume";
import { AdminDashboard } from "./pages/AdminDashboard";
import { PaymentPage } from "./pages/PaymentPage";

function HomePage() {
    return (
        <>
            <Header />
            <Hero />
            <About />
            <WhyUs />
            <Pricing />
            <Testimonials />
            <FinalCTA />
            <Footer />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <div className="relative min-h-screen bg-dark text-white selection:bg-primary selection:text-dark font-sans overflow-x-hidden">
                {/* Global Watermark */}
                <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                    <img
                        src="/logo.png"
                        alt=""
                        className="w-[80vw] md:w-[60vw] lg:w-[40vw] object-contain grayscale"
                    />
                </div>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/criar-curriculo" element={<CreateResume />} />
                    <Route path="/pagamento/:orderId" element={<PaymentPage />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
