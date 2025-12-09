import { createClient } from '@supabase/supabase-js';
import { config } from './temp-config.js';

// Usando configuração temporária (hardcoded)
// TODO: Mover para .env quando resolver problema de gitignore
// Usando serviceKey para permitir operações administrativas (bypass RLS)
const supabaseUrl = config.supabase.url;
const supabaseKey = config.supabase.serviceKey || config.supabase.anonKey;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials missing!');
  throw new Error('Supabase not configured');
}

console.log('✅ Supabase configurado:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper para upload de PDFs
export async function uploadResumePDF(orderId: string, pdfBuffer: Buffer): Promise<string | null> {
  try {
    const filename = `${orderId}-${Date.now()}.pdf`;
    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(filename, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: false
      });

    if (error) throw error;

    // Retornar URL pública
    const { data: publicData } = supabase.storage
      .from('resumes')
      .getPublicUrl(filename);

    return publicData.publicUrl;
  } catch (error) {
    console.error('Erro ao fazer upload do PDF:', error);
    return null;
  }
}
