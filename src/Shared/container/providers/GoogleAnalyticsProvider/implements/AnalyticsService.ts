// src/services/analytics.service.ts
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { Articles } from '../../../../../Modules/Posts/entity/Articles';
import { inject } from 'tsyringe';
import { IArticlesRepository } from '../../../../../Modules/Posts/repository/IArticlesRepository';

function normalizeTitle(title: string): string {
  return title
    .replace(/blogModacad/i, '') // remove sufixo
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
    console.log("propertyId", this.propertyId);

    const requestBody = {
      property: `properties/${this.propertyId}`,
      dateRanges: [
        {
          startDate: "365daysAgo",
          endDate: "today",
        },
      ],
      dimensions: [
        {
          name: "pageTitle",
        },
      ],
      metrics: [
        {
          name: "screenPageViews",
        },
      ],
      limit: 30,
      orderBys: [
        {
          metric: { metricName: "screenPageViews" },
          desc: true, // <- ordena do mais visto pro menos visto
        },
      ],  
    };

    const [response] = await this.analyticsClient.runReport(requestBody);

    if (response.rows) {
      for (const row of response.rows) {
        const rawTitle = row.dimensionValues?.[0]?.value;
        const views = parseInt(row.metricValues?.[0]?.value || '0');

        if (!rawTitle) {
          console.warn("Linha ignorada, sem pageTitle:", row);
          continue;
        }
	console.log(posts)
        if (rawTitle && views) {
          const matchedPost = posts.find(
	   (post) => normalizeTitle(post.title || '') === normalizeTitle(rawTitle || '')
          );
		console.log("match: ", matchedPost)
          if (matchedPost) {
            await this.articleRepo.updateViews(matchedPost.id!, views);
          }
        }
      }
    }
  }
}
