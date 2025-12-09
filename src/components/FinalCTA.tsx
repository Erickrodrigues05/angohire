import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const FinalCTA = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20mix-blend-overlay" />

            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-dark to-dark-card border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl shadow-primary/10"
                >
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                        O Teu Momento é Agora
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        A próxima chamada pode ser <br />
                        <span className="text-primary">o teu novo emprego.</span>
                    </h2>
                    <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
                        Não deixes que um currículo mal feito te impeça de alcançar os teus sonhos. Investe agora 5.500 Kz na tua carreira.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="/criar-curriculo"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-dark bg-primary rounded-xl hover:bg-primary-300 transition-all hover:scale-105 shadow-lg shadow-primary/25"
                        >
                            <MessageCircle className="mr-2 w-5 h-5" />
                            Começar Agora
                        </a>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400">
                        <span>🚀 Entrega em 48h</span>
                        <span>⭐ 100% Satisfação</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
