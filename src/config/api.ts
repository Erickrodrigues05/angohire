export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
    ORDERS: {
        CREATE: `${API_BASE_URL}/api/orders/create`,
        LIST: `${API_BASE_URL}/api/orders/list`,
        GET: (id: string) => `${API_BASE_URL}/api/orders/${id}`,
        CONFIRM_PAYMENT: (id: string) => `${API_BASE_URL}/api/orders/${id}/confirm-payment`,
    },
    RESUME: {
        ANALYZE: `${API_BASE_URL}/api/resume/analyze`,
    }
};
