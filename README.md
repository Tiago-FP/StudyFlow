# 🎯 StudyFlow

> **Aplicação intuitiva e acolhedora para ajudar estudantes iniciantes a planejar, acompanhar e alcançar seus objetivos de estudo.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

---

## 💡 Sobre o Projeto

Estudantes iniciantes frequentemente lidam com sobrecarga cognitiva e desorganização ao tentar acompanhar matérias, prazos e metas de estudo. Ferramentas profissionais de gestão de projetos possuem atrito excessivo de configuração, enquanto notas soltas se perdem com facilidade.

O **StudyFlow** foi idealizado e construído para ser um ponto focal simples, direto ao ponto e motivador:
- Sem necessidade de cadastro ou backend inicial (funciona imediatamente no navegador).
- Persistência automática em `localStorage` (seus dados não somem ao fechar a aba ou recarregar a página).
- Foco na clareza de prazos e no ritmo de aprendizado, com indicadores visuais de progresso.

---

## ✨ Funcionalidades Principais

* **🎯 Cadastro de Objetivos**:
  * Título objetivo (obrigatório, até 120 caracteres).
  * Descrição detalhada / anotações de estudo (opcional).
  * Prazo de conclusão com seletor de data e **atalhos inteligentes de 1 clique** (*"Hoje"*, *"Em 3 dias"*, *"1 semana"*, *"2 semanas"*).
  * Definição de status inicial.
* **📋 Gestão e Edição Completa**:
  * Edição de qualquer atributo de um objetivo existente.
  * Alteração rápida de status diretamente pelo cartão ou pelo botão de conclusão rápida (*"Marcar pronto"*).
* **🗑️ Exclusão Segura**:
  * Diálogo de confirmação acessível que exibe os detalhes do item selecionado para prevenir exclusões acidentais.
* **📊 Painel de Métricas e Ritmo**:
  * Contagem em tempo real do **Total de Metas**, **Não Iniciados**, **Em Andamento** e **Concluídos**.
  * Barra de progresso visual com cálculo percentual de aproveitamento.
* **🔍 Filtros e Busca Instantânea**:
  * Abas de filtragem rápida por status com contador dinâmico em cada categoria.
  * Campo de busca em tempo real por título ou descrição.
* **💾 Persistência Local (Offline-First)**:
  * Todos os objetivos são salvos e sincronizados com o `localStorage` do navegador.
* **🌱 Experiência para Iniciantes (Onboarding & Empty State)**:
  * Tela vazia acolhedora com incentivo ao primeiro cadastro.
  * Botão para **carregar exemplos guiados de estudo**, permitindo testar e explorar os recursos instantaneamente.

---

## 🛠️ Tecnologias Utilizadas

* **[React 19](https://react.dev/)**: Biblioteca para interfaces declarativas e reativas com Hooks modernos (`useState`, `useEffect`, `useMemo`).
* **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática em 100% da aplicação para prevenção de bugs e código auto-documentável.
* **[Vite](https://vitejs.dev/)**: Bundler ultrarrápido para desenvolvimento frontend ágil e builds otimizados.
* **[Tailwind CSS v4](https://tailwindcss.com/)**: Estilização utilitária de alta performance e design responsivo.
* **[Lucide React](https://lucide.dev/)**: Pacote de ícones minimalistas e consistentes.
* **Tipografia**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts.

---

## 📂 Arquitetura do Projeto

O código foi organizado seguindo princípios de responsabilidade única e separação de camadas:

```
studyflow/
├── index.html                   # Entry point HTML com metatags SEO e tipografia
├── metadata.json                # Metadados do aplicativo
├── package.json                 # Dependências e scripts do projeto
├── tsconfig.json                # Configuração estrita do compilador TypeScript
├── vite.config.ts               # Configuração do Vite e plugins
└── src/
    ├── main.tsx                 # Ponto de montagem da aplicação React
    ├── App.tsx                  # Componente raiz, orquestração de estados e layout
    ├── index.css                # Importação do Tailwind CSS e fontes base
    ├── types/
    │   └── goal.ts              # Definições de tipos (StudyGoal, GoalStatus, GoalFormData)
    ├── services/
    │   └── storageService.ts    # Camada desacoplada de persistência (localStorage)
    ├── utils/
    │   └── dateUtils.ts         # Utilitários de cálculo e formatação amigável de prazos
    └── components/
        ├── Header.tsx           # Barra superior com marca e botão de novo objetivo
        ├── StatsOverview.tsx    # Cards com métricas e barra de progresso geral
        ├── GoalFilters.tsx      # Abas de filtro segmentado e campo de busca
        ├── GoalCard.tsx         # Cartão individual do objetivo com ações
        ├── GoalFormModal.tsx    # Modal reutilizável de criação e edição
        ├── ConfirmModal.tsx     # Diálogo de confirmação de exclusão segura
        └── EmptyState.tsx       # Estado vazio encorajador com carga de exemplos
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
* [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/) / [yarn](https://yarnpkg.com/)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU_USUARIO/studyflow.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd studyflow
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**
   Abra `http://localhost:3000` (ou a porta exibida no terminal) e comece a organizar seus estudos!

### Scripts Disponíveis

* `npm run dev`: Inicia o ambiente de desenvolvimento.
* `npm run build`: Gera o pacote otimizado de produção na pasta `dist/`.
* `npm run preview`: Executa localmente o build de produção para testes.
* `npm run lint`: Valida o TypeScript em busca de inconsistências de tipos (`tsc --noEmit`).

---

## 🧪 Critérios de Aceite e Casos de Teste

| ID | Cenário | Ação do Usuário | Resultado Esperado |
| :---: | :--- | :--- | :--- |
| **CT01** | **Criação de objetivo** | Preencher título, prazo e salvar. | O objetivo aparece no topo da lista com feedback visual de sucesso. |
| **CT02** | **Validação obrigatória** | Tentar salvar sem preencher o título. | O envio é impedido e uma mensagem clara de validação é exibida. |
| **CT03** | **Edição de dados** | Clicar no ícone de lápis, alterar informações e salvar. | As alterações são refletidas instantaneamente no cartão. |
| **CT04** | **Mudança de status** | Alterar o status pelo dropdown ou clicar em *"Marcar pronto"*. | O status visual do card e os contadores de progresso são atualizados. |
| **CT05** | **Exclusão protegida** | Clicar na lixeira e confirmar no modal de diálogo. | O objetivo é removido permanentemente e a lista recalcula os totais. |
| **CT06** | **Persistência de dados** | Cadastrar metas e recarregar a página (`F5`). | Todos os dados salvos permanecem intactos via `localStorage`. |
| **CT07** | **Busca e filtros** | Digitar um termo na busca ou alternar abas de status. | Apenas os objetivos correspondentes são exibidos, sem travar a interface. |

---

## 🗺️ Roadmap para Próximas Versões

- [ ] Categorização por disciplinas ou tags (ex.: *Matemática*, *Programação*, *Inglês*).
- [ ] Exportação e importação de dados em formato JSON / CSV (backup pessoal).
- [ ] Modo escuro (*Dark Mode*) com alternância manual ou sincronizada ao sistema.
- [ ] Temporizador Pomodoro integrado aos objetivos em andamento.
- [ ] Notificações no navegador para metas que vencem no dia.

---

## 📄 Licença

Este projeto é distribuído sob os termos da licença **Apache-2.0**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Desenvolvido com carinho para apoiar quem está dando os primeiros passos no aprendizado contínuo. 🚀
</p>
