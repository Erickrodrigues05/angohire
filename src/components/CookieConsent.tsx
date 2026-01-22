import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('angohire-cookie-consent');
        if (!consent) {
            // Small delay to not annoy immediately
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('angohire-cookie-consent', 'accepted');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4"
                >
                    <div className="max-w-4xl mx-auto bg-dark/95 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 shadow-2xl flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                        <div className="flex-1">
                            <h4 className="font-bold text-white mb-1">🍪 Política de Cookies</h4>
                            <p className="text-sm text-gray-400">
                                Utilizamos cookies e tecnologias semelhantes para personalizar anúncios e conteúdo (Google AdSense), e analisar nosso tráfego. Ao continuar, você concorda com nossa política de privacidade.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleAccept}
                                className="px-6 py-2 bg-primary text-dark font-bold rounded-lg hover:bg-primary-300 transition-colors text-sm whitespace-nowrap"
                            >
                                Aceitar Tudo
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
