import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Copy, MessageCircle, ArrowLeft, Clock } from 'lucide-react';

export const PaymentPage = () => {
    const { orderId } = useParams();
    const [copied, setCopied] = useState(false);
    const [orderData, setOrderData] = useState<any>(null);

    const bankAccount = '005100002786460610174';
    const whatsappNumber = '+244945625060';

    useEffect(() => {
        // Buscar dados do pedido
        if (orderId) {
            fetch(`http://localhost:3001/api/orders/${orderId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setOrderData(data.order);
                    }
                })
                .catch(console.error);
        }
    }, [orderId]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getPackageName = (pkg: string) => {
        const names: Record<string, string> = {
            professional: 'Currículo Profissional',
            combo: 'Pack Carreira (Combo)',
            'cover-letter': 'Carta de Interesse',
        };
        return names[pkg] || pkg;
    };

    return (
        <div className="min-h-screen bg-dark text-white py-20">
            <div className="max-w-3xl mx-auto px-4">
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex justify-center mb-8"
                >
                    <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold mb-4">Pedido Criado com Sucesso! 🎉</h1>
                    <p className="text-gray-400 text-lg">
                        Agora só falta confirmar o pagamento para receberes o teu currículo profissional
                    </p>
                </motion.div>

                {/* Order Summary */}
                {orderData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8"
                    >
                        <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Pacote:</span>
                                <span className="font-medium">{getPackageName(orderData.package)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Valor Total:</span>
                                <span className="text-2xl font-bold text-primary">
                                    {orderData.price?.toLocaleString()} Kz
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">ID do Pedido:</span>
                                <span className="font-mono text-sm text-gray-300">{orderId?.slice(0, 8)}...</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Payment Instructions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-primary/10 border-2 border-primary/30 rounded-xl p-8 mb-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-2xl font-bold text-dark">1</span>
                        </div>
                        <h2 className="text-2xl font-bold">Fazer Transferência Bancária</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-400 text-sm mb-2">IBAN:</p>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 bg-dark rounded-lg p-4">
                                    <p className="font-mono text-xl text-primary font-bold tracking-wider">
                                        {bankAccount}
                                    </p>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(bankAccount)}
                                    className="p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                    title="Copiar IBAN"
                                >
                                    {copied ? (
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                    ) : (
                                        <Copy className="w-6 h-6" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 pt-4">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Titular:</p>
                                <p className="font-medium">Erik Viegas Rodrigues</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Valor:</p>
                                <p className="font-bold text-primary text-lg">
                                    {orderData?.price?.toLocaleString() || '...'} Kz
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* WhatsApp Instructions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">2</span>
                        </div>
                        <h2 className="text-2xl font-bold">Enviar Comprovante</h2>
                    </div>

                    <div className="space-y-4">
                        <p className="text-gray-300">
                            Após fazer a transferência, tira um <strong>print do comprovante</strong> e envia para
                            o nosso WhatsApp:
                        </p>

                        <a
                            href={`https://wa.me/${whatsappNumber.replace(/\s/g, '')}?text=${encodeURIComponent(
                                `Olá! Fiz o pagamento do pedido ${orderId?.slice(0, 8)}. Segue o comprovante.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-3 group"
                        >
                            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            <span>Enviar Comprovante via WhatsApp</span>
                        </a>

                        <p className="text-center text-sm text-gray-400">
                            Número: <span className="font-mono text-primary">{whatsappNumber}</span>
                        </p>
                    </div>
                </motion.div>

                {/* Delivery Time */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8"
                >
                    <div className="flex items-start gap-4">
                        <Clock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-blue-300 mb-2">Prazo de Entrega</h3>
                            <p className="text-gray-300">
                                Após confirmação do pagamento, receberás o teu currículo em <strong>24-48 horas</strong> via
                                WhatsApp. Garantimos qualidade premium!
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Back to Home */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-center"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Voltar para Página Inicial
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};
