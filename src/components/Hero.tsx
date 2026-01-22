import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { CVScanner } from './CVScanner';

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4">
            {/* Background with overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero-bg.png"
                    alt="Office Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/90 to-dark/70" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full pt-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full"
                    >
                        <div className="inline-flex max-w-full px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 whitespace-normal">
                            <span className="text-primary text-sm font-semibold tracking-wider uppercase text-center sm:text-left">
                                O teu futuro profissional começa aqui
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                            O teu futuro começa com o <span className="text-primary">Currículo Certo</span>.
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
                            Analise o seu currículo atual com nossa IA ou crie um novo do zero e triplique suas chances de entrevista.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
                            <a
                                href="/criar-curriculo"
                                className="inline-flex items-center justify-center px-6 py-4 text-base font-bold text-dark bg-primary rounded-lg hover:bg-primary-300 transition-colors group shadow-lg shadow-primary/20 w-full sm:w-auto whitespace-normal text-center"
                            >
                                Criar Meu Currículo
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                            </a>
                            <a
                                href="#services"
                                className="inline-flex items-center justify-center px-6 py-4 text-base font-bold text-white border border-white/20 rounded-lg hover:bg-white/5 transition-colors w-full sm:w-auto"
                            >
                                Ver Modelos
                            </a>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-primary" />
                                <span>+1.200 Currículos Criados</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-primary" />
                                <span>IA Avançada</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Scanner Section instead of abstract blob */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="relative"
                    >
                        <CVScanner />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
