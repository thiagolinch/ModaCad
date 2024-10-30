FROM node:16

# Define o diretório de trabalho
WORKDIR /api

# Copia apenas os arquivos de dependências
COPY package*.json ./

# Remove o package-lock.json se existir (evita conflitos de versão)
RUN rm -f package-lock.json

# Instala as dependências
RUN npm install --legacy-peer-deps

# Copia o restante do código
COPY . .

# Expõe a porta
EXPOSE 5002

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]
