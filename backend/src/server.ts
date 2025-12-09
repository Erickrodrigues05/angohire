import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { z } from 'zod';
import { ResumeDataSchema } from './types/resume.types';
import { resumeGenerator, TemplateType } from './services/resume-generator';
import ordersRouter from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/orders', ordersRouter);

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', message: 'Resume Generator API is running' });
});

// Schema para requisição de geração
const GenerateRequestSchema = z.object({
    data: ResumeDataSchema,
    template: z.enum(['modern-professional', 'entry-level', 'executive-premium', 'creative-professional', 'technical-specialist']),
});

/**
 * POST /api/resume/generate
 * Gera um currículo em PDF
 */
app.post('/api/resume/generate', async (req: Request, res: Response) => {
    try {
        // Validar dados
        const validation = GenerateRequestSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                error: 'Dados inválidos',
                details: validation.error.errors,
            });
        }

        const { data, template } = validation.data;

        // Gerar currículo
        const result = await resumeGenerator.generate({
            data,
            template: template as TemplateType,
        });

        if (!result.success) {
            return res.status(500).json({
                success: false,
                error: result.error,
            });
        }

        // Retornar PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="curriculo-${data.personalInfo.fullName.replace(/\s/g, '-')}.pdf"`);
        res.send(result.pdfBuffer);

    } catch (error) {
        console.error('Erro ao gerar currículo:', error);
        res.status(500).json({
            success: false,
            error: 'Erro interno ao gerar currículo',
        });
    }
});

/**
 * POST /api/resume/analyze
 * Analisa dados do currículo e retorna score ATS sem gerar PDF
 */
app.post('/api/resume/analyze', async (req: Request, res: Response) => {
    try {
        const validation = ResumeDataSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                error: 'Dados inválidos',
                details: validation.error.errors,
            });
        }

        const data = validation.data;

        // Gerar apenas para obter o score (não retornar PDF)
        const result = await resumeGenerator.generate({
            data,
            template: 'modern-professional',
        });

        res.json({
            success: true,
            atsScore: result.atsScore,
            recommendations: generateRecommendations(data, result.atsScore || 0),
        });

    } catch (error) {
        console.error('Erro ao analisar currículo:', error);
        res.status(500).json({
            success: false,
            error: 'Erro interno ao analisar currículo',
        });
    }
});

/**
 * GET /api/templates
 * Lista templates disponíveis
 */
app.get('/api/templates', (req: Request, res: Response) => {
    res.json({
        success: true,
        templates: [
            {
                id: 'modern-professional',
                name: 'Moderno & Profissional',
                description: 'Layout limpo e profissional, ideal para qualquer setor',
                category: 'professional',
                recommendedFor: 'Profissionais com 3-10 anos de experiência',
            },
            {
                id: 'entry-level',
                name: 'Entrada de Carreira',
                description: 'Foco em educação e competências para recém-formados',
                category: 'entry-level',
                recommendedFor: 'Recém-formados e first-timers',
            },
            {
                id: 'executive-premium',
                name: 'Executivo Premium',
                description: 'Design sofisticado para cargos de liderança',
                category: 'executive',
                recommendedFor: 'Cargos seniores e executivos',
                status: 'Em breve',
            },
            {
                id: 'creative-professional',
                name: 'Profissional Criativo',
                description: 'Design elegante para áreas criativas',
                category: 'creative',
                recommendedFor: 'Marketing, Design, Comunicação',
                status: 'Em breve',
            },
            {
                id: 'technical-specialist',
                name: 'Especialista Técnico',
                description: 'Foco em skills técnicas e certificações',
                category: 'technical',
                recommendedFor: 'Desenvolvedores, Engenheiros, Analistas',
                status: 'Em breve',
            },
        ],
    });
});

/**
 * Gera recomendações baseadas no score ATS
 */
function generateRecommendations(data: any, score: number): string[] {
    const recommendations: string[] = [];

    if (score < 50) {
        recommendations.push('⚠️ Seu currículo precisa de melhorias significativas para passar pelos sistemas ATS');
    } else if (score < 70) {
        recommendations.push('📊 Seu currículo está no caminho certo, mas ainda pode ser otimizado');
    } else if (score < 85) {
        recommendations.push('✅ Bom currículo! Pequenos ajustes podem aumentar suas chances');
    } else {
        recommendations.push('🌟 Excelente! Seu currículo está otimizado para ATS');
    }

    // Recomendações específicas
    if (data.summary.length < 50) {
        recommendations.push('Adicione um resumo profissional mais descritivo (mín. 50 caracteres)');
    }

    if (data.experience.some((exp: any) => exp.description.length < 2)) {
        recommendations.push('Adicione mais detalhes nas descrições de experiência (mín. 2 pontos por cargo)');
    }

    if (data.skills.length < 2) {
        recommendations.push('Organize melhor suas competências em categorias (Técnicas, Soft Skills, etc.)');
    }

    if (!data.personalInfo.linkedIn) {
        recommendations.push('Considere adicionar seu perfil LinkedIn para maior visibilidade');
    }

    return recommendations;
}

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Resume Generator API rodando em http://localhost:${PORT}`);
    console.log(`📄 Templates disponíveis: /api/templates`);
    console.log(`🏥 Health check: /health`);
});

export default app;
