-----

# StudyPace

Bem-vindo ao repositório do **StudyPace**\! Este é o repositório principal para o deploy da nossa aplicação Fullstack, desenvolvida para ser sua assistente de estudos inteligente.

-----

## Sobre o StudyPace

StudyPace é uma **aplicação Fullstack** projetada para **revolucionar a forma como você estuda**, utilizando o poder da **Inteligência Artificial (IA)**. Nosso objetivo é auxiliar estudantes a otimizar seus processos de aprendizagem, tornando-os mais eficientes e personalizados.

Com o StudyPace, você pode:

  * **Criar Cronogramas de Estudo Personalizados:** A IA analisa seus objetivos e tempo disponível para gerar um plano de estudos otimizado.
  * **Gerar Resumos Inteligentes:** Obtenha resumos concisos e relevantes de qualquer conteúdo, facilitando a revisão e compreensão.
  * **Identificar Conteúdos e Momentos Ideais para Estudar:** Receba recomendações sobre quais tópicos focar e qual o melhor momento para cada sessão de estudo, maximizando sua retenção e produtividade.

-----

## Tecnologias Utilizadas

  * **Backend:** **Spring Boot** (Java 21)
  * **Frontend:** **React**
  * **Banco de Dados:** **H2 Database (JDBC)** - um banco de dados em memória, ideal para desenvolvimento e testes.

-----

## Como Rodar o Projeto Localmente

Para colocar o StudyPace funcionando na sua máquina, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

  * **Java Development Kit (JDK) 21**
  * **Node.js** (com npm)
  * Um ambiente de desenvolvimento integrado (IDE) como **IntelliJ IDEA** (para o backend) e **VS Code** (para o frontend) é recomendado.

### 1\. Clonar o Repositório

Primeiro, clone este repositório para sua máquina local:

```bash
git clone https://github.com/Nandobez/Studypace.git
cd Studypace
```

### 2\. Configurar e Rodar o Backend (Spring Boot)

1.  Navegue até o diretório do backend (pasta `backend` dentro do repositório clonado):
    ```bash
    cd [caminho_para_o_backend] # Ex: cd backend
    ```
2.  Abra o projeto no seu IDE (ex: IntelliJ IDEA).
3.  **Configurações do Banco de Dados:** O projeto já vem configurado para usar o **H2 Database**, um banco de dados em memória. Isso significa que você não precisa de uma instalação externa de banco de dados para começar. As configurações estarão no arquivo `application.properties` (localizado em `src/main/resources`). Você pode acessar o console do H2 normalmente em `http://localhost:8080/h2-console` após iniciar a aplicação.
    ```properties
    # H2 Database Configuration
    spring.h2.console.enabled=true
    spring.datasource.url=jdbc:h2:file:~/studypace.db;DB_CLOSE_ON_EXIT=FALSE;AUTO_RECONNECT=TRUE
    spring.datasource.driverClassName=org.h2.Driver
    spring.datasource.username=sa
    spring.datasource.password=
    ```
4.  **Rodar o Backend:** Execute a aplicação Spring Boot. Você pode fazer isso através do seu IDE (clicando no botão "Run" da classe principal da aplicação) ou via linha de comando Gradle:
    ```bash
    # Se usar Gradle
    ./gradlew bootRun
    ```
    O backend estará rodando, por padrão, na porta `8080`.

### 3\. Configurar e Rodar o Frontend (React)

1.  Em um novo terminal, navegue até o diretório do frontend (pasta `frontend` dentro do repositório clonado):
    ```bash
    cd [caminho_para_o_frontend] # Ex: cd frontend
    ```
2.  **Instale as dependências** do projeto:
    ```bash
    npm install
    ```
3.  **Rodar o Frontend:** Inicie a aplicação React:
    ```bash
    npm run dev
    ```
    Isso abrirá a aplicação no seu navegador padrão (geralmente em `http://localhost:5173`).

-----

Com o backend e o frontend rodando, você já pode começar a usar o StudyPace e explorar todas as suas funcionalidades de estudo inteligente\!
