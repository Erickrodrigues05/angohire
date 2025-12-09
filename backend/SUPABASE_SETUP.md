# Configuração do Supabase para AngoHire

## 1. Criar Projeto no Supabase
1. Vai para https://supabase.com
2. Cria conta/Login
3. "New Project"
4. Nome: angohire-production
5. Database Password: (guarda bem!)
6. Region: Europe (mais perto de Angola)

## 2. Schema SQL - Tabela de Pedidos

```sql
-- Criar tabela de pedidos
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Informações do Pacote
  package TEXT NOT NULL CHECK (package IN ('professional', 'combo', 'cover-letter')),
  template TEXT DEFAULT 'modern-professional',
  price INTEGER NOT NULL,
  
  -- Dados do Cliente (JSON)
  client_data JSONB NOT NULL,
  
  -- Status do Pedido
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'completed', 'cancelled')),
  payment_proof_url TEXT,
  
  -- PDF Gerado
  pdf_url TEXT,
  pdf_generated_at TIMESTAMP,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  paid_at TIMESTAMP,
  completed_at TIMESTAMP,
  
  --Metadados
  notes TEXT
);

-- Índices para performance
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 3. Storage Bucket para PDFs

```sql
-- Criar bucket público para PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true);

-- Política de acesso (apenas admin pode fazer upload, mas todos podem ler)
CREATE POLICY "Public can view resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes');

CREATE POLICY "Authenticated can upload resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes' AND auth.role() = 'authenticated');
```

## 4. Variáveis de Ambiente

Adicionar no `.env` do backend:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
BANK_ACCOUNT=005100002786460610174
ADMIN_WHATSAPP=+244945625060
```

## 5. Testar Conexão

```bash
cd backend
npm install @supabase/supabase-js
npm run dev
```
