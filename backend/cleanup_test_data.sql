-- AngoHire - Script de Limpeza de Dados de Teste
-- Execute este script no Supabase SQL Editor antes do lançamento

-- 1. Deletar todos os pedidos de teste
DELETE FROM orders WHERE status IN ('pending', 'processing', 'completed');

-- 2. Resetar contadores (opcional)
-- Caso queira começar com ID 1 novamente
-- TRUNCATE TABLE orders RESTART IDENTITY CASCADE;

-- 3. Deletar PDFs de teste do storage bucket
-- ATENÇÃO: Isso deve ser feito manualmente no Supabase Storage UI
-- Vá em Storage > resumes > Delete all files

-- 4. Verificação final
SELECT COUNT(*) as total_orders FROM orders;
-- Deve retornar 0

-- Mensagem de sucesso
SELECT 'Database limpa e pronta para lançamento!' as status;
