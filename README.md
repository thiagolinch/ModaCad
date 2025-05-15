# ModaCad Backend

## Visão Geral

Este projeto é o backend do ModaCad, desenvolvido em Node.js com TypeScript, utilizando Express, TypeORM, autenticação JWT, upload de arquivos, e integração com serviços externos como Google Analytics e pagamentos.

---

## Estrutura de Pastas

```
src/
  @types/           # Tipos customizados
  Config/           # Configurações (auth, redis, upload)
  Modules/          # Domínios principais (Admins, Assuntos, Posts)
    Admins/
    Assuntos/
    Posts/
  Shared/
    container/      # Injeção de dependências
    functions/      # Funções utilitárias
    http/           # Servidor, rotas, middlewares
    TypeOrm/        # Configuração do banco de dados
  utils/            # Utilitários diversos
tmp/                # Arquivos temporários (ex: uploads)
```

---

## Principais Módulos

- **Admins**: Gerenciamento de administradores, staff, perfis, pagamentos e planos.
- **Assuntos**: CRUD de assuntos (temas) dos posts.
- **Posts**: CRUD de artigos, imagens, tags, planos e funcionalidades relacionadas.

---

## Rotas Principai

As rotas estão organizadas em Routes:

- **Admin**: `/admin`
  - Criação, atualização, deleção e listagem de usuários/admins/staff
  - Upload de avatar
  - Exportação de membros
  - Gerenciamento de pagamentos e planos
  - Recuperação de senhas

- **Assuntos**: `/assuntos`
  - CRUD de assuntos

- **Posts**: `/posts`
  - CRUD de posts/artigos
  - Upload de imagens
  - Filtros, buscas, visualizações

- **Tags**: `/tags`
  - CRUD de tags

- **Planos**: `/planos`
  - CRUD de planos de assinatura

- **Pagamentos**: `/pagamentos`
  - Criação de pagamentos, planos recorrentes, feedback de pagamento

---

## Middlewares

- **Autenticação**: `ensureAuthenticate`, `ensureAdminAuhenticate`
- **Autorização**: `ensureAdministrador`, `staffCanWorkTag`, `validatePostPermissions`
- **Outros**: Upload de arquivos, contagem de visualizações, etc.

---

# :pushpin: Rotas

---

# Documentação das Rotas da API

---

## 1. **Assuntos (Subjects)**

- **Rota Inicial:** `/subjects`

### Criar Assunto
- **Método:** `POST`
- **Endpoint:** `/subjects`
- **Descrição:** Cria um novo assunto.
- **Autenticação:** Requer autenticação de administrador.

---

### Deletar Assunto por ID
- **Método:** `DELETE`
- **Endpoint:** `/subjects/:id`
- **Descrição:** Deleta um assunto pelo ID.
- **Autenticação:** Requer autenticação de administrador.

---

### Listar Todos os Assuntos
- **Método:** `GET`
- **Endpoint:** `/subjects`
- **Descrição:** Retorna a lista de todos os assuntos.

---

### Obter Assunto por ID
- **Método:** `GET`
- **Endpoint:** `/subjects/:id`
- **Descrição:** Retorna o assunto específico pelo ID.
- **Autenticação:** Requer autenticação de administrador.

---

### Atualizar Assunto por ID
- **Método:** `PUT`
- **Endpoint:** `/subjects/:id`
- **Descrição:** Atualiza um assunto específico pelo ID.
- **Autenticação:** Requer autenticação de administrador.

---

## 2. **Administração de Usuários**

- **Rota Inicial:** `/admins`
### 2.1 ** Administração de Staffs**
### Criar Admin
- **Método:** `POST`
- **Endpoint:** `/staff`
- **Descrição:** Cria um novo administrador.
- **Autenticação:** Requer autenticação de administrador.

---

### Deletar Admin por ID
- **Método:** `DELETE`
- **Endpoint:** `/staff/delete/:id`
- **Descrição:** Deleta um administrador pelo ID.
- **Autenticação:** Requer autenticação de administrador.

---

## RESOTRE STAFF
- **Método:** `PATCH`
- **Endpoint:** `/staff/restore/:id`
- **Descrição:** Restaura um administrador deletado, pelo ID.
- **Autenticação:** Requer autenticação de administrador.
---

### Listar Todos os Administradores
- **Método:** `GET`
- **Endpoint:** `/staff`
- **Descrição:** Retorna a lista de todos os administradores.

---

## 2.2 **Administração de membros**
### Criar Admin
- **Método:** `POST`
- **Endpoint:** `/admin`
- **Descrição:** Cria um novo administrador.
- **Autenticação:** Requer autenticação de administrador.

---

### Deletar Admin por ID
- **Método:** `DELETE`
- **Endpoint:** `/delete/:id`
- **Descrição:** Deleta um administrador pelo ID.
- **Autenticação:** Requer autenticação de administrador.

---

### Listar Todos os Administradores
- **Método:** `GET`
- **Endpoint:** `/admins`
- **Descrição:** Retorna a lista de todos os administradores.

---

### Profile do membro
- **Método:** `GET`
- **Endpoint:** `/admins/profile`
- **Descrição:** Retorna o perfil de usuário.

---

## 3. **Autenticação Usuários (Staff e Membros)**

- **Rota Inicial:** `/admin-session`

### Login
- **Método:** `POST`
- **Endpoint:** `/admin-session`
- **Descrição:** Realiza o login.

---

## 4. **Posts**

- **Rota Inicial:** `/post`

### Criar Post
- **Método:** `POST`
- **Endpoint:** `/post`
- **Descrição:** Cria um novo post.
- **Autenticação:** Requer autenticação de Staff (administrador, editor, autor, curador).

