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
    const postRepo = new ArticleRepository();
    let isAdmin = false;
    let admin_id: string | null = null;

    if (authHeader) {
      const [, token] = authHeader.split(" ");

      try {
        const payload = verify(token, '88f1c14bd2a14b42fad21d64739889e9') as IPayload;
        admin_id = payload.subject;

        const adminRepo = new AdminRepository();
        const user = await adminRepo.findById(admin_id);

        if (user?.role && ['administrador', 'autor', 'editor', 'curador'].includes(user.role)) {
          isAdmin = true;
        }
      } catch (err) {
        console.warn('Token inválido no middleware de contagem de views.');

      }
      
    }

    if (!isAdmin) {   
      const postId = req.params.identifier;
      if (!postId) {
        console.warn('Identifier ausente na rota!');
        return next();
      }
      
      console.log("'Identifier recebido:",postId);
 
      let currentPost: Articles | undefined;
    
      if (validateUUID(postId)) {
          currentPost = await postRepo.findById(postId);
      } else {
        currentPost = await postRepo.findByCanonicalUrl(postId) ||
                      await postRepo.findByCanonicalUrl(`${postId}/`);
      }

      if (!currentPost) {
        console.warn(`⚠️ Nenhum post encontrado com identifier: ${postId}`);
        return next();
      }
    
      const updatedClicks = (currentPost.clicks_count ?? 0) + 1;
      console.log(`Atualizando cliques: Post ID: ${currentPost.id}, Antes: ${currentPost.clicks_count}, Depois: ${updatedClicks}`);

      await postRepo.updateViews(currentPost.id, currentPost.viewCount, updatedClicks);
    }
    

    return next();
  } catch (error) {
    console.error('Erro ao contar visualização:', error);
    next();
  }
}

