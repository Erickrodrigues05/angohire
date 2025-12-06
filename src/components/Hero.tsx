import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background with overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero-bg.png"
                    alt="Office Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/80 to-dark/40" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 md:pt-32">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full max-w-[100vw]"
                    >
                        <div className="inline-flex max-w-full px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 whitespace-normal">
                            <span className="text-primary text-sm font-semibold tracking-wider uppercase text-center sm:text-left">
                                O teu futuro profissional começa aqui
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 break-words">
                            O teu futuro profissional começa com o <span className="text-primary">Currículo Certo</span>.
                        </h1>

                        <p className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
                            Transforma a tua imagem profissional com um currículo que impressiona recrutadores e abre portas para novas oportunidades.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <a
                                href="https://wa.me/+244945625060?text=Ol%C3%A1!%20Gostaria%20de%20criar%20o%20meu%20curr%C3%ADculo%20profissional%20com%20a%20AngoHire."
                                className="inline-flex items-center justify-center px-6 py-4 text-base font-bold text-dark bg-primary rounded-lg hover:bg-primary-300 transition-colors group shadow-lg shadow-primary/20 w-full sm:w-auto whitespace-normal text-center"
                            >
                                Criar Meu Currículo Agora
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                            </a>
                            <a
                                href="#services"
                                className="inline-flex items-center justify-center px-6 py-4 text-base font-bold text-white border border-white/20 rounded-lg hover:bg-white/5 transition-colors w-full sm:w-auto"
                            >
                                Ver Exemplos
                            </a>
                        </div>

                        <div className="mt-12 flex items-center gap-8 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-primary" />
                                <span>Entrega em 24h</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-primary" />
                                <span>98% Satisfação</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="hidden md:block relative"
                    >
                        {/* Abstract visual or could be a floating CV mockup later */}
                        <div className="relative w-full aspect-square rounded-full bg-gradient-to-tr from-primary/20 to-transparent blur-3xl opacity-30 animate-pulse" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