---

### Deletar Post
- **Método:** `DELETE`
- **Endpoint:** `/post/:id`
- **Descrição:** Deleta um post pelo ID.
- **Autenticação:** Requer autenticação de administrador.

---

### Atualizar Post
- **Método:** `PUT`
- **Endpoint:** `/post/:id`
- **Descrição:** Atualiza um post pelo ID.
- **Autenticação:** Requer autenticação de administrador.

---

### Listar Posts com Filtros
- **Método:** `GET`
- **Endpoint:** `/post`
- **Descrição:** Lista os posts com filtros (por tipo, status, autor, etc.).

---

## 5. **Tags**

- **Rota Inicial:** `/tags`

### Criar Tag
- **Método:** `POST`
- **Endpoint:** `/tags`
- **Descrição:** Cria uma nova tag.
- **Autenticação:** Requer autenticação de administrador.

---

### Deletar Tag
- **Método:** `DELETE`
- **Endpoint:** `/tags/:id`
- **Descrição:** Deleta uma tag pelo ID.
- **Autenticação:** Requer autenticação de administrador.

---

### Atualizar Tag
- **Método:** `PATCH`
- **Endpoint:** `/tags/:id`
- **Descrição:** Atualiza uma tag pelo ID.
- **Autenticação:** Requer autenticação de administrador.

---

### Listar Tags
- **Método:** `GET`
- **Endpoint:** `/tags`
- **Descrição:** Lista todas as tags.

---

### Obter Tag por ID
- **Método:** `GET`
- **Endpoint:** `/tags/:id`
- **Descrição:** Retorna uma tag específica pelo ID.
- **Autenticação:** Requer autenticação de administrador.

---

## 6. **Meta Dados (Meta)**

- **Rota Inicial:** `/meta`

### Obter Meta por ID
- **Método:** `GET`
- **Endpoint:** `/meta/:id`
- **Descrição:** Retorna os metadados associados ao ID fornecido.

---

## 7. **Status**

- **Rota Inicial:** `/status`

### Listar Status
- **Método:** `GET`
- **Endpoint:** `/status`
- **Descrição:** Lista todos os status.

---

### Obter Status por ID
- **Método:** `GET`
- **Endpoint:** `/status/:id`
- **Descrição:** Retorna um status específico pelo ID.

---

## 8. **Planos**

- **Rota Inicial:** `/plan`

### Criar Plano
- **Método:** `POST`
- **Endpoint:** `/plan/create`
- **Descrição:** Cria um novo plano.
- **Autenticação:** Requer autenticação de administrador.

---

### Atualizar Plano
- **Método:** `PATCH`
- **Endpoint:** `/plan/update/:id`
- **Descrição:** Atualiza um plano existente.
- **Autenticação:** Requer autenticação de administrador.

---

### Deletar Plano
- **Método:** `DELETE`
- **Endpoint:** `/plan/delete/:id`
- **Descrição:** Deleta um plano.
- **Autenticação:** Requer autenticação de administrador.

---

### Listar Todos os Planos
- **Método:** `GET`
- **Endpoint:** `/plan/list`
- **Descrição:** Retorna a lista de todos os planos.

---

### Visualizar Plano por ID
- **Método:** `GET`
- **Endpoint:** `/plan/view/:id`
- **Descrição:** Retorna os detalhes de um plano pelo ID.

---

## 9. **Pagamentos**

- **Rota Inicial:** `/payment`

### Criar Pagamento
- **Método:** `POST`
- **Endpoint:** `/payment/create`
- **Descrição:** Cria um novo pagamento.
- **Autenticação:** Requer autenticação.

---

### Obter Pagamento por ID
- **Método:** `GET`
- **Endpoint:** `/payment/:id`
- **Descrição:** Retorna os detalhes de um pagamento pelo ID.

---

### Atualizar Pagamento de Usuário
- **Método:** `POST`
- **Endpoint:** `/payment/notification`
- **Descrição:** Atualiza o pagamento do usuário.

---

## 10. **Recuperação de Senha (Password)**

- **Rota Inicial:** `/password`

### Enviar E-mail de Recuperação de Senha
- **Método:** `POST`
- **Endpoint:** `/password/forgot`
- **Descrição:** Envia um e-mail de recuperação de senha.

---

### Resetar Senha
- **Método:** `POST`
- **Endpoint:** `/password/reset`
- **Descrição:** Redefine a senha de um usuário.

---

## Configurações

- **Banco de Dados**: Configurado via ormconfig.json e data-source.ts
- **Upload**: Configuração em upload.ts
- **Variáveis de Ambiente**: .env

---

## Scripts

Veja o package.json:

- `yarn dev` — Inicia o servidor em modo desenvolvimento
- `yarn build` — Gera build para produção
- `yarn test` — Executa testes com Jest
- Scripts Docker para build, tag e push `yarn docker-build`, `yarn docker-tag`, `yarn docker-push`

---

## Como Rodar

1. Instale dependências:
   ```sh
   yarn install
   ```
2. Configure o .env e o banco de dados.
3. Inicie o servidor:
   ```sh
   yarn dev
   ```
4. Acesse as rotas via Postman ou frontend.

---

## Testes

Os testes estão em testAnalytics.test.ts e podem ser executados com:

```sh
yarn test
```

---

## Observações

- O projeto utiliza injeção de dependências, separação de responsabilidades e boas práticas REST.
- Para detalhes de cada rota, consulte os controllers em Modules.

---

## Autores

- Thiago Linchin

---

---

Feito com ♥ by Thiago Linch :wave:
# MODACAD
