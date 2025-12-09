import { supabase } from './config/supabase.js';

async function testSupabaseConnection() {
    console.log('🧪 Testando conexão com Supabase...\n');

    try {
        // Teste 1: Verificar conexão
        const { data, error } = await supabase
            .from('orders')
            .select('count')
            .limit(1);

        if (error) {
            console.error('❌ Erro ao conectar:', error.message);
            return false;
        }

        console.log('✅ Conexão com Supabase bem-sucedida!');
        console.log('✅ Tabela "orders" acessível');

        // Teste 2: Verificar storage
        const { data: buckets, error: storageError } = await supabase
            .storage
            .listBuckets();

        if (storageError) {
            console.error('❌ Erro ao acessar storage:', storageError.message);
            return false;
        }

        const resumesBucket = buckets?.find(b => b.name === 'resumes');
        if (resumesBucket) {
            console.log('✅ Bucket "resumes" configurado');
        } else {
            console.warn('⚠️  Bucket "resumes" não encontrado');
        }

        console.log('\n🎉 Supabase configurado corretamente!\n');
        return true;

    } catch (error) {
        console.error('❌ Erro no teste:', error);
        return false;
    }
}

testSupabaseConnection().then(success => {
    process.exit(success ? 0 : 1);
});
