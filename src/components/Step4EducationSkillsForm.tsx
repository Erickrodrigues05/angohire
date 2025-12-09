import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, ArrowLeft, Check, X } from 'lucide-react';

interface Education {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    grade?: string;
}

interface Skills {
    category: string;
    skills: string[];
}

interface Step4Props {
    education: Education[];
    setEducation: (edu: Education[]) => void;
    skills: Skills[];
    setSkills: (skills: Skills[]) => void;
    onNext: () => void;
    onPrev: () => void;
}

export const Step4EducationSkillsForm = ({ education, setEducation, skills, setSkills, onNext, onPrev }: Step4Props) => {
    const [newSkill, setNewSkill] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(0);

    // Education functions
    const addEducation = () => {
        setEducation([...education, {
            institution: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: '',
            grade: ''
        }]);
    };

    const removeEducation = (index: number) => {
        if (education.length > 1) {
            setEducation(education.filter((_, i) => i !== index));
        }
    };

    const updateEducation = (index: number, field: keyof Education, value: any) => {
        const updated = [...education];
        updated[index] = { ...updated[index], [field]: value };
        setEducation(updated);
    };

    // Skills functions
    const addSkillCategory = () => {
        setSkills([...skills, { category: '', skills: [] }]);
    };

    const removeSkillCategory = (index: number) => {
        if (skills.length > 1) {
            setSkills(skills.filter((_, i) => i !== index));
        }
    };

    const updateCategory = (index: number, category: string) => {
        const updated = [...skills];
        updated[index].category = category;
        setSkills(updated);
    };

    const addSkill = (categoryIndex: number) => {
        if (newSkill.trim()) {
            const updated = [...skills];
            updated[categoryIndex].skills.push(newSkill.trim());
            setSkills(updated);
            setNewSkill('');
        }
    };

    const removeSkill = (categoryIndex: number, skillIndex: number) => {
        const updated = [...skills];
        updated[categoryIndex].skills = updated[categoryIndex].skills.filter((_, i) => i !== skillIndex);
        setSkills(updated);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <h2 className="text-3xl font-bold mb-6">Educação e Competências</h2>

            {/* EDUCAÇÃO */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary">Formação Acadêmica</h3>

                {education.map((edu, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold">Formação {index + 1}</h4>
                            {education.length > 1 && (
                                <button
                                    onClick={() => removeEducation(index)}
                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Instituição *</label>
                                <input
                                    type="text"
                                    value={edu.institution}
                                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none"
                                    placeholder="Nome da Universidade/Escola"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Grau/Diploma *</label>
                                <input
                                    type="text"
                                    value={edu.degree}
                                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none"
                                    placeholder="Ex: Licenciatura, Mestrado..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Curso/Área *</label>
                                <input
                                    type="text"
                                    value={edu.field}
                                    onChange={(e) => updateEducation(index, 'field', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none"
                                    placeholder="Ex: Engenharia Informática"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Data Início</label>
                                <input
                                    type="month"
                                    value={edu.startDate}
                                    onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Data Fim</label>
                                <input
                                    type="month"
                                    value={edu.endDate}
                                    onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    onClick={addEducation}
                    className="w-full border-2 border-dashed border-white/20 hover:border-primary/50 rounded-xl py-4 text-gray-400 hover:text-primary transition-colors flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Adicionar Formação
                </button>
            </div>

            {/* COMPETÊNCIAS */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary">Competências e Skills</h3>

                {skills.map((skillGroup, catIndex) => (
                    <div key={catIndex} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <input
                                type="text"
                                value={skillGroup.category}
                                onChange={(e) => updateCategory(catIndex, e.target.value)}
                                className="flex-1 bg-transparent border-b border-white/20 px-2 py-1 font-bold focus:border-primary outline-none"
                                placeholder="Nome da Categoria (ex: Competências Técnicas, Soft Skills, Idiomas...)"
                            />
                            {skills.length > 1 && (
                                <button
                                    onClick={() => removeSkillCategory(catIndex)}
                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-4"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={selectedCategory === catIndex ? newSkill : ''}
                                onChange={(e) => {
                                    setSelectedCategory(catIndex);
                                    setNewSkill(e.target.value);
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addSkill(catIndex);
                                    }
                                }}
                                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-primary outline-none"
                                placeholder="Digite uma competência e pressione Enter"
                                onFocus={() => setSelectedCategory(catIndex)}
                            />
                            <button
                                onClick={() => addSkill(catIndex)}
                                className="px-4 py-2 bg-primary text-dark rounded-lg hover:bg-primary-300 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {skillGroup.skills.map((skill, skillIndex) => (
                                <span
                                    key={skillIndex}
                                    className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-sm"
                                >
                                    {skill}
                                    <button
                                        onClick={() => removeSkill(catIndex, skillIndex)}
                                        className="hover:text-red-400 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    onClick={addSkillCategory}
                    className="w-full border-2 border-dashed border-white/20 hover:border-primary/50 rounded-xl py-4 text-gray-400 hover:text-primary transition-colors flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Adicionar Categoria de Competências
                </button>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={onPrev}
                    className="flex-1 bg-white/5 border border-white/10 font-bold py-4 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar
                </button>
                <button
                    onClick={onNext}
                    className="flex-1 bg-primary text-dark font-bold py-4 rounded-lg hover:bg-primary-300 transition-colors flex items-center justify-center gap-2"
                >
                    Continuar
                    <Check className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    );
};
