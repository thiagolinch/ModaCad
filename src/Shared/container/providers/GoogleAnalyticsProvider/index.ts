import cron from 'node-cron';

// Agenda para rodar diariamente às 3h
cron.schedule('0 3 * * *', async () => {
  console.log('Atualizando conteúdos mais acessados...');
  try {
    const propertyId = 'YOUR_GA4_PROPERTY_ID';
    const credentialsPath = 'path/to/your/credentials.json';
    
    const analyticsService = new AnalyticsService(propertyId, credentialsPath);
    const contentService = new ContentService();
    
    const topContent = await analyticsService.getTopContent(30, 10);
    await contentService.saveTopContent(topContent);
    
    console.log('Conteúdos atualizados com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar conteúdos:', error);
  }
});

console.log('Agendador de atualização de conteúdos iniciado...');