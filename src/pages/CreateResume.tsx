import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, FileText, Award } from 'lucide-react';
import { Step3ExperienceForm } from '../components/Step3ExperienceForm';
import { Step4EducationSkillsForm } from '../components/Step4EducationSkillsForm';

// Types para cada step
interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    professionalTitle: string;
    linkedIn?: string;
}

interface Experience {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    isCurrentJob: boolean;
    description: string; // Changed from string[] to string
}

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

export const CreateResume = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedPackage, setSelectedPackage] = useState<'professional' | 'combo' | 'cover-letter'>('professional');

    // Form data
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        professionalTitle: '',
        linkedIn: ''
    });

    const [experience, setExperience] = useState<Experience[]>([
        {
            company: '',
            position: '',
            location: '',
            startDate: '',
            endDate: '',
            isCurrentJob: false,
            description: '' // Changed from [''] to ''
        }
    ]);

    const [education, setEducation] = useState<Education[]>([
        {
            institution: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: '',
            grade: ''
        }
    ]);

    const [skills, setSkills] = useState<Skills[]>([
        { category: 'Competências Técnicas', skills: [] }
    ]);

    const [summary] = useState('');

    const totalSteps = 5;

    const packages = [
        {
            id: 'professional',
            title: 'Currículo Profissional',
            price: '5.500 Kz',
            icon: <FileText className="w-6 h-6" />
        },
        {
            id: 'combo',
            title: 'Pack Carreira (Combo)',
            price: '8.000 Kz',
            popular: true,
            icon: <Award className="w-6 h-6" />
        },
        {
            id: 'cover-letter',
            title: 'Carta de Interesse',
            price: '3.500 Kz',
            icon: <FileText className="w-6 h-6" />
        }
    ];

    const nextStep = () => {
        if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async () => {
        console.log('🚀 Iniciando submit do pedido...');

        // Preparar dados para enviar ao backend
        const orderData = {
            package: selectedPackage,
            personalInfo,
            summary,
            experience,
            education,
            skills,
            template: 'modern-professional' // Default
        };

        console.log('📦 Dados do pedido:', orderData);

        try {
            console.log('📡 Enviando para backend...');
            const response = await fetch('http://localhost:3001/api/orders/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            console.log('📨 Resposta recebida:', response.status);
            const data = await response.json();
            console.log('📄 Dados da resposta:', data);

            if (data.success) {
                console.log('✅ Pedido criado! ID:', data.orderId);
                // Redirecionar para página de pagamento
                window.location.href = `/pagamento/${data.orderId}`;
            } else {
                console.error('❌ Erro do servidor:', data.error);
                alert('Erro: ' + (data.error || 'Erro desconhecido'));
            }
        } catch (error) {
            console.error('❌ Erro ao criar pedido:', error);
            alert('Erro ao processar pedido. Verifique sua conexão e tente novamente.');
        }
    };

    return (
        <div className="min-h-screen bg-dark text-white py-20">
            <div className="max-w-4xl mx-auto px-4">
                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-4">
                        {[1, 2, 3, 4, 5].map((step) => (
                            <div key={step} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step <= currentStep ? 'bg-primary text-dark' : 'bg-white/10 text-gray-500'
                                    }`}>
                                    {step < currentStep ? <Check className="w-5 h-5" /> : step}
                                </div>
                                {step < 5 && (
                                    <div className={`h-1 w-12 mx-2 transition-all ${step < currentStep ? 'bg-primary' : 'bg-white/10'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-gray-400">
                        Passo {currentStep} de {totalSteps}
                    </p>
                </div>

                {/* Form Steps */}
                <AnimatePresence mode="wait">
                    {/* Step 1: Escolher Pacote */}
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-bold mb-6">Escolhe o Teu Pacote</h2>

                            <div className="grid md:grid-cols-3 gap-6">
                                {packages.map((pkg) => (
                                    <button
                                        key={pkg.id}
                                        onClick={() => setSelectedPackage(pkg.id as any)}
                                        className={`p-6 rounded-xl border-2 transition-all text-left ${selectedPackage === pkg.id
                                            ? 'border-primary bg-primary/10'
                                            : 'border-white/10 hover:border-primary/50'
                                            }`}
                                    >
                                        {pkg.popular && (
                                            <span className="bg-primary text-dark text-xs px-2 py-1 rounded-full mb-2 inline-block">
                                                Popular
                                            </span>
                                        )}
                                        <div className="mb-4">{pkg.icon}</div>
                                        <h3 className="font-bold mb-2">{pkg.title}</h3>
                                        <p className="text-2xl font-bold text-primary">{pkg.price}</p>
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={nextStep}
                                className="w-full bg-primary text-dark font-bold py-4 rounded-lg hover:bg-primary-300 transition-colors flex items-center justify-center gap-2"
                            >
                                Continuar
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    )}

                    {/* Step 2: Dados Pessoais */}
                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="w-8 h-8 text-primary" />
                                <h2 className="text-3xl font-bold">Dados Pessoais</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Nome Completo *</label>
                                    <input
                                        type="text"
                                        value={personalInfo.fullName}
                                        onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none"
                                        placeholder="João Silva"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Email *</label>
                                    <input
                                        type="email"
                                        value={personalInfo.email}
                                        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none"
                                        placeholder="joao@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">WhatsApp *</label>
                                    <input
                                        type="tel"
                                        value={personalInfo.phone}
                                        onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none"
                                        placeholder="+244 923 456 789"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Localização *</label>
                                    <input
                                        type="text"
                                        value={personalInfo.location}
                                        onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none"
                                        placeholder="Luanda, Angola"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">Título Profissional *</label>
                                    <input
                                        type="text"
                                        value={personalInfo.professionalTitle}
                                        onChange={(e) => setPersonalInfo({ ...personalInfo, professionalTitle: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none"
                                        placeholder="Ex: Analista de Marketing Digital"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">LinkedIn (Opcional)</label>
                                    <input
                                        type="url"
                                        value={personalInfo.linkedIn}
                                        onChange={(e) => setPersonalInfo({ ...personalInfo, linkedIn: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none"
                                        placeholder="https://linkedin.com/in/seuusername"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={prevStep}
                                    className="flex-1 bg-white/5 border border-white/10 font-bold py-4 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    Voltar
                                </button>
                                <button
                                    onClick={nextStep}
                                    className="flex-1 bg-primary text-dark font-bold py-4 rounded-lg hover:bg-primary-300 transition-colors flex items-center justify-center gap-2"
                                >
                                    Continuar
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Experiência Profissional */}
                    {currentStep === 3 && (
                        <Step3ExperienceForm
                            experience={experience}
                            setExperience={setExperience}
                            onNext={nextStep}
                            onPrev={prevStep}
                        />
                    )}

                    {/* Step 4: Educação e Competências */}
                    {currentStep === 4 && (
                        <Step4EducationSkillsForm
                            education={education}
                            setEducation={setEducation}
                            skills={skills}
                            setSkills={setSkills}
                            onNext={nextStep}
                            onPrev={prevStep}
                        />
                    )}

                    {/* Step 5: Finalizar e Pagamento */}
                    {currentStep === 5 && (
                        <motion.div
                            key="step5"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-bold mb-6">Finalizar Pedido</h2>

                            <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                                <h3 className="font-bold text-xl mb-4">Instruções de Pagamento</h3>
                                <div className="space-y-3 text-sm">
                                    <p>1. Faz transferência bancária para:</p>
                                    <div className="bg-dark rounded-lg p-4 font-mono">
                                        <p>IBAN: <span className="text-primary font-bold">005100002786460610174</span></p>
                                        <p>Titular: Erik Viegas Rodrigues</p>
                                    </div>
                                    <p>2. Tira print do comprovante</p>
                                    <p>3. Envia para nosso WhatsApp: <span className="text-primary font-bold">+244 945 625 060</span></p>
                                    <p>4. Receberás teu currículo em 24-48h após confirmação!</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={prevStep}
                                    className="flex-1 bg-white/5 border border-white/10 font-bold py-4 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    Voltar
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="flex-1 bg-primary text-dark font-bold py-4 rounded-lg hover:bg-primary-300 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Check className="w-5 h-5" />
                                    Confirmar Pedido
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
