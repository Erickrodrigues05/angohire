import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, FileText, Download, Eye, XCircle } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

interface Order {
    id: string;
    package: 'professional' | 'combo' | 'cover-letter';
    price: number;
    status: 'pending' | 'paid' | 'processing' | 'completed' | 'cancelled';
    client_data: any;
    pdf_url?: string;
    created_at: string;
    paid_at?: string;
    completed_at?: string;
}

export const AdminDashboard = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    // Check localStorage on mount
    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (token) setIsAuthenticated(true);
    }, []);

    // Buscar pedidos
    const fetchOrders = async () => {
        const token = localStorage.getItem('admin_token');
        if (!token) return;

        try {
            const response = await fetch(API_ENDPOINTS.ORDERS.LIST, {
                headers: { 'x-admin-token': token }
            });
            const data = await response.json();

            if (data.success) {
                setOrders(data.orders);
            } else if (response.status === 401) {
                // Token expired/invalid
                setIsAuthenticated(false);
                localStorage.removeItem('admin_token');
            }
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchOrders();
            // Atualizar a cada 30 segundos
            const interval = setInterval(fetchOrders, 30000);
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Em um app real, faríamos um POST /api/login para validar e pegar token.
        // Aqui estamos usando o token direto como senha para simplificar a demo.
        // A segurança real vem do backend validando esse header.
        localStorage.setItem('admin_token', password);
        setIsAuthenticated(true);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-white/5 border border-white/10 p-8 rounded-2xl w-full max-w-md space-y-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
                        <p className="text-gray-400">Senha Padrão: admin123</p>
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Digite a senha de administrador"
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                        />
                    </div>
                    <button type="submit" className="w-full bg-primary text-dark font-bold py-3 rounded-lg hover:bg-primary-300 transition-colors">
                        Entrar
                    </button>
                </form>
            </div>
        );
    }

    // Confirmar pagamento
    const [processingId, setProcessingId] = useState<string | null>(null);

    // Confirmar pagamento
    const confirmPayment = async (orderId: string) => {
        if (!confirm('Confirmar que o pagamento foi recebido? Isso irá gerar o PDF automaticamente.')) {
            return;
        }

        setProcessingId(orderId);
        try {
            console.log(`Iniciando confirmação para pedido ${orderId}...`);
            const response = await fetch(API_ENDPOINTS.ORDERS.CONFIRM_PAYMENT(orderId), {
                method: 'POST',
                headers: { 'x-admin-token': localStorage.getItem('admin_token') || '' }
            });

            const data = await response.json();
            console.log('Resposta confirmação:', data);

            if (data.success) {
                alert('✅ Pagamento confirmado! PDF gerado com sucesso!');
                fetchOrders(); // Atualizar lista
            } else {
                alert('❌ Erro: ' + (data.error || 'Erro desconhecido'));
                console.error(data);
            }
        } catch (error) {
            console.error('Erro ao confirmar pagamento:', error);
            alert('❌ Erro de conexão/servidor. Verifique o console (F12).');
        } finally {
            setProcessingId(null);
        }
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            pending: { color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', icon: Clock, text: 'Aguardando Pagamento' },
            paid: { color: 'bg-blue-500/20 text-blue-300 border-blue-500/30', icon: FileText, text: 'Pago' },
            processing: { color: 'bg-purple-500/20 text-purple-300 border-purple-500/30', icon: FileText, text: 'Processando' },
            completed: { color: 'bg-green-500/20 text-green-300 border-green-500/30', icon: CheckCircle, text: 'Concluído' },
            cancelled: { color: 'bg-red-500/20 text-red-300 border-red-500/30', icon: XCircle, text: 'Cancelado' },
        };

        const badge = badges[status as keyof typeof badges];
        const Icon = badge.icon;

        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
                <Icon className="w-3 h-3" />
                {badge.text}
            </span>
        );
    };

    const getPackageName = (pkg: string) => {
        const names = {
            professional: 'Currículo Profissional',
            combo: 'Pack Carreira (Combo)',
            'cover-letter': 'Carta de Interesse',
        };
        return names[pkg as keyof typeof names] || pkg;
    };

    return (
        <div className="min-h-screen bg-dark text-white py-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Dashboard Admin</h1>
                    <p className="text-gray-400">Gerenciar pedidos e confirmações de pagamento</p>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <p className="text-gray-400 text-sm mb-2">Total de Pedidos</p>
                        <p className="text-3xl font-bold">{orders.length}</p>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                        <p className="text-yellow-300 text-sm mb-2">Aguardando Pagamento</p>
                        <p className="text-3xl font-bold text-yellow-300">
                            {orders.filter(o => o.status === 'pending').length}
                        </p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                        <p className="text-green-300 text-sm mb-2">Concluídos</p>
                        <p className="text-3xl font-bold text-green-300">
                            {orders.filter(o => o.status === 'completed').length}
                        </p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                        <p className="text-blue-300 text-sm mb-2">Receita Total</p>
                        <p className="text-3xl font-bold text-blue-300">
                            {orders.reduce((sum, o) => sum + o.price, 0).toLocaleString()} Kz
                        </p>
                    </div>
                </div>

                {/* Orders List */}
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                        <h2 className="text-xl font-bold">Pedidos Recentes</h2>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center text-gray-400">
                            Carregando pedidos...
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="p-12 text-center text-gray-400">
                            Nenhum pedido ainda
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Cliente</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Pacote</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Valor</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Data</th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium">{order.client_data?.personalInfo?.fullName || 'Nome não disponível'}</p>
                                                    <p className="text-sm text-gray-400">{order.client_data?.personalInfo?.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm">{getPackageName(order.package)}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium">{order.price.toLocaleString()} Kz</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(order.status)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-400">
                                                    {new Date(order.created_at).toLocaleDateString('pt-AO')}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                                        title="Ver detalhes"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>

                                                    {order.status === 'pending' && (
                                                        <button
                                                            onClick={() => confirmPayment(order.id)}
                                                            disabled={processingId === order.id}
                                                            className="px-3 py-2 bg-primary text-dark rounded-lg hover:bg-primary-300 transition-colors text-sm font-medium flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            {processingId === order.id ? (
                                                                <>
                                                                    <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin"></div>
                                                                    Processando...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <CheckCircle className="w-4 h-4" />
                                                                    Confirmar Pagamento
                                                                </>
                                                            )}
                                                        </button>
                                                    )}

                                                    {order.pdf_url && (
                                                        <a
                                                            href={order.pdf_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                                            title="Download PDF"
                                                        >
                                                            <Download className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Order Details Modal */}
                {selectedOrder && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-dark-card border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                <h3 className="text-xl font-bold">Detalhes do Pedido</h3>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div>
                                    <h4 className="text-sm text-gray-400 mb-2">Informações Pessoais</h4>
                                    <div className="bg-white/5 rounded-lg p-4 space-y-2">
                                        <p><strong>Nome:</strong> {selectedOrder.client_data?.personalInfo?.fullName}</p>
                                        <p><strong>Email:</strong> {selectedOrder.client_data?.personalInfo?.email}</p>
                                        <p><strong>Telefone:</strong> {selectedOrder.client_data?.personalInfo?.phone}</p>
                                        <p><strong>Localização:</strong> {selectedOrder.client_data?.personalInfo?.location}</p>
                                        <p><strong>Título:</strong> {selectedOrder.client_data?.personalInfo?.professionalTitle}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm text-gray-400 mb-2">Pedido</h4>
                                    <div className="bg-white/5 rounded-lg p-4 space-y-2">
                                        <p><strong>Pacote:</strong> {getPackageName(selectedOrder.package)}</p>
                                        <p><strong>Valor:</strong> {selectedOrder.price.toLocaleString()} Kz</p>
                                        <p><strong>Status:</strong> {getStatusBadge(selectedOrder.status)}</p>
                                        <p><strong>Criado em:</strong> {new Date(selectedOrder.created_at).toLocaleString('pt-AO')}</p>
                                        {selectedOrder.paid_at && <p><strong>Pago em:</strong> {new Date(selectedOrder.paid_at).toLocaleString('pt-AO')}</p>}
                                        {selectedOrder.completed_at && <p><strong>Concluído em:</strong> {new Date(selectedOrder.completed_at).toLocaleString('pt-AO')}</p>}
                                    </div>
                                </div>

                                {selectedOrder.pdf_url && (
                                    <div>
                                        <a
                                            href={selectedOrder.pdf_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full bg-primary text-dark font-bold py-3 rounded-lg hover:bg-primary-300 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Download className="w-5 h-5" />
                                            Download PDF
                                        </a>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};
