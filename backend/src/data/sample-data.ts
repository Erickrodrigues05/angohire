import { ResumeData } from '../types/resume.types';

/**
 * Dados de exemplo para testar o gerador de currículos
 */
export const sampleResumeData: ResumeData = {
    personalInfo: {
        fullName: 'João Pedro Silva',
        email: 'joao.silva@email.com',
        phone: '+244 923 456 789',
        location: 'Luanda, Angola',
        linkedIn: 'https://linkedin.com/in/joaosilva',
        professionalTitle: 'Analista de Marketing Digital',
    },
    summary: 'Profissional de Marketing Digital com 5 anos de experiência em estratégias de crescimento, SEO, e gestão de campanhas. Especialista em aumentar engajamento e conversões através de análise de dados e otimização de conteúdo. Comprovada capacidade de liderar equipes e entregar resultados mensuráveis.',
    experience: [
        {
            company: 'TechStart Angola',
            position: 'Coordenador de Marketing Digital',
            location: 'Luanda, Angola',
            startDate: '2021-03',
            endDate: '',
            isCurrentJob: true,
            description: [
                'Liderei equipe de 4 profissionais na criação e execução de campanhas digitais que aumentaram o tráfego do site em 150%',
                'Implementei estratégias de SEO que melhoraram o ranking orgânico em 60% para palavras-chave principais',
                'Gerenciei orçamento mensal de $15,000 em anúncios pagos com ROI médio de 320%',
                'Desenvolvi funil de marketing automation que aumentou a taxa de conversão em 45%',
            ],
        },
        {
            company: 'Agência Criativa Mais',
            position: 'Analista de Marketing Digital',
            location: 'Luanda, Angola',
            startDate: '2019-01',
            endDate: '2021-02',
            isCurrentJob: false,
            description: [
                'Gerenciei campanhas de Google Ads e Facebook Ads para 10+ clientes com budget total de $50,000/mês',
                'Criei estratégias de conteúdo que aumentaram o engajamento nas redes sociais em média 200%',
                'Produzi relatórios mensais detalhados usando Google Analytics e Data Studio',
                'Colaborei com designers e redatores para criar materiais de alta conversão',
            ],
        },
    ],
    education: [
        {
            institution: 'Universidade Agostinho Neto',
            degree: 'Licenciatura',
            field: 'Marketing e Publicidade',
            location: 'Luanda, Angola',
            startDate: '2015-09',
            endDate: '2018-12',
            grade: '15.8/20',
            achievements: [
                'Presidente do Clube de Marketing Estudantil',
                'Projeto de conclusão sobre Marketing Digital em Angola premiado',
            ],
        },
    ],
    skills: [
        {
            category: 'Marketing Digital',
            skills: ['Google Analytics', 'Google Ads', 'Facebook Ads', 'SEO/SEM', 'Email Marketing', 'Marketing Automation'],
        },
        {
            category: 'Ferramentas',
            skills: ['HubSpot', 'Mailchimp', 'Canva', 'Adobe Creative Suite', 'WordPress', 'Hootsuite'],
        },
        {
            category: 'Análise de Dados',
            skills: ['Google Data Studio', 'Excel Avançado', 'SQL Básico', 'Power BI'],
        },
        {
            category: 'Soft Skills',
            skills: ['Liderança de Equipe', 'Gestão de Projetos', 'Comunicação', 'Pensamento Analítico', 'Criatividade'],
        },
    ],
    certifications: [
        {
            name: 'Google Analytics Certified',
            issuer: 'Google',
            date: '2022-06',
            credentialId: 'GA-123456',
        },
        {
            name: 'Facebook Blueprint Certification',
            issuer: 'Meta',
            date: '2021-11',
        },
        {
            name: 'HubSpot Inbound Marketing',
            issuer: 'HubSpot Academy',
            date: '2020-08',
        },
    ],
    languages: [
        {
            language: 'Português',
            proficiency: 'Nativo',
        },
        {
            language: 'Inglês',
            proficiency: 'Avançado',
        },
        {
            language: 'Francês',
            proficiency: 'Intermediário',
        },
    ],
};

/**
 * Dados de exemplo para currículo entry-level
 */
export const sampleEntryLevelData: ResumeData = {
    personalInfo: {
        fullName: 'Maria Santos Costa',
        email: 'maria.costa@email.com',
        phone: '+244 912 345 678',
        location: 'Luanda, Angola',
        professionalTitle: 'Recém-Formada em Ciências da Computação',
    },
    summary: 'Recém-formada em Ciências da Computação com forte paixão por desenvolvimento de software e resolução de problemas. Experiência prática em projetos acadêmicos e estágio, com conhecimentos em Python, JavaScript, e desenvolvimento web. Busco oportunidade para iniciar carreira como desenvolvedora de software e contribuir com soluções inovadoras.',
    experience: [
        {
            company: 'StartupLab Angola',
            position: 'Estagiária de Desenvolvimento Web',
            location: 'Luanda, Angola',
            startDate: '2024-06',
            endDate: '2024-11',
            isCurrentJob: false,
            description: [
                'Desenvolvi componentes frontend usando React.js e TypeScript para aplicação de gestão interna',
                'Colaborei com equipe de 3 desenvolvedores em metodologia Agile/Scrum',
                'Implementei testes unitários com Jest, aumentando a cobertura de testes em 30%',
                'Participei em code reviews e aprendi melhores práticas de desenvolvimento',
            ],
        },
    ],
    education: [
        {
            institution: 'Universidade Católica de Angola',
            degree: 'Licenciatura',
            field: 'Ciências da Computação',
            location: 'Luanda, Angola',
            startDate: '2020-09',
            endDate: '2024-06',
            grade: '16.2/20',
            achievements: [
                'Bolsa de mérito acadêmico por 3 anos consecutivos',
                'Projeto final: Sistema de gestão escolar em React/Node.js com nota 18/20',
                'Membro ativa do Clube de Programação',
            ],
        },
    ],
    skills: [
        {
            category: 'Linguagens de Programação',
            skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'HTML', 'CSS'],
        },
        {
            category: 'Frameworks & Bibliotecas',
            skills: ['React.js', 'Node.js', 'Express', 'Tailwind CSS', 'Bootstrap'],
        },
        {
            category: 'Ferramentas',
            skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Postman'],
        },
        {
            category: 'Soft Skills',
            skills: ['Trabalho em Equipe', 'Comunicação', 'Resolução de Problemas', 'Aprendizado Rápido'],
        },
    ],
    certifications: [
        {
            name: 'Introduction to Programming with Python',
            issuer: 'Microsoft',
            date: '2023-05',
        },
        {
            name: 'React - The Complete Guide',
            issuer: 'Udemy',
            date: '2024-02',
        },
    ],
    languages: [
        {
            language: 'Português',
            proficiency: 'Nativo',
        },
        {
            language: 'Inglês',
            proficiency: 'Avançado',
        },
    ],
};
