import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { supabase } from '../config/supabase.js';
import { ResumeDataSchema } from '../types/resume.types.js';
import { resumeGenerator } from '../services/resume-generator.js';
import { uploadResumePDF } from '../config/supabase.js';

const router = Router();

// Schema para criar pedido
const CreateOrderSchema = z.object({
  package: z.enum(['professional', 'combo', 'cover-letter']),
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
  'professional': 5500,
  'combo': 8000,
  'cover-letter': 3500,
};

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
    const price = packagePrices[orderData.package];

    // Criar pedido no Supabase
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        package: orderData.package,
        template: orderData.template,
        price: price,
        client_data: orderData,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      orderId: order.id,
      message: 'Pedido criado com sucesso!',
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
 * Lista todos os pedidos (para admin)
 */
router.get('/list', async (req: Request, res: Response) => {
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
 * Obter detalhes de um pedido
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

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Pedido não encontrado',
      });
    }

    res.json({
      success: true,
      order,
    });

  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar pedido',
    });
  }
});

/**
 * POST /api/orders/:id/confirm-payment
 * Confirma pagamento e gera PDF automaticamente
 */
router.post('/:id/confirm-payment', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Buscar pedido
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Pedido não encontrado',
      });
    }

    // Atualizar status para "paid"
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'processing',
        paid_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (updateError) throw updateError;

    // Gerar PDF automaticamente
    console.log('📄 Gerando PDF para pedido:', id);

    const clientData = order.client_data;
    // Sanitizar dados para evitar falhas no template
    const sanitizeExperience = (exp: any[]) => {
      if (!Array.isArray(exp)) return [];
      return exp.map(e => ({
        ...e,
        description: Array.isArray(e.description) ? e.description : [(e.description || '').toString()]
      }));
    };

    const resumeData = {
      personalInfo: clientData.personalInfo,
      summary: clientData.summary || 'Profissional dedicado e comprometido.',
      experience: sanitizeExperience(clientData.experience),
      education: Array.isArray(clientData.education) ? clientData.education : [],
      skills: Array.isArray(clientData.skills) ? clientData.skills : [],
    };

    console.log('📝 Dados sanitizados para PDF:', JSON.stringify(resumeData, null, 2));

    const result = await resumeGenerator.generate({
      data: resumeData as any,
      template: (order.template || 'modern-professional') as any,
    });

    if (!result.success || !result.pdfBuffer) {
      throw new Error('Falha ao gerar PDF');
    }

    // Upload do PDF para Supabase Storage
    const pdfUrl = await uploadResumePDF(id, result.pdfBuffer);

    if (!pdfUrl) {
      throw new Error('Falha ao fazer upload do PDF');
    }

    // Atualizar pedido com PDF gerado
    const { error: finalUpdateError } = await supabase
      .from('orders')
      .update({
        status: 'completed',
        pdf_url: pdfUrl,
        pdf_generated_at: new Date().toISOString(),
        completed_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (finalUpdateError) throw finalUpdateError;

    res.json({
      success: true,
      message: 'Pagamento confirmado e PDF gerado!',
      pdfUrl,
    });

  } catch (error) {
    console.error('Erro ao confirmar pagamento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao processar confirmação',
    });
  }
});

/**
 * GET /api/orders/:id/download-pdf
 * Download do PDF gerado
 */
router.get('/:id/download-pdf', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data: order, error } = await supabase
      .from('orders')
      .select('pdf_url, client_data')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!order || !order.pdf_url) {
      return res.status(404).json({
        success: false,
        error: 'PDF não encontrado',
      });
    }

    // Redirecionar para URL pública do PDF
    res.redirect(order.pdf_url);

  } catch (error) {
    console.error('Erro ao baixar PDF:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao baixar PDF',
    });
  }
});

export default router;
