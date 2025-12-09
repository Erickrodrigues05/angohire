# 🧪 Como Testar o Sistema MVP - AngoHire

## 📋 Pré-requisitos
- ✅ Backend rodando em `http://localhost:3001`
- ✅ Frontend rodando em `http://localhost:5173` (ou porta especificada)
- ✅ Supabase configurado

---

## 🎯 Teste 1: Acessar Admin Dashboard

1. Abra o navegador em: `http://localhost:5173/admin`
2. Você deve ver:
   - Dashboard com estatísticas (0 pedidos inicialmente)
   - Lista de pedidos vazia
   - Estatísticas: Total, Aguardando Pagamento, Concluídos, Receita

---

## 🎯 Teste 2: Criar um Pedido (Manual via API)

Como o formulário ainda não está completo (steps 3-4), vamos criar um pedido manualmente:

### Usando PowerShell:

```powershell
$body = @{
    package = "combo"
    template = "modern-professional"
    personalInfo = @{
        fullName = "João Silva Teste"
        email = "joao@teste.com"
        phone = "+244 923 456 789"
        location = "Luanda, Angola"
        professionalTitle = "Desenvolvedor Full Stack"
    }
    summary = "Profissional com experiência em desenvolvimento web."
    experience = @()
    education = @()
    skills = @()
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/orders/create" -Method POST -Body $body -ContentType "application/json"
```

**Deve retornar:**
```json
{
  "success": true,
  "orderId": "uuid-aqui",
  "message": "Pedido criado com sucesso!",
  "bankAccount": "005100002786460610174",
  "whatsapp": "+244945625060"
}
```

---

## 🎯 Teste 3: Ver Pedido no Dashboard

1. Volte para `http://localhost:5173/admin`
2. Aperte F5 (refresh) se necessário
3. Você deve ver:
   - 1 pedido na tabela
   - Status: "Aguardando Pagamento" (amarelo)
   - Dados do cliente: João Silva Teste
   - Botão "Confirmar Pagamento"

---

## 🎯 Teste 4: Confirmar Pagamento e Gerar PDF

1. No dashboard, clique em **"Confirmar Pagamento"** no pedido
2. Confirme a ação quando aparecer o alert
3. Aguarde processamento (5-10 segundos)
4. O pedido deve mudar para status "Concluído" (verde)
5. Um botão de **Download PDF** deve aparecer

---

## 🎯 Teste 5: Download do PDF

1. Clique no ícone de download no pedido concluído
2. O PDF deve abrir em nova aba
3. Verifique se o currículo foi gerado corretamente

---

## 🎯 Teste 6: Ver Detalhes do Pedido

1. Clique no ícone do olho (👁️) no pedido
2. Deve abrir um modal com:
   - Informações pessoais completas
   - Detalhes do pedido
   - Botão para download do PDF

---

## 🚨 Troubleshooting

### Problema: "Cannot find module 'react-router-dom'"
**Solução:** Aguarde a instalação concluir ou rode:
```bash
npm install react-router-dom
```

### Problema: Dashboard não mostra pedidos
**Solução:** Verifique se:
- Backend está rodando (`http://localhost:3001/health` deve retornar OK)
- CORS está habilitado no backend
- Abra console do navegador para ver erros

### Problema: Erro ao confirmar pagamento
**Solução:** Verifique se:
- Bucket "resumes" existe no Supabase
- Bucket está marcado como público
- Credenciais do Supabase estão corretas em `temp-config.ts`

### Problema: PDF não é gerado
**Solução:**
- Verifique logs do backend no terminal
- Confirme que `@react-pdf/renderer` está instalado
- Teste geração manual: `npm run test:generate`

---

## ✅ Checklist de Funcionamento

- [ ] Admin dashboard carrega sem erros
- [ ] Pedido criado via API aparece no dashboard
- [ ] Botão "Confirmar Pagamento" funciona
- [ ] Status muda de "Aguardando" para "Concluído"
- [ ] PDF é gerado automaticamente
- [ ] PDF pode ser baixado
- [ ] Dados do cliente aparecem corretamente

---

## 📈 Próximos Passos

Após confirmar que tudo funciona:

1. **Completar formulário web** (steps 3 e 4)
2. **Testar criação de pedido pelo site**
3. **Melhorar templates de PDF**
4. **Adicionar mais features** (múltiplos templates, preview, etc.)

---

**Dúvidas? Me avisa e eu te ajudo!** 🚀
