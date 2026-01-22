import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            setIsScrolled(latest > 50);
        });
        return () => unsubscribe();
    }, [scrollY]);

    const navItems = [
        { name: 'Sobre', href: '#about' },
        { name: 'Serviços', href: '#services' },
        { name: 'Testemunhos', href: '#testimonials' },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
                isScrolled ? "bg-dark/80 backdrop-blur-md border-white/10" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <img
                            src="/logo.png"
                            alt="AngoHire Logo"
                            className="h-10 w-10 rounded-lg object-cover ring-2 ring-white/10"
                        />
                        <span className="text-2xl font-bold text-white tracking-tighter hidden sm:block">
                            Ango<span className="text-primary">Hire</span>
                        </span>
                        <span className="text-2xl font-bold tracking-tighter sm:hidden">
                            <span className="text-white">A</span><span className="text-primary">H</span>
                        </span>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-gray-300 hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider"
                            >
                                {item.name}
                            </a>
                        ))}
                        <a
                            href="https://chat.whatsapp.com/vagas-vip-placeholder" // Replace with real link
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-white transition-colors text-sm font-bold uppercase tracking-wider flex items-center gap-1"
                        >
                            Vagas VIP <span className="text-xs bg-primary/20 px-1.5 py-0.5 rounded text-primary border border-primary/20">Novo</span>
                        </a>
                        <a
                            href="/criar-curriculo"
                            className="bg-primary text-dark px-6 py-2 rounded-full font-bold text-sm hover:bg-primary-300 transition-transform transform hover:scale-105"
                        >
                            Começar Agora
                        </a>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="md:hidden bg-dark/95 backdrop-blur-lg border-b border-white/10"
                >
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="block px-4 py-3 text-lg font-medium text-gray-300 hover:text-primary hover:bg-white/5 rounded-lg active:bg-white/10"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <a
                            href="https://chat.whatsapp.com/vagas-vip-placeholder"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-3 text-lg font-bold text-primary hover:text-white hover:bg-white/5 rounded-lg bg-primary/5 border border-primary/20"
                            onClick={() => setIsOpen(false)}
                        >
                            🚀 Grupo de Vagas VIP
                        </a>
                        <div className="pt-4">
                            <a
                                href="/criar-curriculo"
                                className="block w-full text-center bg-primary text-dark px-6 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-transform"
                                onClick={() => setIsOpen(false)}
                            >
                                Começar Agora
                            </a>
                        </div>
                    </div>
                </motion.div>
            )}
        </header>
    );
};
