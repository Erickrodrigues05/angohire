import { resumeGenerator } from './services/resume-generator.js';
import { sampleResumeData, sampleEntryLevelData } from './data/sample-data.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script para testar a geração de currículos
 */
async function testResumeGeneration() {
    console.log('🧪 Testando geração de currículos...\n');

    // Criar pasta de output
    const outputDir = path.join(__dirname, '../output');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Teste 1: Template Moderno & Profissional
    console.log('📄 Gerando currículo com template "Moderno & Profissional"...');
    const result1 = await resumeGenerator.generate({
        data: sampleResumeData,
        template: 'modern-professional',
    });

    if (result1.success && result1.pdfBuffer) {
        const filename1 = path.join(outputDir, 'curriculo-moderno-profissional.pdf');
        fs.writeFileSync(filename1, result1.pdfBuffer);
        console.log(`✅ Sucesso! Arquivo salvo em: ${filename1}`);
        console.log(`   Score ATS: ${result1.atsScore}/100\n`);
    } else {
        console.log(`❌ Erro: ${result1.error}\n`);
    }

    // Teste 2: Template Entry-Level
    console.log('📄 Gerando currículo com template "Entrada de Carreira"...');
    const result2 = await resumeGenerator.generate({
        data: sampleEntryLevelData,
        template: 'entry-level',
    });

    if (result2.success && result2.pdfBuffer) {
        const filename2 = path.join(outputDir, 'curriculo-entry-level.pdf');
        fs.writeFileSync(filename2, result2.pdfBuffer);
        console.log(`✅ Sucesso! Arquivo salvo em: ${filename2}`);
        console.log(`   Score ATS: ${result2.atsScore}/100\n`);
    } else {
        console.log(`❌ Erro: ${result2.error}\n`);
    }

    console.log('✨ Testes concluídos! Verifique os PDFs gerados na pasta output/');
}

// Executar teste
testResumeGeneration().catch(console.error);
