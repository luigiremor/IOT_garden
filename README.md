# IOT Garden

Este repositório contém o código-fonte para o sistema IoT de monitoramento e controle de uma horta urbana. O projeto utiliza tecnologias modernas para backend e frontend, integrando sensores e dispositivos com protocolos de comunicação eficientes.

## Estrutura do Projeto

- **Backend**: Desenvolvido com Node.js e NestJS, gerenciado via Docker.
- **Frontend**: Desenvolvido com Next.js e React.

---

## Instruções para Configuração e Execução

### Backend

1. **Acesse o diretório do backend**:

   ```bash
   cd backend
   ```

2. **Execute o comando para construir e inicializar os containers Docker**:

   ```bash
   docker-compose up --build
   ```

3. **Inicie o servidor backend**:
   ```bash
   pnpm run start
   ```

> **Nota**: Certifique-se de que o Docker está instalado e configurado corretamente no seu ambiente.

---

### Frontend

1. **Acesse o diretório do frontend**:

   ```bash
   cd frontend
   ```

2. **Construa o frontend**:

   ```bash
   pnpm run build
   ```

3. **Inicie o servidor de produção**:
   ```bash
   pnpm run start
   ```

---

## Tecnologias Utilizadas

- **Backend**:

  - Node.js
  - NestJS
  - PostgreSQL
  - Docker

- **Frontend**:
  - Next.js
  - React.js
  - Recharts
  - React Query

---

## Repositório

O código-fonte completo pode ser acessado no [GitHub](https://github.com/luigiremor/IOT_garden).

---

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_ com sugestões e melhorias.

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
