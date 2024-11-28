<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Instalação</a>
<a href="#-projeto">Rotas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=49AA26&labelColor=000000" alt="PRs welcome!" />
</p>

# 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- DayJs
- uuid
- Tsyringe
- Jsonwebtoken
- Bcryptjs
- JavaScript
- NodeJS
- TypeOrm
- Express
- Yarn

# 💻 Projeto

Projeto de backend e frontend, sendo um Blog voltado para a moda. Este projeto terá no backend toda a parte de criação, edição, publicação e exclusão de artigos, assim como a parte adiminstrativa com os usuários, níveis de acesso, criação de conta para memrbos e ADMs.
Frontend em desenvolvimento pela equipe de design da ModaCad...

# 🔖 Instalação

* Ao receber o arquivo deste sistema é necessário rodar o comando:
$ yarn

* Criar o docker em sua máquina
$ docker build -t modacad .

* Rodar o docker-compose para conexão com o banco de dados
$ docker-compose up
$ docker-compose start



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

## 2. **Administração de Usuários (Admins)**

- **Rota Inicial:** `/admins`

### Criar Admin
- **Método:** `POST`
- **Endpoint:** `/admins`
- **Descrição:** Cria um novo administrador.
- **Autenticação:** Requer autenticação de administrador.

---

### Deletar Admin por ID
- **Método:** `DELETE`
- **Endpoint:** `/admins/:id`
- **Descrição:** Deleta um administrador pelo ID.
- **Autenticação:** Requer autenticação de administrador.

---

### Listar Todos os Administradores
- **Método:** `GET`
- **Endpoint:** `/admins`
- **Descrição:** Retorna a lista de todos os administradores.

---

## 3. **Autenticação de Administrador (Admin Session)**

- **Rota Inicial:** `/admin-session`

### Login de Admin
- **Método:** `POST`
- **Endpoint:** `/admin-session`
- **Descrição:** Realiza o login de um administrador.

---

## 4. **Posts**

- **Rota Inicial:** `/post`

### Criar Post
- **Método:** `POST`
- **Endpoint:** `/post`
- **Descrição:** Cria um novo post.
- **Autenticação:** Requer autenticação de administrador.

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
---

Com esses ajustes, a documentação está mais organizada e clara. Se precisar de mais ajustes, estou à disposição!

---

Feito com ♥ by Thiago Linch :wave:
# MODACAD
