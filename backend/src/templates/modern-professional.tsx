import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '../types/resume.types';

// Estilos otimizados para ATS - usando fontes padrão  do sistema
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 11,
        lineHeight: 1.5,
        color: '#333333',
    },
    header: {
        marginBottom: 20,
        borderBottom: '2pt solid #2563eb',
        paddingBottom: 12,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 4,
    },
    professionalTitle: {
        fontSize: 14,
        color: '#2563eb',
        marginBottom: 8,
    },
    contactInfo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        fontSize: 10,
        color: '#64748b',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        marginTop: 16,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        borderBottom: '1pt solid #e2e8f0',
        paddingBottom: 4,
    },
    summary: {
        fontSize: 11,
        lineHeight: 1.6,
        color: '#475569',
        textAlign: 'justify',
    },
    experienceItem: {
        marginBottom: 12,
    },
    experienceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    jobTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    company: {
        fontSize: 11,
        color: '#2563eb',
        marginBottom: 2,
    },
    dateRange: {
        fontSize: 10,
        color: '#64748b',
        fontStyle: 'italic',
    },
    descriptionList: {
        marginTop: 4,
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 3,
        paddingLeft: 12,
    },
    bullet: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#2563eb',
        marginRight: 8,
        marginTop: 6,
    },
    bulletText: {
        flex: 1,
        fontSize: 10,
        color: '#475569',
        lineHeight: 1.4,
    },
    educationItem: {
        marginBottom: 10,
    },
    degree: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    institution: {
        fontSize: 10,
        color: '#2563eb',
        marginBottom: 2,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    skillCategory: {
        marginBottom: 8,
    },
    skillCategoryTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 4,
    },
    skillsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    skillTag: {
        backgroundColor: '#eff6ff',
        color: '#1e40af',
        padding: '4 8',
        borderRadius: 4,
        fontSize: 9,
    },
});

interface ModernProfessionalProps {
    data: ResumeData;
}

export const ModernProfessionalTemplate: React.FC<ModernProfessionalProps> = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, certifications, languages } = data;

    const formatDate = (date: string): string => {
        if (!date || date === 'Atual') return 'Presente';
        const [year, month] = date.split('-');
        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        return `${months[parseInt(month) - 1]} ${year}`;
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header - Informações Pessoais */}
                <View style={styles.header}>
                    <Text style={styles.name}>{personalInfo.fullName}</Text>
                    <Text style={styles.professionalTitle}>{personalInfo.professionalTitle}</Text>
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactItem}>{personalInfo.email}</Text>
                        <Text style={styles.contactItem}>•</Text>
                        <Text style={styles.contactItem}>{personalInfo.phone}</Text>
                        <Text style={styles.contactItem}>•</Text>
                        <Text style={styles.contactItem}>{personalInfo.location}</Text>
                        {personalInfo.linkedIn && (
                            <>
                                <Text style={styles.contactItem}>•</Text>
                                <Text style={styles.contactItem}>{personalInfo.linkedIn}</Text>
                            </>
                        )}
                    </View>
                </View>

                {/* Resumo Profissional */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resumo Profissional</Text>
                    <Text style={styles.summary}>{summary}</Text>
                </View>

                {/* Experiência Profissional */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Experiência Profissional</Text>
                    {experience.map((exp, index) => (
                        <View key={index} style={styles.experienceItem}>
                            <View style={styles.experienceHeader}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.jobTitle}>{exp.position}</Text>
                                    <Text style={styles.company}>{exp.company}</Text>
                                </View>
                                <Text style={styles.dateRange}>
                                    {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Presente' : formatDate(exp.endDate || '')}
                                </Text>
                            </View>
                            <View style={styles.descriptionList}>
                                {Array.isArray(exp.description) ? (
                                    exp.description.map((item, idx) => (
                                        <View key={idx} style={styles.bulletPoint}>
                                            <View style={styles.bullet} />
                                            <Text style={styles.bulletText}>{item}</Text>
                                        </View>
                                    ))
                                ) : (
                                    // Se for string, separar por quebras de linha ou mostrar como parágrafo
                                    (exp.description as string || '').split('\n').filter(Boolean).map((item, idx) => (
                                        <View key={idx} style={styles.bulletPoint}>
                                            <View style={styles.bullet} />
                                            <Text style={styles.bulletText}>{item}</Text>
                                        </View>
                                    ))
                                )}
                            </View>
                        </View>
                    ))}
                </View>

                {/* Educação */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Educação</Text>
                    {education.map((edu, index) => (
                        <View key={index} style={styles.educationItem}>
                            <Text style={styles.degree}>{edu.degree} em {edu.field}</Text>
                            <Text style={styles.institution}>{edu.institution}</Text>
                            <Text style={styles.dateRange}>
                                {formatDate(edu.startDate)} - {formatDate(edu.endDate || 'Presente')}
                            </Text>
                            {edu.grade && <Text style={styles.bulletText}>Nota: {edu.grade}</Text>}
                        </View>
                    ))}
                </View>

                {/* Competências */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Competências</Text>
                    {skills.map((skillGroup, index) => (
                        <View key={index} style={styles.skillCategory}>
                            <Text style={styles.skillCategoryTitle}>{skillGroup.category}</Text>
                            <View style={styles.skillsList}>
                                {skillGroup.skills.map((skill, idx) => (
                                    <Text key={idx} style={styles.skillTag}>{skill}</Text>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>

                {/* Certificações */}
                {certifications && certifications.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Certificações</Text>
                        {certifications.map((cert, index) => (
                            <View key={index} style={styles.educationItem}>
                                <Text style={styles.degree}>{cert.name}</Text>
                                <Text style={styles.institution}>{cert.issuer}</Text>
                                <Text style={styles.dateRange}>{formatDate(cert.date)}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Idiomas */}
                {languages && languages.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Idiomas</Text>
                        <View style={styles.skillsList}>
                            {languages.map((lang, index) => (
                                <Text key={index} style={styles.bulletText}>
                                    {lang.language}: {lang.proficiency}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}
            </Page>
        </Document>
    );
};
