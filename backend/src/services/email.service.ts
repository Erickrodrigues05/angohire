import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configuração do Transportador (Gmail ou SMTP genérico)
// Para Gmail, é ideal usar "App Password" se 2FA estiver ativado
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const emailService = {
    /**
     * Envia o currículo PDF por email
     */
    async sendResumeEmail(to: string, clientName: string, pdfUrl: string) {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('⚠️ Email credentials missing. Skipping email send.');
            return false;
        }

        try {
            const mailOptions = {
                from: '"AngoHire Team" <noreply@angohire.com>',
                to: to,
                subject: '🚀 Seu Currículo Profissional AngoHire Chegou!',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
                        <h2 style="color: #FFD700;">Olá, ${clientName}!</h2>
                        <p>O seu currículo profissional foi gerado com sucesso.</p>
                        <p>Este é o primeiro passo para conquistar a vaga dos seus sonhos. Não esqueça de sempre adaptar o currículo para cada vaga!</p>
                        
                        <div style="margin: 30px 0;">
                            <a href="${pdfUrl}" style="background-color: #FFD700; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Baixar Currículo PDF</a>
                        </div>

                        <p>Se tiver alguma dúvida, respondas a este email.</p>
                        <p>Boa sorte!<br>Equipa AngoHire</p>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
            console.log(`📧 Email enviado com sucesso para ${to}`);
            return true;
        } catch (error) {
            console.error('❌ Erro ao enviar email:', error);
            return false;
        }
    },

    /**
     * Verifica se o serviço de email está configurado
     */
    async verifyConnection() {
        try {
            await transporter.verify();
            console.log('✅ Servidor de email pronto');
            return true;
        } catch (error) {
            console.error('❌ Erro na conexão de email:', error);
            return false;
        }
    }
};
