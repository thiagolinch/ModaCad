FROM node:18-slim

# Define o diretório de trabalho
WORKDIR /api

# Copia apenas os arquivos de dependências
COPY package.json yarn.lock ./

# Instala dependências com cache (caso tenha Docker BuildKit habilitado)
#RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
#    yarn install
RUN yarn install
# Copia o restante do código
COPY . .

# Expõe a porta
EXPOSE 5002

# Comando para rodar a aplicação
CMD ["yarn", "dev"]
