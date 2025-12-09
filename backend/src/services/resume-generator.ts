import React from 'react';
import { renderToStream } from '@react-pdf/renderer';
import { ResumeData } from '../types/resume.types.js';
import { ModernProfessionalTemplate } from '../templates/modern-professional.js';
import { EntryLevelTemplate } from '../templates/entry-level.js';

export type TemplateType = 'modern-professional' | 'entry-level' | 'executive-premium' | 'creative-professional' | 'technical-specialist';

export interface GenerateResumeOptions {
    data: ResumeData;
    template: TemplateType;
}

export interface GenerateResumeResult {
    success: boolean;
    pdfBuffer?: Buffer;
    error?: string;
    atsScore?: number;
}

/**
 * Motor principal de geração de currículos
 */
export class ResumeGenerator {
    /**
     * Gera um currículo em PDF baseado nos dados e template escolhido
     */
    async generate(options: GenerateResumeOptions): Promise<GenerateResumeResult> {
        try {
            const { data, template } = options;

            // Selecionar template
            const TemplateComponent = this.getTemplateComponent(template);

            if (!TemplateComponent) {
                return {
                    success: false,
                    error: `Template '${template}' não encontrado`,
                };
            }

            // Gerar PDF usando renderToStream
            const document = React.createElement(TemplateComponent, { data });
            const stream = await renderToStream(document);

            // Converter stream para buffer
            const chunks: Buffer[] = [];
            for await (const chunk of stream) {
                chunks.push(chunk as Buffer);
            }
            const pdfBuffer = Buffer.concat(chunks);

            // Calcular score ATS
            const atsScore = this.calculateATSScore(data);

            return {
                success: true,
                pdfBuffer,
                atsScore,
            };
        } catch (error) {
            console.error('Erro ao gerar currículo:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Erro desconhecido',
            };
        }
    }

    /**
     * Retorna o componente de template baseado no tipo
     */
    private getTemplateComponent(template: TemplateType) {
        const templates = {
            'modern-professional': ModernProfessionalTemplate,
            'entry-level': EntryLevelTemplate,
            'executive-premium': ModernProfessionalTemplate, // Placeholder
            'creative-professional': ModernProfessionalTemplate, // Placeholder
            'technical-specialist': ModernProfessionalTemplate, // Placeholder
        };

        return templates[template];
    }

    /**
     * Calcula o score ATS do currículo (0-100)
     * Baseado em critérios comprovados de otimização ATS
     */
    private calculateATSScore(resumeData: ResumeData): number {
        let score = 0;
        const checks = [];

        // 1. Resumo profissional adequado (10 pontos)
        if (resumeData.summary.length >= 50 && resumeData.summary.length <= 300) {
            score += 10;
            checks.push('Resumo profissional com tamanho adequado');
        }

        // 2. Experiências bem descritas (20 pontos)
        const hasGoodExperience = resumeData.experience.every(exp => {
            if (Array.isArray(exp.description)) {
                return exp.description.length >= 2 && exp.description.some(desc => desc.length > 50);
            } else {
                // Se for string
                const desc = exp.description as string || '';
                return desc.length > 100;
            }
        });
        if (hasGoodExperience) {
            score += 20;
            checks.push('Experiências profissionais bem detalhadas');
        }

        // 3. Palavras-chave suficientes (15 pontos)
        const allText = JSON.stringify(resumeData).toLowerCase();
        const commonKeywords = ['gestão', 'desenvolvimento', 'análise', 'liderança', 'projeto', 'equipe', 'resultado'];
        const keywordCount = commonKeywords.filter(kw => allText.includes(kw)).length;
        if (keywordCount >= 3) {
            score += 15;
            checks.push(`${keywordCount} palavras-chave relevantes encontradas`);
        }

        // 4. Formação acadêmica completa (10 pontos)
        if (resumeData.education.length > 0 && resumeData.education.every(edu => edu.degree && edu.field)) {
            score += 10;
            checks.push('Formação acadêmica completa');
        }

        // 5. Competências organizadas (15 pontos)
        if (resumeData.skills.length >= 2 && resumeData.skills.every(s => s.skills.length >= 3)) {
            score += 15;
            checks.push('Competências bem organizadas');
        }

        // 6. Dados de contato completos (10 pontos)
        if (resumeData.personalInfo.email && resumeData.personalInfo.phone && resumeData.personalInfo.location) {
            score += 10;
            checks.push('Dados de contato completos');
        }

        // 7. Uso de verbos de ação (10 pontos)
        const actionVerbs = ['desenvolvi', 'gerenciei', 'implementei', 'liderei', 'criei', 'otimizei', 'aumentei', 'reduzi'];
        const hasActionVerbs = resumeData.experience.some(exp => {
            if (Array.isArray(exp.description)) {
                return exp.description.some((desc: string) =>
                    actionVerbs.some(verb => desc.toLowerCase().includes(verb))
                );
            } else {
                const desc = (exp.description as string || '').toLowerCase();
                return actionVerbs.some(verb => desc.includes(verb));
            }
        });
        if (hasActionVerbs) {
            score += 10;
            checks.push('Uso de verbos de ação nas descrições');
        }

        // 8. Consistência de datas (10 pontos)
        const dateFormat = /^\d{4}-\d{2}$/;
        const hasConsistentDates = [
            ...resumeData.experience.map(e => e.startDate),
            ...resumeData.education.map(e => e.startDate)
        ].every(date => dateFormat.test(date) || date === 'Atual');
        if (hasConsistentDates) {
            score += 10;
            checks.push('Datas formatadas consistentemente');
        }

        console.log('ATS Score Breakdown:', { score, checks });

        return score;
    }

    /**
     * Gera múltiplas versões do currículo (para diferentes vagas)
     */
    async generateMultipleVersions(
        baseData: ResumeData,
        keywords: string[],
        template: TemplateType
    ): Promise<GenerateResumeResult[]> {
        // TODO: Implementar otimização por keywords
        const result = await this.generate({ data: baseData, template });
        return [result];
    }
}

// Exportar instância singleton
export const resumeGenerator = new ResumeGenerator();
