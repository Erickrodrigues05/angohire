import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { FileText, Linkedin, PenTool, Check } from "lucide-react";

export const Features = () => {
    const services = [
        {
            title: "Currículo Profissional",
            description: "Design moderno, palavras-chave estratégicas e formatação impecável para passar nos filtros ATS.",
            icon: <FileText className="w-10 h-10 text-primary" />,
            features: ["ATS Friendly", "Design Premium", "Redação Estratégica"],
            price: "15.000 Kz"
        },
        {
            title: "Otimização LinkedIn",
            description: "Transforme o seu perfil numa máquina de atrair recrutadores e destaque-se na maior rede profissional.",
            icon: <Linkedin className="w-10 h-10 text-primary" />,
            features: ["Headline Atrativo", "Resumo Impactante", "SEO para Perfil"],
            price: "10.000 Kz"
        },
        {
            title: "Carta de Apresentação",
            description: "Textos persuasivos que complementam o seu CV e mostram a sua motivação e fit cultural.",
            icon: <PenTool className="w-10 h-10 text-primary" />,
            features: ["Personalizada", "Persuasiva", "Direta ao Ponto"],
            price: "5.000 Kz"
        }
    ];

    return (
        <section id="services" className="py-24 bg-dark relative overflow-hidden">
            {/* Decorative gradient blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Nossos <span className="text-primary">Serviços</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Ferramentas essenciais para impulsionar a sua carreira ao próximo nível.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <CardContainer key={index} className="inter-var w-full">
                            <CardBody className="bg-dark/50 relative group/card  border-white/10 w-full h-auto rounded-xl p-8 border hover:border-primary/50 transition-colors">
                                <CardItem
                                    translateZ="50"
                                    className="w-full mt-4"
                                >
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                                        {service.icon}
                                    </div>
                                </CardItem>
                                <CardItem
                                    as="h3"
                                    translateZ="60"
                                    className="text-2xl font-bold text-white mb-3"
                                >
                                    {service.title}
                                </CardItem>
                                <CardItem
                                    as="p"
                                    translateZ="50"
                                    className="text-gray-400 text-sm max-w-sm mt-2 mb-6 leading-relaxed"
                                >
                                    {service.description}
                                </CardItem>

                                <CardItem translateZ="40" className="w-full mb-8 space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center text-sm text-gray-300">
                                            <Check className="w-4 h-4 text-primary mr-2" />
                                            {feature}
                                        </div>
                                    ))}
                                </CardItem>

                                <div className="flex justify-between items-center mt-auto">
                                    <CardItem
                                        translateZ={60}
                                        className="text-xl font-bold text-primary"
                                    >
                                        {service.price}
                                    </CardItem>
                                    <CardItem
                                        translateZ={40}
                                        as="a"
                                        href="https://wa.me/+244945625060"
                                        className="px-4 py-2 rounded-lg bg-white text-dark text-xs font-bold hover:bg-white/90"
                                    >
                                        Solicitar
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
