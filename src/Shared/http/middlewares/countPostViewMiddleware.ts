import { verify } from 'jsonwebtoken';
import { validate as validateUUID } from 'uuid';

import { Request, Response, NextFunction } from 'express';
import { AdminRepository } from '../../../Modules/Admins/repositories/implements/AdminsRepository';
import { ArticleRepository } from '../../../Modules/Posts/repository/implements/ArticlesRepository';
import { Articles } from 'Modules/Posts/entity/Articles';

interface IPayload {
  subject: string;
  role: string;
}

export async function countPostViewMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization
    let isAdmin = false;

    if (authHeader) {
      const [, token] = authHeader.split(" ");

      const { subject: admin_id } = verify(token, "88f1c14bd2a14b42fad21d64739889e9") as IPayload;

      const adminRepo = new AdminRepository();
      const user = await adminRepo.findById(admin_id);

      if (user?.role && ['administrador', 'autor', 'editor', 'curador'].includes(user.role)) {
        isAdmin = true;
      }
    }   

    const postRepo = new ArticleRepository();

    if (!isAdmin) {
      const postId = req.params.identifier;
      console.log(postId, 'postId do middleware countPostViewMiddleware');
    
      let currentPost = {} as Articles;
    
      if (validateUUID(postId)) {
        const post = await postRepo.findById(postId);
        currentPost = post;
      } else {
        currentPost = await postRepo.findByCanonicalUrl(postId);
    
        if (!currentPost) {
          const alternativeUrl = `${postId}/`;
          currentPost = await postRepo.findByCanonicalUrl(alternativeUrl);
    
          if (!currentPost) {
            console.warn(`Post com ID ou URL ${postId} não encontrado`);
            return next();
          }
        }
      }
    
      const updatedClicks = currentPost.clicks_count + 1;
      await postRepo.updateViews(currentPost.id, currentPost.viewCount, updatedClicks);
    }
    

    next();
  } catch (error) {
    console.error('Erro ao contar visualização:', error);
    next();
  }
}

