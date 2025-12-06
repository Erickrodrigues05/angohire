import { Mail, Phone, Instagram } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-dark border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-12 mb-12">

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src="/logo.png"
                                alt="AngoHire Logo"
                                className="h-10 w-10 rounded-lg object-cover ring-2 ring-white/10"
                            />
                            <span className="text-2xl font-bold text-white tracking-tighter">
                                Ango<span className="text-primary">Hire</span>
                            </span>
                        </div>
                        <p className="text-gray-400 max-w-xs">
                            Criamos oportunidades. Transformamos histórias. A tua parceira na construção de uma carreira profissional de sucesso em Angola.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Contactos</h4>
                        <div className="space-y-4">
                            <a href="mailto:erickviegas1965@gmail.com" className="flex items-center text-gray-400 hover:text-primary transition-colors">
                                <Mail className="w-5 h-5 mr-3" />
                                erickviegas1965@gmail.com
                            </a>
                            <a href="https://wa.me/+244945625060?text=Ol%C3%A1!%20Gostaria%20de%20entrar%20em%20contacto%20com%20a%20AngoHire." className="flex items-center text-gray-400 hover:text-primary transition-colors">
                                <Phone className="w-5 h-5 mr-3" />
                                +244 945 625 060
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Redes Sociais</h4>
                        <div className="flex space-x-4">
                            <a href="https://www.instagram.com/angohireao/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-dark transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://www.tiktok.com/@angohire" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-dark transition-all">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        © 2025 AngoHire. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};
