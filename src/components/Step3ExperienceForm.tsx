import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';

interface Experience {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    isCurrentJob: boolean;
    description: string;
}

interface Step3Props {
    experience: Experience[];
    setExperience: (exp: Experience[]) => void;
    onNext: () => void;
    onPrev: () => void;
}

export const Step3ExperienceForm = ({ experience, setExperience, onNext, onPrev }: Step3Props) => {
    const addExperience = () => {
        setExperience([...experience, {
            company: '',
            position: '',
            location: '',
            startDate: '',
            endDate: '',
            isCurrentJob: false,
            description: ''
        }]);
    };

    const removeExperience = (index: number) => {
        if (experience.length > 1) {
            setExperience(experience.filter((_, i) => i !== index));
        }
    };

    const updateExperience = (index: number, field: keyof Experience, value: any) => {
        const updated = [...experience];
        updated[index] = { ...updated[index], [field]: value };
        setExperience(updated);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <h2 className="text-3xl font-bold mb-6">Experiência Profissional</h2>

            {experience.map((exp, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">Experiência {index + 1}</h3>
                        {experience.length > 1 && (
                            <button
                                onClick={() => removeExperience(index)}
                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                title="Remover"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Empresa/Organização *</label>
                            <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none"
                                placeholder="Nome da empresa"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Cargo/Posição *</label>
                            <input
                                type="text"
                                value={exp.position}
                                onChange={(e) => updateExperience(index, 'position', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none"
                                placeholder="Ex: Desenvolvedor Full Stack"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Localização</label>
                            <input
                                type="text"
                                value={exp.location}
                                onChange={(e) => updateExperience(index, 'location', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none"
                                placeholder="Luanda, Angola"
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-2">Data Início *</label>
                                <input
                                    type="month"
                                    value={exp.startDate}
                                    onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-2">Data Fim</label>
                                <input
                                    type="month"
                                    value={exp.endDate}
                                    onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                                    disabled={exp.isCurrentJob}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={exp.isCurrentJob}
                                    onChange={(e) => updateExperience(index, 'isCurrentJob', e.target.checked)}
                                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary"
                                />
                                <span>Trabalho Atual</span>
                            </label>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Descrição das Responsabilidades</label>
                            <textarea
                                value={exp.description}
                                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none resize-none"
                                placeholder="Descreve as tuas principais responsabilidades e conquistas..."
                            />
                            <p className="text-xs text-gray-400 mt-1">Dica: Use frases que comecem com verbos de ação (gerenciei, desenvolvi, otimizei, etc.)</p>
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={addExperience}
                className="w-full border-2 border-dashed border-white/20 hover:border-primary/50 rounded-xl py-4 text-gray-400 hover:text-primary transition-colors flex items-center justify-center gap-2"
            >
                <Plus className="w-5 h-5" />
                Adicionar Outra Experiência
            </button>

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
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    );
};
