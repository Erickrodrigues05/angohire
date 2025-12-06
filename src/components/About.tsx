import { motion } from 'framer-motion';

export const About = () => {
    return (
        <section id="about" className="py-12 md:py-24 border-y border-white/5 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                            Em Angola, milhares perdem oportunidades por terem <span className="text-primary">currículos genéricos</span>.
                        </h2>
                        <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                            <p>
                                Recrutadores levam menos de 7 segundos para descartar um CV. Se o teu não se destaca, o teu talento é ignorado.
                            </p>
                            <p>
                                Na <span className="text-white font-semibold">AngoHire</span>, transformamos o teu currículo num documento profissional e convincente, estrategicamente desenhado para passar pelos filtros e chegar à mesa de quem decide.
                            </p>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <div className="pl-4 border-l-2 border-primary">
                                <h4 className="text-white font-bold">Currículos Profissionais</h4>
                                <p className="text-sm text-gray-400">Estrutura otimizada e design moderno.</p>
                            </div>
                            <div className="pl-4 border-l-2 border-primary">
                                <h4 className="text-white font-bold">Cartas de Interesse</h4>
                                <p className="text-sm text-gray-400">Persuasão que comunica motivação.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats visual element with background */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative min-h-[400px] h-auto w-full rounded-2xl overflow-hidden bg-dark-card border border-white/10 flex items-center justify-center p-6 md:p-8 text-center group"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="/stats-bg.png"
                                alt="Background"
                                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent" />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-4xl font-bold text-white mb-2">500+</h3>
                            <p className="text-primary mb-8 font-medium">Currículos Otimizados em Angola</p>

                            <h3 className="text-4xl font-bold text-white mb-2">98%</h3>
                            <p className="text-primary font-medium">Taxa de Satisfação</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
