import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { FileText, PenTool, Send, CheckCircle2 } from "lucide-react";

export const Pricing = () => {
    const plans = [
        {
            title: "Currículo Básico",
            price: "Grátis",
            originalPrice: "2.000 Kz",
            popular: false,
            description: "Ideal para quem está a começar e precisa de um currículo simples e funcional.",
            features: [
                "Modelo Simples e Limpo",
                "Estrutura Padrão",
                "Formato PDF",
                "Entrega Imediata",
                "Sem Revisão Gramatical"
            ],
            buttonText: "Criar Grátis",
            icon: <FileText className="w-8 h-8 text-gray-400" />,
            id: "basic"
        },
        {
            title: "Currículo Padrão",
            price: "2.790 Kz",
            originalPrice: "4.000 Kz",
            popular: true,
            description: "A escolha equilibrada para quem quer destacar-se com um design melhorado.",
            features: [
                "Design Moderno",
                "Estrutura Otimizada",
                "Destaque de Competências",
                "Formato PDF de Alta Qualidade",
                "Entrega em 24 horas"
            ],
            buttonText: "Escolher Padrão",
            icon: <FileText className="w-8 h-8 text-white" />,
            id: "standard"
        },
        {
            title: "Currículo Profissional",
            price: "5.500 Kz",
            originalPrice: "7.000 Kz",
            popular: false,
            description: "O currículo de elite para quem quer garantir as melhores oportunidades.",
            features: [
                "Design Premium Executivo",
                "Estrutura Otimizada para ATS",
                "Revisão Gramatical Completa",
                "Consultoria Rápida de Perfil",
                "Entrega Prioritária"
            ],
            buttonText: "Ser Profissional",
            icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
            id: "professional"
        },
        {
            title: "Carta de Interesse",
            price: "3.500 Kz",
            originalPrice: "5.000 Kz",
            popular: false,
            description: "Carta feita à medida, que mostra a tua motivação e aumenta as tuas hipóteses.",
            features: [
                "Texto persuasivo e personalizado",
                "Adaptada à vaga específica",
                "Destaca as tuas competências",
                "Formato profissional",
                "Entrega em 24 horas"
            ],
            buttonText: "Pedir Carta",
            icon: <PenTool className="w-8 h-8 text-primary" />,
            id: "cover-letter"
        }
    ];

    return (
        <section id="services" className="py-12 md:py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Investe no Teu <span className="text-primary">Futuro</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Preços promocionais de lançamento. Escolhe o plano ideal e destaca-te no mercado.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {plans.map((plan, index) => (
                        <CardContainer key={index} className="inter-var w-full h-full">
                            <CardBody className={`relative group/card w-full h-full rounded-2xl p-6 border transition-colors flex flex-col ${plan.popular ? 'bg-gradient-to-b from-primary/10 to-dark border-primary/50 shadow-2xl shadow-primary/10' : 'bg-dark-card border-white/10 hover:border-primary/30'}`}>

                                {plan.popular && (
                                    <div className="absolute -top-4 left-0 right-0 flex justify-center z-20">
                                        <span className="bg-primary text-dark text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-primary/20 flex items-center gap-1">
                                            Melhor Valor
                                        </span>
                                    </div>
                                )}

                                {plan.isComingSoon && (
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-white/10 text-white text-xs font-medium px-2 py-1 rounded border border-white/20">
                                            Em Breve
                                        </span>
                                    </div>
                                )}

                                <CardItem translateZ="50" className="mt-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg ${plan.popular ? 'bg-primary text-dark' : 'bg-white/5 text-primary'}`}>
                                        {plan.icon}
                                    </div>
                                </CardItem>

                                <CardItem
                                    as="h3"
                                    translateZ="60"
                                    className="text-xl font-bold text-white mb-2"
                                >
                                    {plan.title}
                                </CardItem>

                                <CardItem
                                    translateZ="50"
                                    className="mb-4"
                                >
                                    {plan.originalPrice && (
                                        <span className="text-sm text-gray-500 line-through block mb-1">
                                            {plan.originalPrice}
                                        </span>
                                    )}
                                    <span className={`text-3xl font-bold ${plan.popular ? 'text-primary' : 'text-white'}`}>
                                        {plan.price}
                                    </span>
                                </CardItem>

                                <CardItem
                                    as="p"
                                    translateZ="40"
                                    className="text-gray-400 text-sm mb-6 min-h-[40px]"
                                >
                                    {plan.description}
                                </CardItem>

                                <CardItem translateZ="30" className="w-full space-y-3 mb-8 flex-grow">
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start text-sm text-gray-300">
                                            <CheckCircle2 className={`w-4 h-4 mr-2 flex-shrink-0 ${plan.popular ? 'text-primary' : 'text-gray-500'}`} />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </CardItem>

                                <div className="mt-auto pt-6 border-t border-white/5">
                                    <CardItem
                                        translateZ={20}
                                        as="a"
                                        href={plan.isComingSoon ? "#" : "/criar-curriculo"}
                                        className={`w-full block text-center py-3 rounded-xl font-bold transition-all ${plan.isComingSoon
                                            ? 'bg-white/5 text-gray-400 cursor-not-allowed'
                                            : plan.popular
                                                ? 'bg-primary text-dark hover:bg-primary-300 hover:shadow-lg hover:shadow-primary/20'
                                                : 'bg-white text-dark hover:bg-gray-200'
                                            }`}
                                    >
                                        {plan.buttonText}
                                    </CardItem>
                                </div>
                            </CardBody>
                        </CardContainer>
                    ))}
                </div>
            </div>
        </section>
    );
};
