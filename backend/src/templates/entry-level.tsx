import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '../types/resume.types';

// Usar fontes Arial/Helvetica  (ATS-friendly)
const styles = StyleSheet.create({
    page: {
        padding: 45,
        fontFamily: 'Helvetica',
        fontSize: 11,
        lineHeight: 1.5,
        color: '#2c2c2c',
    },
    header: {
        marginBottom: 16,
        textAlign: 'center',
        paddingBottom: 12,
        borderBottom: '2pt solid #4a5568',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1a202c',
        marginBottom: 6,
    },
    professionalTitle: {
        fontSize: 13,
        color: '#4a5568',
        marginBottom: 8,
    },
    contactInfo: {
        fontSize: 10,
        color: '#718096',
        textAlign: 'center',
    },
    section: {
        marginTop: 14,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    summary: {
        fontSize: 10,
        lineHeight: 1.5,
        color: '#4a5568',
        textAlign: 'justify',
    },
    educationItem: {
        marginBottom: 10,
    },
    degree: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    institution: {
        fontSize: 10,
        color: '#4a5568',
        marginBottom: 2,
    },
    dateRange: {
        fontSize: 9,
        color: '#718096',
        fontStyle: 'italic',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    skillItem: {
        fontSize: 10,
        color: '#4a5568',
        marginRight: 12,
        marginBottom: 4,
    },
    experienceItem: {
        marginBottom: 10,
    },
    jobTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    company: {
        fontSize: 10,
        color: '#4a5568',
        marginBottom: 2,
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 3,
        paddingLeft: 8,
    },
    bullet: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: '#718096',
        marginRight: 6,
        marginTop: 5,
    },
    bulletText: {
        flex: 1,
        fontSize: 10,
        color: '#4a5568',
        lineHeight: 1.4,
    },
});

interface EntryLevelProps {
    data: ResumeData;
}

export const EntryLevelTemplate: React.FC<EntryLevelProps> = ({ data }) => {
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
                {/* Header Centralizado */}
                <View style={styles.header}>
                    <Text style={styles.name}>{personalInfo.fullName}</Text>
                    <Text style={styles.professionalTitle}>{personalInfo.professionalTitle}</Text>
                    <Text style={styles.contactInfo}>
                        {personalInfo.email} | {personalInfo.phone} | {personalInfo.location}
                    </Text>
                </View>

                {/* Resumo */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Objetivo</Text>
                    <Text style={styles.summary}>{summary}</Text>
                </View>

                {/* Educação (Prioridade para entry-level) */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
                    {education.map((edu, index) => (
                        <View key={index} style={styles.educationItem}>
                            <Text style={styles.degree}>{edu.degree} em {edu.field}</Text>
                            <Text style={styles.institution}>{edu.institution}</Text>
                            <Text style={styles.dateRange}>
                                {formatDate(edu.startDate)} - {formatDate(edu.endDate || 'Presente')}
                            </Text>
                            {edu.grade && <Text style={styles.bulletText}>Média: {edu.grade}</Text>}
                            {edu.achievements && edu.achievements.map((achievement, idx) => (
                                <View key={idx} style={styles.bulletPoint}>
                                    <View style={styles.bullet} />
                                    <Text style={styles.bulletText}>{achievement}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>

                {/* Competências */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Competências</Text>
                    {skills.map((skillGroup, index) => (
                        <View key={index} style={{ marginBottom: 6 }}>
                            <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#2d3748', marginBottom: 3 }}>
                                {skillGroup.category}:
                            </Text>
                            <Text style={styles.skillItem}>
                                {skillGroup.skills.join(' • ')}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Experiência (se houver) */}
                {experience && experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experiência Profissional</Text>
                        {experience.map((exp, index) => (
                            <View key={index} style={styles.experienceItem}>
                                <Text style={styles.jobTitle}>{exp.position}</Text>
                                <Text style={styles.company}>{exp.company}</Text>
                                <Text style={styles.dateRange}>
                                    {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Presente' : formatDate(exp.endDate || '')}
                                </Text>
                                <View style={{ marginTop: 4 }}>
                                    {Array.isArray(exp.description) ? (
                                        exp.description.map((item, idx) => (
                                            <View key={idx} style={styles.bulletPoint}>
                                                <View style={styles.bullet} />
                                                <Text style={styles.bulletText}>{item}</Text>
                                            </View>
                                        ))
                                    ) : (
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
                )}

                {/* Certificações */}
                {certifications && certifications.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Certificações e Cursos</Text>
                        {certifications.map((cert, index) => (
                            <View key={index} style={styles.educationItem}>
                                <Text style={styles.degree}>{cert.name}</Text>
                                <Text style={styles.institution}>{cert.issuer} - {formatDate(cert.date)}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Idiomas */}
                {languages && languages.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Idiomas</Text>
                        <Text style={styles.skillItem}>
                            {languages.map(lang => `${lang.language} (${lang.proficiency})`).join(' • ')}
                        </Text>
                    </View>
                )}
            </Page>
        </Document>
    );
};
