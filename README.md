# Gerenciamento de ativos - Desafio Técnico GeoSapiens

Este projeto é uma aplicação Full Stack para gerenciamento de ativos corporativos (computadores, monitores, etc.), desenvolvida como parte do teste técnico para a GeoSapiens.

A solução foca em uma experiência de usuário fluida ("Plug and Play"), código limpo e arquitetura robusta.

---

## Como Rodar o Projeto (Docker)

A forma mais simples e recomendada de executar a aplicação é utilizando o **Docker**. Isso garante que todo o ambiente (Frontend e Backend) suba automaticamente sem necessidade de instalar Java ou Node.js na sua máquina.

### Pré-requisitos

- Docker e Docker Compose instalados.

### Passo a Passo

1.  Clone o repositório:
    - git clone https://github.com/SchusterN-hub/teste-tecnico-geosapiens.git

2.  Execute o comando de build e inicialização na raiz do projeto:
    - docker-compose up --build

3.  Aguarde o build terminar. Assim que os containers estiverem rodando, você pode acessar o sistema nesses links:
    - **Frontend (Link principal/Aplicação):** [http://localhost:3000](http://localhost:3000)
    - **Backend (API):** [http://localhost:8080/assets](http://localhost:8080/assets)

---

## Tecnologias Utilizadas

### Backend

- **Java 21:** Versão LTS mais recente, garantindo performance e recursos modernos.
- **Spring Boot 3:** Framework para criação rápida de microsserviços e APIs REST.
- **Spring Data JPA:** Abstração para persistência de dados.
- **Bean Validation:** Validação robusta de dados na entrada da API.
- **H2 Database:** Banco de dados em memória.

### Frontend

- **React + Vite:** Build tool extremamente rápida.
- **TypeScript:** Tipagem estática para maior segurança e manutenibilidade do código.
- **Tailwind CSS:** Estilização utilitária e responsiva.
- **Shadcn/ui:** Biblioteca de componentes reutilizáveis e acessíveis.
- **Axios:** Cliente HTTP para comunicação com a API.
- **Zod + React Hook Form:** Gerenciamento e validação de formulários.

### DevOps

- **Docker & Docker Compose:** Containerização e orquestração multi-stage (build e runtime separados) para gerar imagens leves.

---

## Decisões Técnicas

### 1. Banco de Dados H2

Optei por utilizar o **H2 Database (In-Memory)** por questões de praticidade e portabilidade para este teste técnico.

- **O motivo:** Por ser um teste técnico que não vai pra produção, achei mais ágil para o desenvolvimento.
- **Nota para Produção:** Em um cenário real de produção, o H2 seria substituído por um banco robusto como **PostgreSQL** ou **MySQL**, garantindo persistência duradoura e escalabilidade, bastando alterar o `application.properties` e adicionar o driver correspondente.

### 2. Validação Dupla (Front e Back)

A segurança e integridade dos dados foram priorizadas.

- **Frontend:** Uso do Zod para feedback imediato ao usuário (UX).
- **Backend:** Uso do Bean Validation (`@NotBlank`, `@Size`) para garantir que dados inválidos nunca cheguem ao banco, mesmo que a requisição seja feita fora do navegador (ex: via Postman).

### 3. Docker Multi-Stage Build

Os `Dockerfile`s foram configurados em múltiplos estágios.

- Primeiro, usamos uma imagem com Maven/Node para compilar o projeto.
- Depois, copiamos apenas os artefatos finais (`.jar` e arquivos estáticos) para imagens Alpine leves (JRE e Nginx).
- Isso reduz drasticamente o tamanho final das imagens e aumenta a segurança.

### 4. Tradução de Status (Enums)

- No banco de dados e na API, os status são mantidos em Inglês/Uppercase (padrão internacional `AVAILABLE`, `IN_USE`), facilitando a integração com outros sistemas.
- No Frontend, há uma camada de tradução ("Disponível", "Em uso") para apresentar os dados de forma amigável ao usuário final brasileiro.

---

## Funcionalidades

- **Dashboard:** Cards com métricas chaves em tempo real (Total, Em Uso, Manutenção, Disponíveis).
- **CRUD Completo:** Listagem, Cadastro, Edição e Exclusão de ativos.
- **Duplicação Inteligente:** Funcionalidade para clonar um ativo existente, agilizando o cadastro de equipamentos similares (força a criação de um novo Serial Number).
- **Feedback Visual:** Toasts de sucesso e erro (ex: aviso ao tentar cadastrar Serial duplicado).
- **Filtros:** Busca por nome/serial, categoria e status.

---

## Endpoints da API

A API segue o padrão RESTful:

| Método | Endpoint       | Descrição                   |
| :----- | :------------- | :-------------------------- |
| GET    | `/assets`      | Lista todos os ativos       |
| POST   | `/assets`      | Cria um novo ativo          |
| PUT    | `/assets/{id}` | Atualiza um ativo existente |
| DELETE | `/assets/{id}` | Remove um ativo             |

---

Desenvolvido por **Nicolas Schuster**
