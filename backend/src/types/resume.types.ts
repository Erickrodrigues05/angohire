import { z } from 'zod';

export const PersonalInfoSchema = z.object({
    fullName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(9, 'Telefone inválido'),
    location: z.string().min(2, 'Localização inválida'),
    linkedIn: z.string().url().optional(),
    portfolio: z.string().url().optional(),
    professionalTitle: z.string().min(2, 'Título profissional obrigatório'),
});

export const ExperienceSchema = z.object({
    company: z.string().min(2),
    position: z.string().min(2),
    location: z.string().optional(),
    startDate: z.string(), // Format: "YYYY-MM"
    endDate: z.string().optional(), // "YYYY-MM" or "Atual"
    isCurrentJob: z.boolean().default(false),
    description: z.array(z.string()).min(1, 'Adicione pelo menos uma conquista'),
    achievements: z.array(z.string()).optional(),
});

export const EducationSchema = z.object({
    institution: z.string().min(2),
    degree: z.string().min(2),
    field: z.string().min(2),
    location: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    grade: z.string().optional(),
    achievements: z.array(z.string()).optional(),
});

export const SkillSchema = z.object({
    category: z.string(), // "Técnicas", "Soft Skills", "Idiomas"
    skills: z.array(z.string()).min(1),
});

export const CertificationSchema = z.object({
    name: z.string().min(2),
    issuer: z.string().min(2),
    date: z.string(),
    credentialId: z.string().optional(),
    url: z.string().url().optional(),
});

export const ResumeDataSchema = z.object({
    personalInfo: PersonalInfoSchema,
    summary: z.string().min(50, 'Resumo deve ter pelo menos 50 caracteres').max(300, 'Resumo muito longo'),
    experience: z.array(ExperienceSchema).min(1, 'Adicione pelo menos uma experiência'),
    education: z.array(EducationSchema).min(1, 'Adicione pelo menos uma formação'),
    skills: z.array(SkillSchema).min(1, 'Adicione competências'),
    certifications: z.array(CertificationSchema).optional(),
    languages: z.array(z.object({
        language: z.string(),
        proficiency: z.enum(['Básico', 'Intermediário', 'Avançado', 'Nativo']),
    })).optional(),
});

export type ResumeData = z.infer<typeof ResumeDataSchema>;
export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Certification = z.infer<typeof CertificationSchema>;
