# AngoHire - Sistema de Geração Automática de Currículos

Backend para geração automática de currículos profissionais otimizados para ATS.

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Testar geração de currículos
npm run test:generate
```

## 📡 API Endpoints

### POST /api/resume/generate
Gera um currículo em PDF.

**Request:**
```json
{
  "data": {
    "personalInfo": {...},
    "summary": "...",
    "experience": [...],
    "education": [...],
    "skills": [...]
  },
  "template": "modern-professional"
}
```

**Response:** PDF file

### POST /api/resume/analyze
Analisa dados e retorna score ATS sem gerar PDF.

**Response:**
```json
{
  "success": true,
  "atsScore": 95,
  "recommendations": [...]
}
```

### GET /api/templates
Lista templates disponíveis.

## 🎨 Templates Disponíveis

- `modern-professional` - Layout profissional e limpo (Score: 100/100)
- `entry-level` - Foco em educação para recém-formados (Score: 90/100)
- `executive-premium` - Em desenvolvimento
- `creative-professional` - Em desenvolvimento
- `technical-specialist` - Em desenvolvimento

## 📊 Score ATS

O sistema calcula automaticamente um score de 0-100 baseado em:
- Resumo profissional (10 pts)
- Qualidade das descrições (20 pts)
- Palavras-chave relevantes (15 pts)
- Formação completa (10 pts)
- Competências organizadas (15 pts)
- Dados de contato (10 pts)
- Verbos de ação (10 pts)
- Consistência de datas (10 pts)

## 🛠️ Tecnologias

- Express.js
- TypeScript
- React-PDF
- Zod (validação)

## 📝 Desenvolvido para AngoHire
