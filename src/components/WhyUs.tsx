import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, UserCheck } from 'lucide-react';

export const WhyUs = () => {
    const reasons = [
        {
            title: "Mais Entrevistas",
            description: "Currículos otimizados aumentam as tuas chances de ser chamado para entrevistas em até 3x.",
            icon: <TrendingUp className="w-8 h-8 text-primary" />
        },
        {
            title: "Design Profissional",
            description: "Cada currículo é criado com estrutura de impacto, clareza visual e hierarquia perfeita.",
            icon: <CheckCircle2 className="w-8 h-8 text-primary" />
        },
        {
            title: "Feito para Angola",
            description: "Adaptado 100% à realidade e formato que as empresas e recrutadores em Angola valorizam.",
            icon: <UserCheck className="w-8 h-8 text-primary" />
        }
    ];

    return (
        <section className="py-12 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-dark to-dark" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6"
                    >
                        Porquê escolher a <span className="text-primary">AngoHire</span>?
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Não entregamos apenas um documento. Entregamos uma ferramenta de vendas da tua carreira.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors group"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                {reason.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{reason.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {reason.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
