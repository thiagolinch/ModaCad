// src/services/scheduler.service.ts
import cron from 'node-cron';
import { AnalyticsService } from './AnalyticsService';
import { container } from 'tsyringe';
import { IArticlesRepository } from '../../../../../Modules/Posts/repository/IArticlesRepository';

export class SchedulerService {
  private analyticsService: AnalyticsService;

  constructor() {
    const articleRepository = container.resolve<IArticlesRepository>("ArticleRepository");
    this.analyticsService = new AnalyticsService(
      articleRepository,
      process.env.GA_PROPERTY_ID!,
      process.env.GA_CREDENTIALS_PATH!
    );
  }

  start() {
    // Toda segunda-feira às 3h
    cron.schedule('0 3 * * 1', async () => {
      console.log('Atualizando visualizações dos posts...');
      try {
        await this.analyticsService.updatePostsViewCount();
        console.log('Visualizações atualizadas com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar visualizações:', error);
      }
    });
  }
}