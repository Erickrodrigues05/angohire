import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scan, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

export const CVScanner = () => {
    const [text, setText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const analyzeResume = async () => {
        if (!text.trim() || text.length < 50) return;

        setIsAnalyzing(true);
        try {
            // Using the existing backend endpoint
            const response = await fetch(API_ENDPOINTS.RESUME.ANALYZE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // Sending minimal structure required by backend validation
                    personalInfo: { fullName: 'User', email: 'test@test.com', phone: '', location: '', professionalTitle: '' },
                    summary: text,
                    experience: [],
                    education: [],
                    skills: []
                })
            });

            const data = await response.json();

            // Artificial delay for "scanning" effect
            setTimeout(() => {
                setResult(data);
                setIsAnalyzing(false);
            }, 2000);

        } catch (error) {
            console.error('Analysis failed', error);
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 relative overflow-hidden"
            >
                {/* Decorative scanning line */}
                {isAnalyzing && (
                    <motion.div
                        className="absolute inset-x-0 h-1 bg-primary/50 z-10 box-shadow-[0_0_20px_rgba(255,215,0,0.5)]"
                        initial={{ top: 0 }}
                        animate={{ top: "100%" }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    />
                )}

                {!result ? (
                    <>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Scan className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Scanner de Currículo IA</h3>
                                <p className="text-sm text-gray-400">Descubra a nota do seu CV em segundos</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Cole o resumo ou partes do seu currículo aqui para uma análise rápida..."
                                className="w-full h-32 bg-dark/50 border border-white/10 rounded-xl p-4 text-gray-300 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none text-sm"
                            />

                            <button
                                onClick={analyzeResume}
                                disabled={isAnalyzing || text.length < 50}
                                className="w-full bg-primary text-dark font-bold py-3 rounded-xl hover:bg-primary-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Analisando...
                                    </>
                                ) : (
                                    <>
                                        Analisar Meu Currículo
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                            {text.length > 0 && text.length < 50 && (
                                <p className="text-xs text-red-400 text-center">Digite pelo menos 50 caracteres para analisar.</p>
                            )}
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative w-24 h-24 flex items-center justify-center mb-4">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="40"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        className="text-white/10"
                                    />
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="40"
                                        stroke="#FFD700"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray={251.2}
                                        strokeDashoffset={251.2 * (1 - (result.atsScore || 65) / 100)}
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>
                                <span className="absolute text-3xl font-bold text-white">
                                    {result.atsScore || 65}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                {(result.atsScore || 65) > 70 ? "Bom começo!" : "Precisa de Atenção"}
                            </h3>
                            <p className="text-sm text-gray-400 max-w-sm mx-auto">
                                O seu currículo tem potencial, mas pode ser muito mais competitivo.
                            </p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 mb-6 text-left">
                            <h4 className="font-bold text-primary mb-3 text-sm uppercase tracking-wider">Recomendações da IA:</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-sm text-gray-300">
                                    <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                                    Adicione palavras-chave de ação
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-300">
                                    <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                                    Melhore a formatação para leitura ATS
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-300">
                                    <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                                    Quantifique seus resultados (números)
                                </li>
                            </ul>
                        </div>

                        <button
                            onClick={() => window.location.href = '/criar-curriculo'}
                            className="w-full bg-primary text-dark font-bold py-3 rounded-xl hover:bg-primary-300 transition-colors flex items-center justify-center gap-2 animate-pulse"
                        >
                            Corrigir Tudo e Criar CV Perfeito
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => { setResult(null); setText(''); }}
                            className="mt-4 text-sm text-gray-500 hover:text-white transition-colors"
                        >
                            Tentar novamente
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};
