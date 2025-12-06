import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: "Vanessa T.",
        location: "Luanda",
        text: "Depois de refazer o meu currículo com a AngoHire, fui chamada para 3 entrevistas na mesma semana. O design fez toda a diferença!",
        rating: 5
    },
    {
        name: "Osvaldo M.",
        location: "Talatona",
        text: "Finalmente um serviço que entende o que os recrutadores angolanos procuram. Super profissional e entrega rápida.",
        rating: 5
    },
    {
        name: "Cláudia F.",
        location: "Benguela",
        text: "O meu currículo ficou incrível! Senti-me confiante ao candidatar-me às vagas e consegui o emprego que queria.",
        rating: 5
    }
];

export const Testimonials = () => {
    return (
        <section id="testimonials" className="py-12 md:py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        O que dizem os nossos <span className="text-primary">Clientes</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Histórias reais de transformação profissional em Angola.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-dark-card p-8 rounded-2xl border border-white/5 relative"
                        >
                            <Quote className="absolute top-8 right-8 text-primary/20 w-10 h-10" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-primary fill-current" />
                                ))}
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                                "{t.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-dark font-bold text-lg">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{t.name}</h4>
                                    <p className="text-gray-500 text-sm">{t.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
