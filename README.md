
# IOT Garden

Este repositório contém o código-fonte para o sistema IoT de monitoramento e controle de uma horta urbana. O projeto utiliza tecnologias modernas para backend, frontend e dispositivos embarcados utilizando Arduino.

## Estrutura do Projeto

- **Backend**: Desenvolvido com Node.js e NestJS, gerenciado via Docker.
- **Frontend**: Desenvolvido com Next.js e React.
- **Arduino**: Código desenvolvido para sensores e atuadores integrados ao sistema IoT.

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

### Arduino

1. **Configuração do Hardware**:
   - Utilize a placa **Arduino Uno** como controlador principal.
   - Conecte os seguintes sensores e atuadores:
     - **DHT22**: Para medir temperatura e umidade.
     - **LDR**: Para medir intensidade luminosa.
     - **Sensor de Umidade do Solo**.
     - **Módulo Relé 4 Canais**: Para controlar dispositivos como bombas d'água.

2. **Carregue o código no Arduino**:
   - O código fonte do Arduino está disponível no diretório `arduino/` deste repositório.
   - Utilize o Arduino IDE para carregar o código na placa.

3. **Conectividade**:
   - Configure as credenciais de WiFi e o endereço do servidor MQTT diretamente no código.
   - Certifique-se de que o broker MQTT está funcionando corretamente para garantir a comunicação entre o Arduino e o backend.

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

- **Arduino**:
  - Sensores: DHT22, LDR, Sensor de Umidade do Solo.
  - Atuação: Módulo Relé.
  - Protocolo: MQTT para comunicação.

---

## Repositório

O código-fonte completo pode ser acessado no [GitHub](https://github.com/luigiremor/IOT_garden).

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
