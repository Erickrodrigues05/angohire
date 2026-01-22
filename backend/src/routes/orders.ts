import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { supabase } from '../config/supabase.js';
import { resumeGenerator } from '../services/resume-generator.js';
import { uploadResumePDF } from '../config/supabase.js';
import { emailService } from '../services/email.service.js';

const router = Router();

// Middleware de Autenticação Admin Simples
const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const adminToken = req.headers['x-admin-token'];
  // Em produção, isso deve estar no .env
  const VALID_TOKEN = process.env.ADMIN_TOKEN || 'admin123';

  if (adminToken === VALID_TOKEN) {
    next();
  } else {
    res.status(401).json({ success: false, error: 'Não autorizado' });
  }
};

// Schema para criar pedido
const CreateOrderSchema = z.object({
  package: z.enum(['basic', 'standard', 'professional', 'combo', 'cover-letter']),
  template: z.string().default('modern-professional'),
  personalInfo: z.object({
    fullName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    location: z.string(),
    professionalTitle: z.string(),
    linkedIn: z.string().optional(),
  }),
  summary: z.string().optional(),
  experience: z.array(z.any()),
  education: z.array(z.any()),
  skills: z.array(z.any()),
});

// Mapeamento de preços
const packagePrices: Record<string, number> = {
  'basic': 0,
  'standard': 2790,
  'professional': 5500,
  'combo': 8000,
  'cover-letter': 3500,
};

// Função auxiliar para gerar e salvar PDF
async function generateAndUploadOrderPDF(orderId: string, clientData: any, template: string) {
  // Sanitizar dados
  const sanitizeExperience = (exp: any[]) => {
    if (!Array.isArray(exp)) return [];
    return exp.map(e => ({
      ...e,
      description: Array.isArray(e.description) ? e.description : [(e.description || '').toString()]
    }));
  };

  const resumeData = {
    personalInfo: clientData.personalInfo,
    summary: clientData.summary || 'Profissional dedicado.',
    experience: sanitizeExperience(clientData.experience),
    education: Array.isArray(clientData.education) ? clientData.education : [],
    skills: Array.isArray(clientData.skills) ? clientData.skills : [],
  };

  // Gerar
  const result = await resumeGenerator.generate({
    data: resumeData as any,
    template: (template || 'modern-professional') as any,
  });

  if (!result.success || !result.pdfBuffer) {
    throw new Error('Falha na geração do PDF: ' + result.error);
  }

  // Upload
  const pdfUrl = await uploadResumePDF(orderId, result.pdfBuffer);
  if (!pdfUrl) throw new Error('Falha no upload do PDF');

  return pdfUrl;
}

/**
 * POST /api/orders/create
 * Cria um novo pedido
 */
router.post('/create', async (req: Request, res: Response) => {
  try {
    const validation = CreateOrderSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        details: validation.error.errors,
      });
    }

    const orderData = validation.data;
    const price = packagePrices[orderData.package] ?? 5500;
    const isFree = price === 0 || orderData.package === 'basic';

    // Status inicial depende se é grátis
    const initialStatus = isFree ? 'processing' : 'pending';

    // Criar pedido no Supabase
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        package: orderData.package,
        template: orderData.template,
        price: price,
        client_data: orderData,
        status: initialStatus,
        // Se for grátis, já marca como pago agora mesmo
        paid_at: isFree ? new Date().toISOString() : null
      })
      .select()
      .single();

    if (error) throw error;

    // SE FOR GRÁTIS: Gerar PDF Automaticamente AGORA
    if (isFree) {
      // Executar em background para não travar a resposta HTTP
      (async () => {
        try {
          console.log(`⚡ Auto-gerando PDF para pedido Grátis ${order.id}`);
          const pdfUrl = await generateAndUploadOrderPDF(order.id, orderData, orderData.template);

          // Atualizar pedido
          await supabase.from('orders').update({
            status: 'completed',
            pdf_url: pdfUrl,
            completed_at: new Date().toISOString(),
            pdf_generated_at: new Date().toISOString()
          }).eq('id', order.id);

          // Enviar Email
          await emailService.sendResumeEmail(
            orderData.personalInfo.email,
            orderData.personalInfo.fullName,
            pdfUrl
          );
          console.log(`✅ Pedido Grátis ${order.id} concluído com sucesso.`);

        } catch (err) {
          console.error(`❌ Erro no processamento automático do pedido ${order.id}:`, err);
        }
      })();
    }

    res.json({
      success: true,
      orderId: order.id,
      isFree: isFree,
      message: isFree ? 'O seu currículo está a ser gerado!' : 'Pedido criado! Aguardando pagamento.',
      bankAccount: process.env.BANK_ACCOUNT || '005100002786460610174',
      whatsapp: process.env.ADMIN_WHATSAPP || '+244945625060',
    });

  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao processar pedido',
    });
  }
});

/**
 * GET /api/orders/list
 * Lista todos os pedidos (PROTEGIDO)
 */
router.get('/list', adminAuth, async (req: Request, res: Response) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      orders,
    });

  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar pedidos',
    });
  }
});

/**
 * GET /api/orders/:id
 * Obter detalhes de um pedido (Público, mas apenas com ID)
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!order) return res.status(404).json({ success: false, error: 'Não encontrado' });

    res.json({ success: true, order });

  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao buscar pedido' });
  }
});

/**
 * POST /api/orders/:id/confirm-payment
 * Confirma pagamento e gera PDF (PROTEGIDO)
 */
router.post('/:id/confirm-payment', adminAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Buscar pedido
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !order) {
      return res.status(404).json({ success: false, error: 'Pedido não encontrado' });
    }

    // Atualizar pago
    await supabase.from('orders').update({
      status: 'processing',
      paid_at: new Date().toISOString(),
    }).eq('id', id);

    // Gerar PDF
    console.log('📄 Gerando PDF para pedido:', id);
    const pdfUrl = await generateAndUploadOrderPDF(id, order.client_data, order.template);

    // Finalizar
    await supabase.from('orders').update({
      status: 'completed',
      pdf_url: pdfUrl,
      pdf_generated_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
    }).eq('id', id);

    // Enviar Email
    const emailSent = await emailService.sendResumeEmail(
      order.client_data?.personalInfo?.email,
      order.client_data?.personalInfo?.fullName,
      pdfUrl
    );

    res.json({
      success: true,
      message: 'Pagamento confirmado e PDF gerado!',
      pdfUrl,
      emailSent
    });

  } catch (error) {
    console.error('Erro ao confirmar pagamento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao processar confirmação',
    });
  }
});

// Download endpoint
router.get('/:id/download-pdf', async (req: Request, res: Response) => {
  // ... manter lógica original ou simplificar ...
  // Como a URL é pública no Supabase, o frontend pode usar o link direto.
  // Mas mantemos para compatibilidade.
  try {
    const { id } = req.params;
    const { data: order } = await supabase.from('orders').select('pdf_url').eq('id', id).single();
    if (order?.pdf_url) res.redirect(order.pdf_url);
    else res.status(404).send('PDF não encontrado');
  } catch {
    res.status(500).send('Erro');
  }
});

export default router;
