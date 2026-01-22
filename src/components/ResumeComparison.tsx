import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';

export const ResumeComparison = () => {
    const [sliderPosition, setSliderPosition] = useState(50);



    return (
        <section className="py-20 bg-dark/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4"
                    >
                        <ArrowLeftRight className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary uppercase tracking-wider">
                            Antes vs Depois
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        A Diferença é <span className="text-primary">Visível</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Veja como transformamos currículos comuns em documentos de alto impacto visual que captam a atenção dos recrutadores.
                    </p>
                </div>

                <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                    {/* After Image (Right) */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/cv-after.png)', // Needs a placeholder image
                            backgroundColor: '#1a1a1a'
                        }}
                    >
                        <div className="absolute top-4 right-4 bg-primary text-dark px-3 py-1 rounded-full text-sm font-bold">
                            AngoHire
                        </div>
                        {/* Placeholder content if image fails */}
                        <div className="flex flex-col items-center justify-center w-full h-full text-gray-500 opacity-20">
                            <span className="text-6xl font-bold">DEPOIS</span>
                        </div>
                    </div>

                    {/* Before Image (Left - Clipped) */}
                    <div
                        className="absolute inset-0 bg-cover bg-center border-r-2 border-primary"
                        style={{
                            width: `${sliderPosition}%`,
                            backgroundImage: 'url(/cv-before.png)',  // Needs a placeholder image
                            backgroundColor: '#ffffff'
                        }}
                    >
                        <div className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold">
                            Word Comum
                        </div>
                        {/* Placeholder content if image fails */}
                        <div className="flex flex-col items-center justify-center w-full h-full text-gray-300 opacity-50">
                            <span className="text-6xl font-bold text-black">ANTES</span>
                        </div>
                    </div>

                    {/* Slider Handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-transparent cursor-ew-resize z-10"
                        style={{ left: `${sliderPosition}%` }}
                        onMouseDown={(e) => {
                            const handleMouseMove = (moveEvent: MouseEvent) => {
                                const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                                if (!rect) return;
                                const x = Math.max(0, Math.min(moveEvent.clientX - rect.left, rect.width));
                                setSliderPosition((x / rect.width) * 100);
                            };
                            const handleMouseUp = () => {
                                document.removeEventListener('mousemove', handleMouseMove);
                                document.removeEventListener('mouseup', handleMouseUp);
                            };
                            document.addEventListener('mousemove', handleMouseMove);
                            document.addEventListener('mouseup', handleMouseUp);
                        }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-ew-resize">
                            <ArrowLeftRight className="w-4 h-4 text-dark" />
                        </div>
                    </div>

                    {/* Touch support for slider */}
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderPosition}
                        onChange={(e) => setSliderPosition(Number(e.target.value))}
                        className="absolute bottom-4 left-4 right-4 z-20 opacity-0 md:opacity-0" // Hidden on desktop, could be fallback
                    />
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Arraste para comparar
                </p>
            </div>
        </section>
    );
};
