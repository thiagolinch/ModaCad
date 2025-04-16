// src/services/analytics.service.ts
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { protos } from '@google-analytics/data';

import { inject } from 'tsyringe';
import { IArticlesRepository } from '../../../../../Modules/Posts/repository/IArticlesRepository';

function normalizeTitle(title: string): string {
  return title
    .replace(/\bblogModacad\b/gi, '')       // remove 'blogModacad' (qualquer posição)
    .replace(/[.!?]+$/, '')                 // remove pontuação no final
    .replace(/\s{2,}/g, ' ')                // normaliza múltiplos espaços
    .trim();   
}

export class AnalyticsService {
  private analyticsClient: BetaAnalyticsDataClient;

  constructor(
    @inject("ArticleRepository")
    private articleRepo: IArticlesRepository,
    private propertyId: string,
    private credentialsPath: string
  ) {
    this.analyticsClient = new BetaAnalyticsDataClient({
      keyFilename: this.credentialsPath,
    });
  }

  async updatePostsViewCount(): Promise<void> {
    const posts = await this.articleRepo.findAllPublished();

    const requestBody = {
      property: `properties/${this.propertyId}`,
      dateRanges: [
        {
          startDate: "365daysAgo",
          endDate: "today",
        },
      ],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [
        {
          metric: {
            metricName: 'screenPageViews',
          },
          desc: true,
        },
      ],
      limit: 100,
    };

    const [response] = await this.analyticsClient.runReport(requestBody);

    if (response.rows) {
      for (const row of response.rows) {
        const rawPath = row.dimensionValues?.[0]?.value;
        const views = parseInt(row.metricValues?.[0]?.value || '0');
        console.log("rawPath", rawPath, "views", views);

        if (!rawPath) {
          console.warn("Linha ignorada, sem pagePath:", row);
          continue;
        }

        if (rawPath && views) {
          const matchedPost = posts.find(
	          (post) =>
              `/${post.canonicalUrl}` === rawPath ||
              `/posts/${post.canonicalUrl}` === rawPath
 
          );
          console.log("matchedPost", matchedPost);

          if (matchedPost) {
            await this.articleRepo.updateViews(matchedPost.id!, views);
          }
        }
      }
    }
  }
}
